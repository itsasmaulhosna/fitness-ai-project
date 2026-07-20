export interface Program {
  _id: string;

  title: string;
  shortDescription: string;
  fullDescription: string;

  image: string;

  category: string;
  trainer: string;
  duration: string;
  level: string;

  price: string;
  slots: string;

  date: string;
  priority: string;
  location: string;

  createdAt?: string;
}