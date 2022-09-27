import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from '@advanced-front/auth/services';
import { API_PREFIX, Task } from '@advanced-front/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  public tasks: Task[] | any = [];
  constructor(private _usuario: AuthService) {}
  ngOnInit() {
    const headers = {
      Authorization: 'Bearer ' + this._usuario.token,
    };
    if (this._usuario.usuario)
      this._usuario.http.get(API_PREFIX + 'tasks/byUserId?id=' + this._usuario.usuario.id, { headers }).subscribe(
        (data: Task[] | any) => {
          this.tasks = data;
        },
        (e: any) => {
          console.log(e);
        }
      );
  }
}
