import { Hero } from '../core/models/hero.model';

export const heroesMock: Hero[] = [
  {
    id: 1,
    name: 'Batman',
    work: {
      occupation: 'CEO of Wayne Enterprises',
    },
    biography: {
      publisher: 'DC Comics',
    },
    images: {
      xs: 'assets/images/batman-xs.jpg',
      sm: 'assets/images/batman-sm.jpg',
      md: 'assets/images/batman-md.jpg',
      lg: 'assets/images/batman-lg.jpg',
    },
    appearance: {
      gender: 'Male',
      race: 'Human',
    },
  },
  {
    id: 2,
    name: 'Spiderman',
    work: {
      occupation: 'Reporter at the Daily Planet',
    },
    biography: {
      publisher: 'DC Comics',
    },
    images: {
      xs: 'assets/images/superman-xs.jpg',
      sm: 'assets/images/superman-sm.jpg',
      md: 'assets/images/superman-md.jpg',
      lg: 'assets/images/superman-lg.jpg',
    },
    appearance: {
      gender: 'Male',
      race: 'Kryptonian',
    },
  },
  {
    id: 3,
    name: 'Wonder Woman',
    work: {
      occupation: 'Ambassador of Themyscira',
    },
    biography: {
      publisher: 'DC Comics',
    },
    images: {
      xs: 'assets/images/wonder-woman-xs.jpg',
      sm: 'assets/images/wonder-woman-sm.jpg',
      md: 'assets/images/wonder-woman-md.jpg',
      lg: 'assets/images/wonder-woman-lg.jpg',
    },
    appearance: {
      gender: 'Female',
      race: 'Amazon',
    },
  },
  {
    id: 4,
    name: 'SpiderWoman',
    work: {
      occupation: 'Ambassador of Themyscira',
    },
    biography: {
      publisher: 'DC Comics',
    },
    images: {
      xs: 'assets/images/wonder-woman-xs.jpg',
      sm: 'assets/images/wonder-woman-sm.jpg',
      md: 'assets/images/wonder-woman-md.jpg',
      lg: 'assets/images/wonder-woman-lg.jpg',
    },
    appearance: {
      gender: 'Female',
      race: 'Human',
    },
  },
];

export const heroMock = heroesMock[0];
