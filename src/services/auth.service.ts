import { computed, Injectable, signal } from '@angular/core';
import { User } from '../data-access/models/base-api.types';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #user = signal<User | null>(null);
  isLoggedIn = computed(() => !!this.#user());
  accessToken = computed(() => this.#user()?.accessToken)
  user = this.#user.asReadonly();
  setUser(user:User | null) {
 
 if(user) {
     this.#user.set(user);
 localStorage.setItem('user' , JSON.stringify(user))
 }
 else {
   this.#user.set(null);
 localStorage.removeItem('user')

 }
   
  }

init() {
  const user  = localStorage.getItem('user');
  if(user) {
    this.#user.set(JSON.parse(user))
  }
}

}
