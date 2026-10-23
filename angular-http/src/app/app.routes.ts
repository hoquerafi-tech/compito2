import { Routes } from '@angular/router';
import { Gatti } from './gatti/gatti';
import { Nasa } from './nasa/nasa';
import { Posts } from './posts/posts';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: Posts },
  { path: 'gatti', component: Gatti },
  { path: 'nasa', component: Nasa },
  { path: '**', redirectTo: 'posts' },
];