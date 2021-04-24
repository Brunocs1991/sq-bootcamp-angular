import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AgendaComponent } from './agenda/agenda.component';

import { AppComponent } from './app.component';
import { AgendaTaskComponent } from './agenda-task/agenda-task.component';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';

import { CoreModule } from './core';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TaskService } from './services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { TodasTarefasComponent } from './todas-tarefas/todas-tarefas.component';

@NgModule({
  declarations: [AppComponent, AgendaComponent, AgendaTaskComponent, DialogAddTaskComponent, TodasTarefasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-br' }, TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
