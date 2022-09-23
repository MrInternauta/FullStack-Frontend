import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  public tasks = [
    {
      name: 'Limpiar',
      done: false,
    },
    {
      name: 'Comprar',
      done: false,
    },
    {
      name: 'Programar',
      done: true,
    },
    {
      name: 'Debuguear',
      done: false,
    },
    {
      name: 'Actualizar',
      done: true,
    },
  ];
  constructor() {}
  ngOnInit() {}
}
