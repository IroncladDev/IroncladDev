/**
 * Content for the Index page
 */

import { Projects } from "./projects";
import { Project, Social, SocialPlatform } from "./types";

const Content: IndexPageContent = {
  headline: {
    titleHighlight: "Redneck",
    title: "Fullstack",
    subTitle: "Web Developer",
    description:
      "I'm IroncladDev, a Texan Fullstack Dev who lives out in the country. I turn red meat into quality code and also I use Neovim, btw.",
  },
  about: {
    title: "Howdy 👋",
    paragraphs: [
      "I'm Conner, I'm eighteen years old, and I ship stuff.",
      "I enjoy building cool things with code, tweaking my Neovim configuration, competitive programming, and Brazillian Jiu-Jitsu.",
      "I can center a div and exit vim (Neovim, btw) with my eyes closed. Sometimes I still commit node_modules and .env but I'm working on it.",
    ],
  },
  projects: {
    title: "Projects",
    description: "My top three",
    projects: Projects.slice(0, 3),
  },
  contact: {
    title: "Let's get in touch",
    socials: [
      {
        url: "https://twitter.com/IroncladDev",
        platform: SocialPlatform.Twitter,
      },
      {
        url: "https://github.com/IroncladDev",
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
  contact: {
    title: string;
    socials: Array<Social>;
  };
}

export default Content;
