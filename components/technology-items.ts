
export type TechnologyItem = {
  name: string;
  category: string;
  description: string;
  src: string;
  alt: string;
};

export const technologyItems: TechnologyItem[] = [
  {
    name: "Next.js",
    category: "WEB ENGINEERING",
    description: "Full-stack web applications",
    src: "/images/technologies/nextjs.svg",
    alt: "Next.js logo",
  },
  {
    name: "NestJS",
    category: "BACKEND SYSTEMS",
    description: "Structured server-side architecture",
    src: "/images/technologies/nestjs.svg",
    alt: "NestJS logo",
  },
  {
    name: "React Native",
    category: "MOBILE ENGINEERING",
    description: "Cross-platform mobile applications",
    src: "/images/technologies/react-native.svg",
    alt: "React Native logo",
  },
  {
    name: "Django",
    category: "BACKEND SYSTEMS",
    description: "Python web application development",
    src: "/images/technologies/django.svg",
    alt: "Django logo",
  },
  {
    name: "PyTorch",
    category: "MACHINE LEARNING",
    description: "Flexible machine-learning development",
    src: "/images/technologies/pytorch.svg",
    alt: "PyTorch logo",
  },
  {
    name: "TensorFlow",
    category: "MACHINE LEARNING",
    description: "Machine-learning model development",
    src: "/images/technologies/tensorflow.svg",
    alt: "TensorFlow logo",
  },
  {
    name: "Keras",
    category: "MACHINE LEARNING",
    description: "Deep-learning model workflows",
    src: "/images/technologies/keras.svg",
    alt: "Keras logo",
  },
  {
    name: "GSAP",
    category: "MOTION ENGINEERING",
    description: "Advanced interface animation",
    src: "/images/technologies/gsap.svg",
    alt: "GSAP logo",
  },
  {
    name: "Three.js",
    category: "3D WEB EXPERIENCES",
    description: "Interactive browser-based 3D",
    src: "/images/technologies/threejs.svg",
    alt: "Three.js logo",
  },
];
