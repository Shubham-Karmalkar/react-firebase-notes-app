
export default class User {
  email: string;
  name: string;
  imageUrl: string;
  id?: string;

  constructor(email: string, name: string, imageUrl: string) {
    this.email = email;
    this.name = name;
    this.imageUrl = imageUrl;
  }

  public async getUserById(id: string) {
    return 
  }
}
