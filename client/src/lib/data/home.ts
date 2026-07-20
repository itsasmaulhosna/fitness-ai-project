import type {
  BlogPost,
  Category,
  Feature,
  Program,
  Stat,
  Testimonial,
  Trainer,
} from "@/types/home.types";

export const featuredPrograms: Program[] = [
  {
    id: "1",
    slug: "strength-foundation",
    title: "Strength Foundation",
    description:
      "Build a solid strength base with progressive overload and proper form fundamentals.",
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    difficulty: "beginner",
    durationWeeks: 8,
    price: 49.99,
    category: "Strength",
  },
  {
    id: "2",
    slug: "hiit-burn",
    title: "HIIT Burn Program",
    description:
      "High-intensity intervals designed to maximize fat burn and cardiovascular endurance.",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    difficulty: "intermediate",
    durationWeeks: 6,
    price: 39.99,
    category: "Cardio",
  },
  {
    id: "3",
    slug: "hybrid-athlete",
    title: "Hybrid Athlete",
    description:
      "Combine strength and conditioning for peak athletic performance and versatility.",
    imageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    difficulty: "advanced",
    durationWeeks: 12,
    price: 79.99,
    category: "Hybrid",
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Strength Training",
    description: "Build muscle and increase power with structured lifting programs.",
    icon: "dumbbell",
    programCount: 24,
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "2",
    name: "Cardio & HIIT",
    description: "Boost endurance and burn calories with high-energy cardio sessions.",
    icon: "heart-pulse",
    programCount: 18,
    color: "from-emerald-600 to-emerald-800",
  },
  {
    id: "3",
    name: "Yoga & Flexibility",
    description: "Improve mobility, balance, and mental clarity through mindful movement.",
    icon: "sparkles",
    programCount: 15,
    color: "from-violet-600 to-violet-800",
  },
  {
    id: "4",
    name: "Nutrition Plans",
    description: "Fuel your body with expert-designed meal plans and macro guidance.",
    icon: "apple",
    programCount: 12,
    color: "from-amber-600 to-amber-800",
  },
];

export const features: Feature[] = [
  {
    id: "1",
    title: "Personalized Programs",
    description:
      "Workouts tailored to your fitness level, goals, and available equipment.",
    icon: "target",
  },
  {
    id: "2",
    title: "Expert Guidance",
    description:
      "Learn from certified trainers with years of professional coaching experience.",
    icon: "award",
  },
  {
    id: "3",
    title: "Progress Tracking",
    description:
      "Monitor workouts, nutrition, and goals with intuitive dashboards and charts.",
    icon: "trending-up",
  },
  {
    id: "4",
    title: "Flexible Scheduling",
    description:
      "Train on your time with programs that adapt to your busy lifestyle.",
    icon: "calendar",
  },
  {
    id: "5",
    title: "Community Support",
    description:
      "Join thousands of members motivating each other toward shared fitness goals.",
    icon: "users",
  },
  {
    id: "6",
    title: "Science-Backed Methods",
    description:
      "Every program is built on proven exercise science and nutrition research.",
    icon: "flask-conical",
  },
];

export const stats: Stat[] = [
  { id: "1", value: "50K+", label: "Active Members" },
  { id: "2", value: "120+", label: "Workout Programs" },
  { id: "3", value: "85+", label: "Expert Trainers" },
  { id: "4", value: "98%", label: "Satisfaction Rate" },
];

export const trainers: Trainer[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Head Strength Coach",
    bio: "15 years of experience training athletes and everyday fitness enthusiasts.",
    imageUrl:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    specialties: ["Strength", "Powerlifting", "Mobility"],
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "HIIT Specialist",
    bio: "Former competitive sprinter specializing in metabolic conditioning programs.",
    imageUrl:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80",
    specialties: ["HIIT", "Cardio", "Fat Loss"],
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Nutrition & Wellness",
    bio: "Registered dietitian helping members fuel their bodies for optimal performance.",
    imageUrl:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=800&q=80",
    specialties: ["Nutrition", "Meal Plans", "Recovery"],
  },
  {
    id: "4",
    name: "James Okonkwo",
    role: "Hybrid Training Lead",
    bio: "CrossFit Level 3 trainer blending strength, gymnastics, and endurance work.",
    imageUrl:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
    specialties: ["CrossFit", "Hybrid", "Functional"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "FitTrack completely transformed my approach to fitness. I lost 15kg in 6 months and feel stronger than ever. The programs are challenging but perfectly structured.",
    name: "Amanda Foster",
    role: "Lost 15kg in 6 months",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "As a busy professional, I needed something flexible. FitTrack's hybrid programs fit perfectly into my schedule. The progress tracking keeps me motivated every day.",
    name: "David Park",
    role: "Software Engineer",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "The expert trainers and nutrition guidance made all the difference. I've gained muscle, improved my energy levels, and finally understand how to eat for my goals.",
    name: "Rachel Kim",
    role: "Marathon Runner",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "science-of-progressive-overload",
    title: "The Science of Progressive Overload",
    excerpt:
      "Learn how gradually increasing training stress leads to consistent strength gains and muscle growth.",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    category: "Training",
    readTime: "5 min read",
    publishedAt: "Jul 10, 2026",
  },
  {
    id: "2",
    slug: "nutrition-basics-for-beginners",
    title: "Nutrition Basics for Beginners",
    excerpt:
      "A practical guide to macronutrients, meal timing, and building sustainable eating habits.",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    category: "Nutrition",
    readTime: "7 min read",
    publishedAt: "Jul 5, 2026",
  },
  {
    id: "3",
    slug: "recovery-strategies-that-work",
    title: "Recovery Strategies That Actually Work",
    excerpt:
      "Sleep, mobility, and active recovery techniques to maximize your training results.",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    category: "Recovery",
    readTime: "4 min read",
    publishedAt: "Jun 28, 2026",
  },
];

export const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Categories", href: "/category" }, 
  { label: "Trainers", href: "/trainers" },
  { label: "Blog", href: "/blog" },
];

export const footerLinks = {
  product: [
    { label: "Programs", href: "/programs" },
    { label: "Categories", href: "#categories" },
    { label: "Pricing", href: "/programs" },
    { label: "Trainers", href: "#trainers" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "FAQ", href: "#" },
  ],
};
