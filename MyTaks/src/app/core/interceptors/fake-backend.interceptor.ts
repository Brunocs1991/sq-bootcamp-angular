// https://jasonwatmore.com/post/2020/03/10/angular-8-fake-backend-example-for-backendless-development

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Task } from 'src/app/services/models/task.model';

// array in local storage for registered tasks
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    switch (true) {
      case url.endsWith('/tasks') && method === 'POST':
        return createTask();
      case url.match(/\/tasks\/\d+$/) && method === 'PUT':
        return alterTask();
      case url.endsWith('/tasks') && method === 'GET':
        return getTasks();
      case url.endsWith('/tasks/today') && method === 'GET':
        return getTodayTasks();
      case url.endsWith('/tasks/tomorrow') && method === 'GET':
        return getTomorrowTasks();
      case url.endsWith('/tasks/upcoming') && method === 'GET':
        return getUpcomingTasks();
      case url.match(/\/tasks\/\d+$/) && method === 'DELETE':
        return deleteTask();
      default:
        return next.handle(request);
    }

    function createTask(): Observable<HttpEvent<any>> {
      const task: Task = body;

      task.id = tasks.length + 1;

      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      return ok();
    }

    function alterTask() {
      let task = tasks.find((x: any) => x.id === idFromUrl());
      task = Object.assign(body, task);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      return ok();
    }

    function getTasks() {
      const allTasks = tasks.sort((a: Task, b: Task) => (+new Date(b.remindMe) - +new Date(a.remindMe) <= 0 ? 1 : -1));

      return ok(tasks);
    }

    function getTodayTasks() {
      const today = new Date().setHours(0, 0, 0, 0);

      const _tasks = tasks.filter(
        (task: Task) => task.remindMe && +new Date(task.remindMe).setHours(0, 0, 0, 0) <= +today
      );

      return ok(_tasks);
    }

    function getTomorrowTasks() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const _tasks = tasks.filter(
        (task: Task) => task.remindMe && +new Date(task.remindMe).setHours(0, 0, 0, 0) === +tomorrow
      );

      return ok(_tasks);
    }

    function getUpcomingTasks() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const _tasks = tasks.filter(
        (task: Task) => task.remindMe && +new Date(task.remindMe).setHours(0, 0, 0, 0) > +tomorrow
      );

      return ok(_tasks);
    }

    function deleteTask() {
      tasks = tasks.filter((x: any) => x.id !== idFromUrl());
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return ok();
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: any) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
