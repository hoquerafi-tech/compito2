# Risposte e osservazioni

## Passo 6 - Richieste osservate

| Pulsante | Metodo | URL | Stato previsto |
| --- | --- | --- | --- |
| Carica un post (1) | GET | `.../posts/1` | 200 |
| Carica un post (999) | GET | `.../posts/999` | 404 |
| Carica tutti | GET | `.../posts` | 200 |
| Invia un post | POST | `.../posts` | 201 |

Questi sono i valori documentati da JSONPlaceholder. Confrontali con la scheda Network durante la tua esecuzione e annota eventuali differenze.

## Domande

1. `provideHttpClient()` registra il client HTTP di Angular nel sistema di dependency injection. Si configura nei provider dell'applicazione, qui in `angular-http/src/app/app.config.ts`.
2. `constructor(public http: HttpClient)` usa la dependency injection nel costruttore e crea una proprietà pubblica; `inject(HttpClient)` ottiene la dipendenza direttamente in un contesto di injection, per esempio nell'inizializzatore di un campo. Nel modello `@Service()` usato qui, la forma da usare è `inject()`: il costruttore con parametri non è la forma supportata dal nuovo decoratore.
3. Un Observable rappresenta una sequenza asincrona di valori. La chiamata in `getPosts()` restituisce l'Observable; la richiesta HTTP parte quando ci si sottoscrive, per esempio con `subscribe()`.
4. `next` gestisce la risposta riuscita; `error` gestisce il fallimento. Per il post 999 viene chiamato `error` con stato HTTP 404.
5. I signal notificano Angular quando cambia un valore, così il template viene aggiornato. Con proprietà semplici la risposta potrebbe essere assegnata, ma la vista non verrebbe aggiornata automaticamente in modo affidabile.
6. Le interfacce descrivono la forma dei dati e permettono controlli statici e completamento automatico. Per esempio `p.titolo` viene segnalato perché `Post` espone `title`.
7. Il pipe `json` stampa un oggetto come JSON indentato. È utile per ispezionare rapidamente la risposta ricevuta durante lo sviluppo.
8. JSONPlaceholder simula la creazione e assegna sempre l'id 101 perché non persiste le POST. Non serve `JSON.stringify`: `HttpClient` serializza direttamente l'oggetto come JSON e imposta il content type.
9. Si aggiungono i due percorsi environment al `.gitignore`, si conserva nel repository `environment.example.ts` con un segnaposto e si creano localmente `environment.ts` e `environment.development.ts` con la chiave. I due file effettivi sono già ignorati e contengono solo il segnaposto; sostituiscilo localmente con la tua chiave. L'esempio permette a chi clona di ricreare i file necessari senza pubblicare la chiave.
10. La chiave usata in Angular viene inclusa nel codice inviato al browser e può essere letta dagli utenti. Una chiave importante va tenuta su un server e usata dal backend, non distribuita al client.