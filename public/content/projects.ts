import { Project, Technology as Tc } from "./types";

export const Projects: Array<Project> = [
  {
    title: "AmjadGPT",
    slides: [
      `AmjadGPT is a chatbot trained to act like Amjad Masad, built with LangChain and Next.js.

This was my first time exploring Langchain.  It was a wild adventure from starting out to completing it.  I'm very proud of this project and how it turned out.`,
      `AmjadGPT uses \`text-davinci-003\` in the background and was fed the following data:

 - The [Replit docs](https://docs.replit.com), [Blog](https://blog.replit.com), and [Landing Page](https://replit.com)
 - The Replit Employee Organization Chart
 - Amjad's [personal blog](https://amasad.me), [AmA Repl](https://replit.com/@amasad/AmA?v=1), Podcasts, and [Tweets](https://twitter.com/amasad)
 - Replit's [Terms of Service](https://replit.com/site/terms) and [Community guidelines](https://welcome.moderation.repl.co)
 - Some random facts the AI should be aware of`,
      `I first built the AI part of this project with Python, but moved over to Langchain.js when it came out.
        \nPython was getting too ugly and unorganized for me, and hosting + using an external API outside of my Repl posed a security concern and a lower uptime guaruntee.`,
    ],
    stack: [
      Tc.langchain,
      Tc.typescript,
      Tc.next,
      Tc.python,
      Tc.mongo,
      Tc.node,
      Tc.sass,
    ],
    timeCreated: "2023-02-23",
    url: "https://ai.repl.page",
    sourceCodeUrl: "https://github.com/Conner1115/Amjad-GPT",
    images: [
      "https://images.connerow.dev/showcase/amjadGPT/login.png",
      "https://images.connerow.dev/showcase/amjadGPT/index.png",
      "https://images.connerow.dev/showcase/amjadGPT/settings.png",
    ],
  },
  {
    title: "YouBarter",
    slides: [
      "YouBarter is a non-profit organization where everyone can share and help in their own community by bartering with each other.",
      `**💡 Inspiration**
          \nMy mom originally came up with the idea of a platform where people could easily locate and barter with each other.
          \nAround Mid-February, 2022, I started to bring that idea to life.`,
      `At the moment, there are no active users and the project has died.  Nonetheless, I really am proud to have this project on my portfolio.`,
    ],
    stack: [Tc.next, Tc.node, Tc.react, Tc.mongo, Tc.sass],
    timeCreated: "2022-02-15",
    url: "https://www.youbarter.us/",
    sourceCodeUrl: "https://github.com/Conner1115/yb2",
    images: [
      "https://images.connerow.dev/showcase/youbarter/index.png",
      "https://images.connerow.dev/showcase/youbarter/login.png",
      "https://images.connerow.dev/showcase/youbarter/function.png",
      "https://images.connerow.dev/showcase/youbarter/spotlight.png",
    ],
  },
  {
    title: "Celestron",
    slides: [
      `Celestron is a tower defense game based around the [Replit](https://replit.com) community.
        \n🏆 1st place winner in Replit's [Made with Replit](https://hopin.com/events/made-with-replit/registration) hackathon. 
        \nDeveloped by me, [spotandjake](https://replit.com/@spotandjake), and [JDOG787](https://replit.com/@JDOG787).`,
      `For a week, me and my teammates coded like never before to get the project across the finish line.
        \nThis was the first project in which I used Typescript and Sass.  I ended up loving and picking up Sass as an official part of my programming stack.`,
    ],
    timeCreated: "2022-04-15",
    stack: [Tc.p5, Tc.typescript, Tc.sass, Tc.node],
    url: "https://celestron.spotandjake.repl.co",
    sourceCodeUrl: "https://github.com/Conner1115/Celestron",
    images: [
      "https://images.connerow.dev/showcase/celestron/index.png",
      "https://images.connerow.dev/showcase/celestron/gameplay.png",
    ],
  },
];
