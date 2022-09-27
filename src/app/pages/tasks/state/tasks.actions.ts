import { createAction, props } from '@ngrx/store';

import { ITask } from '@advanced-front/core';

export const setTasks = createAction('[Tasks] setTasks', props<{ tasks: ITask[] }>());
export const removeTasks = createAction('[Tasks] removeTasks');
