export class Usuario {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id?: Id | null,
    public createdAt?: Date | null,
    public imageUrl?: string | null,
    public idRol?: number | null,
    public lastLogin?: Date | null
  ) {}
}

export type Id = string | null;
export type Token = string | null;