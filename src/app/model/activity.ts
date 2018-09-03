/*
* Сущность вида деятельности
*/

export class Activity {

  constructor (
    public id: number = null,
    public name: string,
    public description: string,
    public duration: number,
    public bgColor: string,
    public color: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration; // Продолжительность в минутах
    this.bgColor = bgColor;
    this.color = color;
  }

  public hidden?: boolean; // Скрыт в списке
}
