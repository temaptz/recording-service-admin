/*
* Сущность клиента
*/

export class Customer {

  constructor (
    public id: number,
    public name: string,
    public phone: string,
    public email: string,
    public description: string
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.description = description;
  }

}
