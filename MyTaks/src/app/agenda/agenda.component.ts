import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../services/models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  tarefasParaHoje: Task[] = [];
  tarefasParaAmanha: Task[] = [];
  tarefasParaOsProximosDias: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.onUpdateTasks()
    .subscribe(
      () => {
        this.init();
      }
    );

    this.init();
  }

  private init() {
    this.listTasksForToday();
    this.listTasksForTomorrow();
    this.listUpcomingTasks();
  }

  private listTasksForToday() {
    this.taskService
    .listTasksForToday()
    .subscribe(
      (tarefas: Task[]) => {
        this.tarefasParaHoje = tarefas;
      }
    );
  }

  private listTasksForTomorrow() {
    this.taskService
    .listTasksForTomorrow()
    .subscribe(
      (tarefas: Task[]) => {
        this.tarefasParaAmanha = tarefas;
      }
    );
  }

  private listUpcomingTasks() {
    this.taskService
    .listUpcomingTasks()
    .subscribe(
      (tarefas: Task[]) => {
        this.tarefasParaOsProximosDias = tarefas;
      }
    );
  }
}
