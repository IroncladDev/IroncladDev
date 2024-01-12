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
  [Tc.typescript]: {
    title: "Typescript",
    description: "Typescript is a JavaScript type-checking language",
  },
  [Tc.next]: {
    title: "Next.js",
    description: "Next.js is a react framework for building web apps",
  },
  [Tc.framer]: {
    title: "Framer Motion",
    description:
      "Framer Motion is a React library for making beautiful and performant animations",
  },
  [Tc.node]: {
    title: "Node.js",
    description: "Node.js is a JavaScript runtime for the UNIX-like system",
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
  [Tc.python]: {
    title: "Python",
    description:
      "Python is a multipurpose programming language useful for AI, ML, web apps, and more",
  },
  [Tc.stripe]: {
    title: "Stripe",
    description: "Stripe is a payment processing platform",
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
  [Tc.emotion]: {
    title: "Emotion CSS",
    description:
      "Emotion is a library designed for writing css styles with JavaScript",
  },
  [Tc.kaboom]: {
    title: "Kaboom.js",
    description:
      "Kaboom is a Javascript framework for making 2D browser-based games.",
  },
  [Tc.supabase]: {
    title: "Supabase",
    description:
      "Supabase is a cloud-based database that lets you manage your data securely and privately",
  },
  [Tc.htmx]: {
    title: "HTMX",
    description: "High-Power Tools for HTML",
  },
  [Tc.hyperscript]: {
    title: "Hyperscript",
    description:
      "Hyperscript simplifies front-end web development by embedding code directly on web page elements for easy event handling and DOM manipulation.",
  },
  [Tc.bun]: {
    title: "Bun",
    description:
      "Bun is a TypeScript compiler that compiles your code to JavaScript.",
  },
  [Tc.tailwind]: {
    title: "Tailwind CSS",
    description:
      "Tailwind is a utility-first CSS framework that lets you focus on your content.",
  },
  [Tc.redis]: {
    title: "Redis",
    description: "Redis is an open source, in-memory data structure store",
  },
  [Tc.prisma]: {
    title: "Prisma",
    description: "Prisma is a Node.js & TypeScript ORM which provides global database caching, connection pooling, and real-time database events.",
  }
};

export const SocialDescription: {
  [key in SocialPlatform]: {
    icon: string;
    title: string;
    url: string;
    handle: string;
    description: string;
  };
} = {
  [SocialPlatform.Twitter]: {
    icon: "/icons/twitter.svg",
    title: "Twitter",
    url: "https://twitter.com/IroncladDev",
    handle: "@IroncladDev",
    description:
      "I create and post Programming / AI content on Twitter regularly.",
  },
  [SocialPlatform.Dev]: {
    icon: "/icons/dev.svg",
    title: "Dev.to",
    url: "https://dev.to/ironcladdev",
    handle: "@IroncladDev",
    description:
      "I occasionally make programming tutorials and articles on Dev.",
  },
  [SocialPlatform.Github]: {
    icon: "/icons/github.svg",
    title: "Github",
    url: "https://github.com/IroncladDev",
    handle: "@IroncladDev",
    description:
      "If you look carefully, you might catch me committing node_modules or .env.",
  },
  [SocialPlatform.Replit]: {
    icon: "/icons/replit.svg",
    title: "Replit",
    url: "https://replit.com/@IroncladDev",
    handle: "@IroncladDev",
    description: "I host games, small websites, and part of my blog on Replit.",
  },
  [SocialPlatform.Discord]: {
    icon: "/icons/discord.svg",
    title: "Discord",
    url: "/discord",
    handle: "@ironcladdev",
    description:
      "Discord is the best place to reach me.  DMs are open for mutual servers.",
  },
  [SocialPlatform.Email]: {
    icon: "/icons/email.svg",
    title: "Email",
    handle: "conner@connerow.dev",
    url: "mailto:conner@connerow.dev",
    description: "Don't have a social media account?  Send an email my way.",
  },
};
