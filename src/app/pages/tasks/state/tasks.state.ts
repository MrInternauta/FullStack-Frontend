import { Action, createReducer, on } from '@ngrx/store';

import { ITask } from '@advanced-front/core';
import { removeTasks, setTasks } from './tasks.actions';

export const featureKey = 'tasks';

export interface TasksState {
  [featureKey]: ITask[] | null;
}

export const tasksInitialState: TasksState = {
  [featureKey]: null,
};

const _tasksReducer = createReducer(
  tasksInitialState,
  on(setTasks, (state, { tasks }) => ({ ...state, [featureKey]: tasks })),
  on(removeTasks, state => ({ ...state, [featureKey]: null }))
);

export function tasksReducer(state: any, action: Action) {
  return _tasksReducer(state, action);
}
