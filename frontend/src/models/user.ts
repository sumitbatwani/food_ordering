export class User {
  id: string;
  email: string;
  constructor({ id, email }: any) {
    this.id = id;
    this.email = email;
  }
}
