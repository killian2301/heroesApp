export class Hero {
  id: number;
  name: string;

  private constructor(name: string) {
    this.id = Math.floor(Math.random() * 100);
    this.name = name;
  }

  static create(heroForm: Omit<Hero, 'id'>): Hero {
    const { name } = heroForm;
    return new Hero(name.toLowerCase());
  }
}
