/**
 * Content for the Index page
 */

import { Project, LazyBlogPost, BlogPostPlatform } from "./types";

const Content: IndexPageContent = {
  headline: {
    titleHighlight: "Redneck",
    title: "Fullstack",
    subTitle: "Web Developer",
    description:
      "I'm Conner Ow, a Fullstack Web Developer that lives out in the county.  I currently do Support Engineering at [Replit](https://replit.com).",
  },
  about: {
    title: "About Me 👋",
    paragraphs: [
      "Hi there!  My name is Conner Ow (Pronounce 'ow' as if you got hurt), a seventeen-year-old fullstack developer who enjoys building Websites and blogging on developer platforms.",
      "I work at [Replit](https://replit.com) as a Support Engineer.  I also enjoy content creation, Anti-Abuse, and Product Engineering.",
      "Aside from coding, I enjoy drawing, solving puzzles, competitive programming, and doing Brazillian Jiu-Jitsu.",
    ],
  },
  projects: {
    title: "Projects",
    description: "Here are some of my personal favorite projects.",
    projects: [
      {
        title: "YouBarter",
        description:
          "YouBarter is a non-profit organization where everyone can share and help in their own community by bartering with each other.",
        slides: ["YouBarter is a non-profit organization where everyone can share and help in their own community by bartering with each other.", "sliiiiide much fun wheeee"],
        stack: ["next", "node", "react", "mongo", "sass"],
        timeCreated: "2022-02-15",
        url: "https://www.youbarter.us/",
        sourceCodeUrl: "https://github.com/Conner1115/yb2",
        images: ["https://images.connerow.dev/showcase/youbarter/index.png", "https://images.connerow.dev/showcase/youbarter/login.png", "https://images.connerow.dev/showcase/youbarter/function.png"],
      },
      {
        title: "Celestron",
        description:
          "Celestron is a tower defense game based around the [Replit](https://replit.com) community. It won 1st place in a hackathon. Developed by me, [spotandjake](https://replit.com/@spotandjake), and [JDOG787](https://replit.com/@JDOG787).",
        slides: ["Celestron is a tower defense game based around the [Replit](https://replit.com) community. It won 1st place in a hackathon. Developed by me, [spotandjake](https://replit.com/@spotandjake), and [JDOG787](https://replit.com/@JDOG787)."],
        timeCreated: "2022-04-15",
        stack: ["p5", "typescript", "sass", "node"],
        url: "https://celestron.spotandjake.repl.co",
        sourceCodeUrl: "https://github.com/Conner1115/Celestron",
        images: ["https://images.connerow.dev/showcase/celestron/index.png", "https://images.connerow.dev/showcase/celestron/gameplay.png"],
      },
    ],
  },
  blog: {
    title: "Blog",
    description:
      "I enjoy posting on developer platforms such as [Dev](https://dev.to/) and [Replit](https://replit.com/). Here are some of my top posts.",
    posts: [
      {
        target:
          "ironcladdev/15-killer-js-techniques-youve-probably-never-heard-of-1lgp",
        platform: BlogPostPlatform.Dev,
      },
      {
        target: "ironcladdev/three-solid-minimalist-components-1275",
        platform: BlogPostPlatform.Dev,
      },
      {
        target: "802453",
        platform: BlogPostPlatform.Replit,
      },
    ],
  },
};

interface IndexPageContent {
  headline: {
    titleHighlight: string;
    title: string;
    subTitle: string;
    description: string;
  };
  about: {
    title: string;
    paragraphs: Array<string>;
  };
  projects: {
    title: string;
    description: string;
    projects: Array<Project>;
  };
  blog: {
    title: string;
    description: string;
    posts: Array<LazyBlogPost>;
  };
}

export default Content;
