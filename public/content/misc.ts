import { Technology as Tc } from "./types";

export const TechnologyDescription: {
  [key in Tc]: {
    title: string;
    description: string;
  };
} = {
  [Tc.bash]: {
    title: "Bash",
    description: "Bash is the language used to manipulate the command line",
  },
  [Tc.html]: {
    title: "HTML",
    description: "HTML is the markup language used to create web pages",
  },
  [Tc.mongo]: {
    title: "MongoDB",
    description: "MongoDB is a powerful NoSQL database",
  },
  [Tc.next]: {
    title: "Next.js",
    description: "Next.js is a react framework for building web apps",
  },
  [Tc.node]: {
    title: "Node.js",
    description: "Node.js is a JavaScript runtime for the UNIX-like system",
  },
  [Tc.python]: {
    title: "Python",
    description:
      "Python is a multipurpose programming language useful for AI, ML, web apps, and more",
  },
  [Tc.react]: {
    title: "React",
    description: "React is a JavaScript library for building user interfaces",
  },
  [Tc.sass]: {
    title: "Sass",
    description:
      "Sass is a CSS preprocessor with improved syntax and functionality",
  },
  [Tc.stripe]: {
    title: "Stripe",
    description: "Stripe is a payment processing platform",
  },
  [Tc.typescript]: {
    title: "Typescript",
    description: "Typescript is a JavaScript type-checking language",
  },
  [Tc.langchain]: {
    title: "LangChain",
    description:
      "LangChain is a library for building LLMs through composability",
  },
  [Tc.p5]: {
    title: "p5",
    description:
      "p5 is a JavaScript library for creative coding, interactive graphics, and games",
  },
};
