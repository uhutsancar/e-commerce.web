import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../data-access/models/base-api.types';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #user = signal<User | null>(null);
  isLoggedIn = computed(() => !!this.#user());
  accessToken = computed(() => this.#user()?.accessToken);
  user = this.#user.asReadonly();
  #cookieService = inject(CookieService);
  setUser(user: User | null) {
    if (user) {
      this.#user.set(user);
      this.#cookieService.set('user', JSON.stringify(user));
    } else {
      this.#user.set(null);
      this.#cookieService.remove('user');
    }
  }

  init() {
    const user = this.#cookieService.get('user');
    if (user) {
      this.#user.set(JSON.parse(user));
    }
  }
}
