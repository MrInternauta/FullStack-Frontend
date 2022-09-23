import { Id } from './usuario.model';

export class Task {
  constructor(
    public name: string,
    public description: string,
    public done: boolean,
    public id?: Id | null,
    public createdAt?: Date | null,
    public idUser?: number | null
  ) {}
}
