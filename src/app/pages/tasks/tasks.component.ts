import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AuthService } from '@advanced-front/auth/services';
import { AppState, ITask } from '@advanced-front/core';
import { TasksService } from './services/tasks.service';
import { setTasks } from './state/tasks.actions';
import { TasksState } from './state/tasks.state';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  public data!: ITask[];
  constructor(private _usuario: AuthService, private tasksService: TasksService, private store: Store<AppState>) {
    this.store
      .select('tasks')
      .pipe()
      .pipe(take(1))
      .toPromise()
      .then((store: TasksState) => {
        if (store.tasks == null) {
          this.getData();
        } else {
          this.data = store.tasks;
        }
      });
  }
  ngOnInit() {}

  getData() {
    this.tasksService
      .getTasks(this._usuario.usuario?.id || '')
      .pipe(take(1))
      .toPromise()
      .then((tasks: ITask[]) => {
        this.store.dispatch(
          setTasks({
            tasks,
          })
        );
        this.data = tasks;
      });
  }
}
