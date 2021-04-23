import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from './models/task.model';
import { finalize } from 'rxjs/operators';

@Injectable()
export class TaskService {
  private updateTasks$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  public onUpdateTasks(): Observable<void> {
    return this.updateTasks$;
  }

  /**
   * Cria uma nova tarefa
   */
  public createTask(task: Task): Observable<void> {
    return this.http.post<void>('localhost:4200/tasks', task).pipe(
      finalize(() => this.updateTasks$.next()) // Execute when the observable completes
    );
  }

  /**
   * Lista todas as tarefas que serão realizada hoje ou que já passaram mas não foram realizadas
   * @returns Task[]
   */
  public listTasksForToday(): Observable<Task[]> {
    return this.http.get<Task[]>('localhost:4200/tasks/today');
  }

  /**
   * Lista todas as tarefas que serão realizada no dia seguite
   * @returns Task[]
   */
  public listTasksForTomorrow(): Observable<Task[]> {
    return this.http.get<Task[]>('localhost:4200/tasks/tomorrow');
  }

  /**
   * Lista todas as tarefas que serão realizada no dia após o dia seguinte
   * @returns Task[]
   */
  public listUpcomingTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('localhost:4200/tasks/upcoming');
  }

  /**
   * Altera os dados da tarefa
   */
  public alterTask(taskId: number | undefined, task: Task): Observable<void> {
    return this.http.put<void>(`localhost:4200/tasks/${taskId}`, task).pipe(
      finalize(() => this.updateTasks$.next()) // Execute when the observable completes
    );
  }

  /**
   * Deleta uma tarefa
   */
  public deleteTask(taskId: number | undefined): Observable<void> {
    return this.http.delete<void>(`localhost:4200/tasks/${taskId}`).pipe(
      finalize(() => this.updateTasks$.next()) // Execute when the observable completes
    );
  }

  public listAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>('localhost:4200/tasks');
  }
}
