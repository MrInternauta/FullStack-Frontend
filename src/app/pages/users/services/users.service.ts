import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



import { API_PREFIX, Usuario } from '@advanced-front/core';

const API_URL = `${API_PREFIX}users/`;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public http: HttpClient) {}

  getUsers() {
    return this.http.get<Usuario[]>(API_URL);
  }
}
