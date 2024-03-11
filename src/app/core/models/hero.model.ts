export class Hero {
  id: number;
  name: string;
  biography?: {
    publisher: string;
  };
  work: {
    occupation: string;
  };
  images?: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  appearance?: {
    gender: string;
    race: string;
  };
  private constructor(name: string, occupation: string = '-') {
    this.id = Math.floor(Math.random() * 1000);
    this.name = name;
    this.work = { occupation };
  }

  static create(heroForm: Omit<Hero, 'id'>): Hero {
    const { name } = heroForm;
    return new Hero(name.toLowerCase());
  }
}
