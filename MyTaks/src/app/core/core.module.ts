import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {fakeBackendProvider } from './interceptors/fake-backend.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [fakeBackendProvider],
})
export class CoreModule {}
