import {  inject, Injectable } from '@angular/core';
import { User } from './models/base-api.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  http = inject(HttpClient);
  login(username: string, password: string) {
    return this.http.post<User>(`auth/login`, {
      username,
      password,
    });
  }
}
