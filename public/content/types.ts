export type Technology = "bash" | "html" | "mongo" | "next" | "node" | "python" | "react" | "sass" | "stripe" | "typescript" | "langchain" | "p5";

export interface Project {
  title: string;
  description: string; // array of strings later
  timeCreated: string; // date later
  url?: string;
  sourceCodeUrl?: string;
  images: Array<string>;
  slides: Array<string>;
  stack: Array<Technology>;
}

export enum BlogPostPlatform {
  Dev = "Dev",
  Replit = "Replit",
}

export interface LazyBlogPost {
  target: string;
  platform: BlogPostPlatform;
}

export interface BlogPost {}
