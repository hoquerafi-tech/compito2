import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Post } from '../modelli/post';
import { PostService } from '../services/post-service';

@Component({
  imports: [JsonPipe],
  selector: 'app-posts',
  styleUrl: './posts.css',
  templateUrl: './posts.html',
})
export class Posts implements OnInit {
  private readonly postService = inject(PostService);
  readonly post = signal<Post | null>(null);
  readonly posts = signal<Post[]>([]);
  readonly loading = signal(false);
  readonly errore = signal<string | null>(null);
  readonly pagina = signal(1);
  readonly tuttiCaricati = signal(false);

  ngOnInit(): void {
    this.caricaPagina(1);
  }

  caricaUno(numero: string): void {
    this.inizia();
    this.postService.getPost(Number(numero)).subscribe({
      next: (dato) => {
        this.post.set(dato);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.gestisciErrore(err),
    });
  }

  caricaTutti(): void {
    this.inizia();
    this.postService.getPosts().subscribe({
      next: (dati) => {
        this.posts.set(dati);
        this.tuttiCaricati.set(true);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.gestisciErrore(err),
    });
  }

  invia(): void {
    this.inizia();
    const nuovo = { userId: 1, title: 'Primo post da Angular', body: 'Inviato con HttpClient' };
    this.postService.addPost(nuovo).subscribe({
      next: (risposta) => {
        this.post.set(risposta);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.gestisciErrore(err),
    });
  }

  caricaPagina(numero: number): void {
    this.inizia();
    this.postService.getPagina(numero).subscribe({
      next: (dati) => {
        this.pagina.set(numero);
        this.posts.set(dati);
        this.tuttiCaricati.set(false);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.gestisciErrore(err),
    });
  }

  private inizia(): void {
    this.loading.set(true);
    this.errore.set(null);
  }

  private gestisciErrore(err: HttpErrorResponse): void {
    this.errore.set(`Errore ${err.status}: ${err.message}`);
    this.loading.set(false);
  }
}