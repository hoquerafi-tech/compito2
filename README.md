# Laboratorio Angular HTTP

Il progetto del laboratorio si trova in [`angular-http`](angular-http). Include le pagine Post, Gatti e NASA, i servizi HTTP tipizzati e la prova autonoma di paginazione.

Per avviarlo:

```sh
cd angular-http
npm install
npm start
```

Per usare l'API NASA, copia `src/environments/environment.example.ts` in `environment.ts` e `environment.development.ts` nella stessa cartella, poi inserisci una chiave personale in entrambi. I due file reali sono esclusi da Git; non usare una chiave importante in un'app client-side.