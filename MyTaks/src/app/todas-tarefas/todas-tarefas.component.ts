import { Component, OnInit } from '@angular/core';
import { Task } from '../services/models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-todas-tarefas',
  templateUrl: './todas-tarefas.component.html',
  styleUrls: ['./todas-tarefas.component.scss']
})
export class TodasTarefasComponent implements OnInit {

  tarefasRecuperadas: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.onUpdateTasks()
    .subscribe(
      () => {
        this.init();
      }
    );

    this.init();
  }

  private init() {
    this.listTasksAll();
  }
  private listTasksAll() {
    this.taskService
    .listAllTask()
    .subscribe(
      (tarefas: Task[]) => {
        this.tarefasRecuperadas = tarefas;
      }
    );
  }
}
