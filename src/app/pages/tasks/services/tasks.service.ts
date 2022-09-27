import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_PREFIX, ITask } from '@advanced-front/core';

const API_URL = `${API_PREFIX}tasks/`;

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(public http: HttpClient) {}

  getTasks(userId: string) {
    return this.http.get<ITask[]>(`${API_URL}byUserId?id=${userId}`);
  }
}
