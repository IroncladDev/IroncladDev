/**
 * Content for the Index page
 */

import { Projects } from "./projects";
import {
  Project,
  LazyBlogPost,
  BlogPostPlatform,
  Social,
  SocialPlatform
} from "./types";

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
    projects: Projects.slice(0, 3),
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
        target: "replit/introducing-amjadgpt-an-ai-chatbot-that-acts-like-the-ceo-of-replit-4kl1",
        platform: BlogPostPlatform.Dev
      },
      {
        target: "ironcladdev/create-a-personalized-chatbot-with-langchain-in-three-simple-steps-p4g",
        platform: BlogPostPlatform.Dev
      },
      {
        target: "802453",
        platform: BlogPostPlatform.Replit,
      },
    ],
  },
  contact: {
    title: "Let's get in touch",
    socials: [
      {
        url: "https://twitter.com/IroncladDev",
        platform: SocialPlatform.Twitter
      },
      {
        url: "https://replit.com/@IroncladDev",
        platform: SocialPlatform.Replit
      },
      {
        url: "/discord",
        platform: SocialPlatform.Discord
      }
    ]
  }
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
  contact: {
    title: string;
    socials: Array<Social>;
  }
}

export default Content;
