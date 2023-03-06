import { SocialPlatform, Technology as Tc } from "./types";

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

export const SocialDescription: {
  [key in SocialPlatform]: {
    icon: string;
    title: string;
    url: string;
  };
} = {
  [SocialPlatform.Twitter]: {
    icon: "/icons/twitter.svg",
    title: "Twitter",
    url: "https://twitter.com/IroncladDev",
  },
  [SocialPlatform.Dev]: {
    icon: "/icons/dev.svg",
    title: "Dev.to",
    url: "https://dev.to/ironcladdev",
  },
  [SocialPlatform.Github]: {
    icon: "/icons/github.svg",
    title: "Github",
    url: "https://github.com/Conner1115",
  },
  [SocialPlatform.Replit]: {
    icon: "/icons/replit.svg",
    title: "Replit",
    url: "https://replit.com/@IroncladDev",
  },
  [SocialPlatform.Email]: {
    icon: "/icons/email.svg",
    title: "Email",
    url: "mailto:connerow1115@gmail.com",
  },
  [SocialPlatform.Polywork]: {
    icon: "/icons/polywork.svg",
    title: "Polywork",
    url: "https://www.polywork.com/ironcladdev",
  },
  [SocialPlatform.Codepen]: {
    icon: "/icons/codepen.svg",
    title: "Codepen",
    url: "https://codepen.io/IroncladDev",
  },
  [SocialPlatform.Discord]: {
    icon: "/icons/discord.svg",
    title: "Discord",
    url: "/discord",
  },
  [SocialPlatform.Youtube]: {
    icon: "/icons/youtube.svg",
    title: "Youtube",
    url: "https://youtube.com/@IroncladDev",
  },
  [SocialPlatform.Codingame]: {
    icon: "/icons/codingame.svg",
    title: "Codingame",
    url: "https://www.codingame.com/profile/a8e83723bd266272a4564fe2bcd6a7907926134",
  },
};
