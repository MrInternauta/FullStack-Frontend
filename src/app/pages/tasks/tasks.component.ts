import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Task } from '@advanced-front/core';
import { environment } from '@advanced-front/environment';
import { UsuarioService } from '@advanced-front/services';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  public tasks: Task[] | any = [];
  constructor(private _usuario: UsuarioService) {}
  ngOnInit() {
    const headers = {
      Authorization: 'Bearer ' + this._usuario.token,
    };
    this._usuario.http.get(environment.url + 'tasks/byUserId?id=' + this._usuario.usuario.id, { headers }).subscribe(
      (data: Task[] | any) => {
        this.tasks = data;
      },
      (e: any) => {
        console.log(e);
      }
    );
  }
}
