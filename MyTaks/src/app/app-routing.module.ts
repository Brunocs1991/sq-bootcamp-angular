import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { TodasTarefasComponent } from './todas-tarefas/todas-tarefas.component'
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'agenda'
  },
  {
    path: 'tarefas',
    component: TodasTarefasComponent
  },
  {
    path: 'agenda',
    component: AgendaComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
