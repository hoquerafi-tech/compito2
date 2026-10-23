import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Apod } from '../modelli/apod';
import { NasaService } from '../services/nasa-service';

@Component({
  imports: [],
  selector: 'app-nasa',
  styleUrl: './nasa.css',
  templateUrl: './nasa.html',
})
export class Nasa implements OnInit {
  private readonly nasaService = inject(NasaService);
  readonly apod = signal<Apod | null>(null);
  readonly loading = signal(false);
  readonly errore = signal<string | null>(null);
  readonly data = signal('');

  ngOnInit(): void {
    this.caricaOggi();
  }

  caricaOggi(): void {
    this.carica(() => this.nasaService.getApod());
  }

  caricaData(data: string): void {
    if (!data) return;
    this.data.set(data);
    this.carica(() => this.nasaService.getApodDel(data));
  }

  private carica(richiesta: () => ReturnType<NasaService['getApod']>): void {
    this.loading.set(true);
    this.errore.set(null);
    richiesta().subscribe({
      next: (dato) => {
        this.apod.set(dato);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.errore.set(this.messaggio(err.status, err.error?.msg));
        this.loading.set(false);
      },
    });
  }

  private messaggio(status: number, detail?: string): string {
    switch (status) {
      case 403:
        return 'Chiave API mancante o non valida: controlla i file in src/environments.';
      case 429:
        return 'Troppe richieste con questa chiave: riprova più tardi.';
      case 0:
        return 'Il server non è raggiungibile: controlla la connessione.';
      case 400:
        return detail ?? 'Data non valida o contenuto non disponibile per la data scelta.';
      default:
        return detail ? `Errore ${status}: ${detail}` : `Errore ${status} dal server della NASA.`;
    }
  }
}