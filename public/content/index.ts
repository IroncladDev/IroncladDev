/**
 * Content for the Index page
 */

import { Projects } from "./projects";
import {
  Project,
  LazyBlogPost,
  BlogPostPlatform,
  Social,
  SocialPlatform,
} from "./types";

const Content: IndexPageContent = {
  headline: {
    titleHighlight: "Redneck",
    title: "Fullstack",
    subTitle: "Web Developer",
    description:
      "I'm IroncladDev, a Fullstack Web Developer who lives out in the country.  I ship results to production without relying on coffee.",
  },
  about: {
    title: "About Me 👋",
    paragraphs: [
      'Hi there!  My name is Conner Ow (Pronounced "ow" as if you got hurt), a seventeen-year-old Fullstack Developer.',
      "I enjoy developing websites, creating content, building with AI, competitive programming, and Brazillian Jiu-Jitsu.",
      "Most importantly, I can center a div and exit vim without much hassle.  Not committing node_modules and .env is a challenge sometimes.",
    ],
  },
  projects: {
    title: "Projects",
    description: "My top three personal favorites.",
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
        target:
          "replit/introducing-amjadgpt-an-ai-chatbot-that-acts-like-the-ceo-of-replit-4kl1",
        platform: BlogPostPlatform.Dev,
      },
      {
        target:
          "ironcladdev/create-a-personalized-chatbot-with-langchain-in-three-simple-steps-p4g",
        platform: BlogPostPlatform.Dev,
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
        platform: SocialPlatform.Twitter,
      },
      {
        url: "https://github.com/Conner1115",
        platform: SocialPlatform.Github,
      },
      {
        url: "/discord",
        platform: SocialPlatform.Discord,
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
  contact: {
    title: string;
    socials: Array<Social>;
  };
}

export default Content;
