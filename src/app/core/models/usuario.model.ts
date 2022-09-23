export class Usuario {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id?: number | null,
    public createdAt?: Date | null,
    public imageUrl?: string | null,
    public idRol?: number | null,
    public lastLogin?: Date | null
  ) {}
}
