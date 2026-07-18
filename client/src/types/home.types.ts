export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: Difficulty;
  durationWeeks: number;
  price: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  programCount: number;
  color: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  readTime: string;
  publishedAt: string;
}
