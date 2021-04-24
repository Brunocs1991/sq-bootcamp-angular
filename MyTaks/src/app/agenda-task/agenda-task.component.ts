import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Task } from '../services/models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-agenda-task',
  templateUrl: './agenda-task.component.html',
  styleUrls: ['./agenda-task.component.scss'],
})
export class AgendaTaskComponent implements OnInit {
  @Input() tasks: Task[] = [];

  constructor(private taskServe: TaskService) {}

  ngOnInit(): void {}

  done(task: Task, event: MatCheckboxChange) {
    this.taskServe.alterTask(task.id, task).subscribe();
  }

  deleteTask(taskId: number | undefined) {
    this.taskServe.deleteTask(taskId).subscribe();
  }
  dataExibir(dataTarefa: Date, dias: number) {
    //recuperando data atual, e somando os dias conforme parametro esperado
    var dataSomanda = new Date();
    dataSomanda.setDate(dataSomanda.getDate() + dias - 1);

    //formatando a dataTarefa do formatro isostring para date para comparação.
    var dataTarefaFormatada = new Date(dataTarefa);

    if (dataTarefaFormatada >= dataSomanda) {
      return true;
    }
    return false;
  }
}
