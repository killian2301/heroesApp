export class Hero {
  id: number;
  name: string;
  biography?: {
    publisher: string;
  };
  work: {
    occupation: string;
  };
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  appearance?: {
    gender: string;
    race: string;
  };
  private constructor(heroForm: Hero) {
    this.id = heroForm.id;
    this.name = heroForm.name;
    this.work = heroForm.work;
    this.images = heroForm.images;
    this.appearance = heroForm.appearance;
    this.biography = heroForm.biography;
  }

  static create(heroForm: Omit<Hero, 'id'>, id: number): Hero {
    return new Hero({ ...heroForm, id });
  }
}
