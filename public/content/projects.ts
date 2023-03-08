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
    title: "Replit Moderation Dashboard",
    slides: [
      `I built Replit's official Moderation Dashboard as a contract project before I started working at Replit.  At the time of creation, we had a very clunky and unorganized way we handled reports.
        \nThe entirety of the project took over a year, including a complete remake.
        \nAs of March 2023, the dashboard is being remade by some other community moderators.`,
      `The two main parts of the dashboard consist of a Reports page where we view and take action on reports made by users, and a Tools page where we can perform mass actions on larger amounts of users, or Repls.`,
      `Things started to get very unorganized and messy around mid-2022 so that's when I started remaking it to display more info, look better, and perform better.  I went from using next.js + scss to using Replit's UI library.
        \nAfter that, things started to flow better.  Finally in early 2023, I got occupied with other work and couldn't work on this anymore, so I ceased production and currently a new dashboard is being developed.`,
      `Overall this is one of the projects I'm most proud of.  I've gained experience, knowledge, and a much better topological view of abuse at Replit.`,
    ],
    stack: [Tc.next, Tc.react, Tc.sass],
    timeCreated: "2021-11-15",
    images: [
      "https://images.connerow.dev/showcase/mod-dash/index.png",
      "https://images.connerow.dev/showcase/mod-dash/filter.png",
      "https://images.connerow.dev/showcase/mod-dash/select.png",
      "https://images.connerow.dev/showcase/mod-dash/action.png",
      "https://images.connerow.dev/showcase/mod-dash/tools.png",
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
  {
    title: "Langchain.js LLM Template",
    slides: [
      `Shortly after launching AmjadGPT, Langchain.js just got released.  I created a template with it and made a tweet thread that went viral.
        \nI made the template because I really dislike the syntax of Python.`,
    ],
    timeCreated: "2023-02-29",
    stack: [Tc.node, Tc.langchain],
    url: "https://twitter.com/IroncladDev/status/1629534148091162626?s=20",
    sourceCodeUrl:
      "https://github.com/Conner1115/Celestronhttps://github.com/Conner1115/LangChain.js-LLM-Template",
    images: [
      "https://images.connerow.dev/showcase/llm-template/gh.png",
      "https://images.connerow.dev/showcase/llm-template/files.png",
    ],
  },
  {
    title: "Fendorea",
    slides: [
      `Fendorea is a site where users can create images with DALLE and with a prompt generator.  This was my first time using supabase, my first time making a typescript project on my own, and my last hobby project before starting work at Replit.`,
      `I really enjoyed building this project, and seeing how many cool images users generated.  I also implemented a moderation system, and a word blocklist to ensure that no NSFW content got exposed or generated.
        \nThe project still remains partially active and is still being used by many Replit users today.`,
    ],
    timeCreated: "2022-09-11",
    stack: [Tc.next, Tc.react, Tc.sass],
    url: "https://fendorea.ironcladdev.repl.co/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/Fendorea",
    images: [
      "https://images.connerow.dev/showcase/fendorea/index.png",
      "https://images.connerow.dev/showcase/fendorea/prompt.png",
      "https://images.connerow.dev/showcase/fendorea/spotlight.png",
    ],
  },
  {
    title: "All Metal Welding",
    slides: [
      `All Metal Welding was one of my freelance projects for a welder, Philip Davis.
        \nPhilip is currently living around northern Texas, so if you need a welding job done, you got the right man for the job 🔨`,
      `If you open the site, it still has a bit of Lorem Ipsum text on it since the content was never filled out completely by the client.
        \nThis was one of my first Next.js projects, and I'm happy how it turned out.`,
    ],
    timeCreated: "2021-05-31",
    stack: [Tc.next, Tc.react],
    url: "https://www.allmetalwelding.com/",
    sourceCodeUrl: "https://github.com/Conner1115/Metal",
    images: [
      "https://images.connerow.dev/showcase/amw/index.png",
      "https://images.connerow.dev/showcase/amw/about.png",
      "https://images.connerow.dev/showcase/amw/features.png",
    ],
  },
  {
    title: "KuhnHong.com",
    slides: [
      `Kuhn Hong has created some of the most amazing art I've ever laid my eyes on, and it was an honor to be able to build his website.
          \nThe design style I took on for this project is unique among all my other projects, and I really like how it turned out.`,
      `I had originally made this website in Flask, HTML, and CSS a year before (it looked horrible), but decided to remake it after having fallen in love with Next.js.`,
    ],
    timeCreated: "2021-08-11",
    stack: [Tc.next, Tc.react],
    url: "https://www.kuhnhong.com/",
    sourceCodeUrl: "https://github.com/Conner1115/KuhnHong",
    images: [
      "https://images.connerow.dev/showcase/kuhnhong/index.png",
      "https://images.connerow.dev/showcase/kuhnhong/preview.png",
      "https://images.connerow.dev/showcase/kuhnhong/gallery.png",
    ],
  },
  {
    title: "Tarragon",
    slides: [
      `A few Replit commmunity members and I made Tarragon for Replit's annual Kajam game jam.  This was not an entry, as we were "Kajam mentors", or helpers for competitors and participants.  We made this game as a surprise for the competitors to play at the end.`,
      `I drew the graphics and did most of the game mechanics.  The others who developed this had little experience with p5, and didn't have the time or ability to work on the graphics.`,
      `Building the four boss fights was really fun.  It was so cool to play around with movement, and make the bosses appear to be "smart" (still all if-else statements in the background).`,
      `This game is one of the most polished and beautiful games I've ever developed, and I really like how it turned out.  It was really fun to play around and experiment with pixel art animation, and it's really cool how animated it can be given the fact that pixel art is blocky.`,
    ],
    timeCreated: "2022-06-14",
    stack: [Tc.p5, Tc.html],
    url: "https://tarragon.haroon.repl.co/",
    sourceCodeUrl: "https://replit.com/@haroon/Tarragon",
    images: [
      "https://images.connerow.dev/showcase/tarragon/index.png",
      "https://images.connerow.dev/showcase/tarragon/ice.png",
      "https://images.connerow.dev/showcase/tarragon/portal.png",
      "https://images.connerow.dev/showcase/tarragon/fire.png",
      "https://images.connerow.dev/showcase/tarragon/stone.png",
    ],
  },
  {
    title: "Face the Darkness",
    slides: [
      `The creation Face the Darkness dates back to early 2020, when I was still using processing.js.  Although it's one of my oldest projects, it's one of the most polished ones I made as well.
        \nP5.js is quite simillar to processing.js, but is more performant, and is the modern version.`,
      `I wanted to try taking a metallic-glowy approach to the art style.  To accomplish this, I had to use a lot of loops, and also use image caching, or the game would be super laggy.
        \nThis was one of the first times I'd ever used image caching, and it has helped me a lot in making future games faster.`,
      `I originally made Face the Darkness on Khan Academy, but it never took off.  After posting it to Replit, a lot of people were able to discover it and play it.`,
      `My favorite part about building this project was designing the levels and enemies, and playing through it.`,
    ],
    timeCreated: "2020-02-01",
    stack: [Tc.html],
    url: "https://face-the-darkness.ironcladdev.repl.co/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/face-the-darkness",
    images: [
      "https://images.connerow.dev/showcase/face-the-darkness/index.png",
      "https://images.connerow.dev/showcase/face-the-darkness/climb.png",
      "https://images.connerow.dev/showcase/face-the-darkness/enemies.png",
      "https://images.connerow.dev/showcase/face-the-darkness/sorcerer.png",
      "https://images.connerow.dev/showcase/face-the-darkness/wraith.png",
    ],
  },
  {
    title: "Intercepter",
    slides: [
      `I built Intercepter for Replit's creator fund, and also won a spot and $500.  
        \nI had recently stumbled across [starblast.io](https://starblast.io), and really liked the gameplay and interface.  Another large inspiration was [Ivan Dubovik's artwork](https://dribbble.com/search/ivan-dubovik-march-of-robots) on Dribbble.  `,
      `The graphics in this game were relatively simple and took very little time.  I struggled with keeping the game performant, making the animations smooth, and implementing the pathfinding AI for the enemies and allies.`,
      `In terms of sound design, I think this game is my best one in that aspect, and also in terms of UI development.  
        \nPeople loved the game a lot and really wanted more levels to play, but I didn't have the capacity to add more since I was packed with other projects.
        \nI find it quite funny that one person in particular loved this game so much they tried to sell it to other people along with [swordbattle.io](https://swordbattle.io).`,
      `Overall, like the other games I developed, this one was really fun to make.  It was really fun to explore new methods, tweak and mess with the game, and last but not least, playing the game.`,
    ],
    timeCreated: "2022-08-01",
    stack: [Tc.html, Tc.p5],
    url: "https://intercepter.ironcladdev.repl.co/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/Intercepter",
    images: [
      "https://images.connerow.dev/showcase/intercepter/index.png",
      "https://images.connerow.dev/showcase/intercepter/rules.png",
      "https://images.connerow.dev/showcase/intercepter/gameplay1.png",
      "https://images.connerow.dev/showcase/intercepter/gameplay2.png",
      "https://images.connerow.dev/showcase/intercepter/gameplay3.png",
    ],
  },
  {
    title: "Orbitron Tower Defense",
    slides: [
      `The name "Orbitron Tower Defense" was inspired by the [Orbitron google font](https://fonts.google.com/specimen/Orbitron?query=orbitron).  This tower defense was made for a mini-jam on Khan Academy following the theme of no text.  Although there is text in the game, I drew the font out of pixel art.`,
      `This was one of the first games where I started to use a lot of image caching and optimize for performance.  Thousands of particles and items can be running on the screen with a decent framerate.
        \nI'm very proud of this project and still play it on my own sometimes.`,
    ],
    timeCreated: "2021-04-01",
    stack: [Tc.html, Tc.p5],
    url: "https://orbitron-3.ironcladdev.repl.co/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/Orbitron-3",
    images: [
      "https://images.connerow.dev/showcase/orbitron/index.png",
      "https://images.connerow.dev/showcase/orbitron/gameplay1.png",
      "https://images.connerow.dev/showcase/orbitron/gameplay2.png",
    ],
  },
  {
    title: "Advanced P5.js Platformer Engine",
    slides: [
      `I used Matter.js and P5.js to make this easy-to-use platformer template for people to kickstart their next game with.  Not only does this engine support default physics and mechanics, but also wall jumping, irregularly-shaped blocks, and more.`,
      `The documentation on how to use the engine is provided within the Repl, in a folder named "docs".`,
    ],
    timeCreated: "2022-08-02",
    stack: [Tc.html, Tc.p5],
    url: "https://advanced-p5js-platformer-engine.ironcladdev.repl.co/",
    sourceCodeUrl:
      "https://replit.com/@IroncladDev/Advanced-P5js-Platformer-Engine?v=1",
    images: [
      "https://images.connerow.dev/showcase/p5platform/index.png",
      "https://images.connerow.dev/showcase/p5platform/jump.png",
    ],
  },
  {
    title: "Vulcanist",
    slides: [
      `Vulcanist is a multiplayer first person shooter made for Replit's 2021 Kajam competition.  I spent 15-17 hours coding for seven days straight for the game jam, and I'm glad I spent that much of my time on it.
        \nI remember the old days of Replit Apps and the fading remains of Repltalk.  I remember dying to get my project trending and was really happy when it did.
        \nVulcanist won an honorable mention in the closing ceremony.  I of course was a little sad that all this work, time, and dedication didn't yield the results I wanted, but looking back I realize I didn't follow the jam theme closely at all.`,
      `The first thing I did was come up with a story and draw the cutscenes.  In total, I believe there are over fifty cutscenes, drawn in pixel art.
        \nAfter that, I started working on game mechanics, UI, audio and audio visualization, AI, and more.`,
      `The two most challenging things I faced were the lag and the fact that people were botting the multiplayer and chat features, eventually leading to the game being broken down due to all this.
        \nThe lag was so bad that I wondered if ever I'd even get to finish the game.  The abuse was also annoying, and bad enough to the point that I almost deleted the multiplayer features.
        \nAfter sitting at a computer for so long and being smashed in the face with these issues, you really get drained.`,
      `"Why a multiplayer feature?", you might ask.  I surprisingly was able to finish all the levels and game mechanics in the first five days, and decided I wanted to take it a step further and shoot for the winning prize.
        \nIt took a lot of work to add custom skins and models for the multiplayers, but essentially I had the original classes such as bullets, players, etc - so I reused them.`,
    ],
    timeCreated: "2021-11-07",
    stack: [Tc.html, Tc.p5, Tc.node],
    url: "https://vulcanist.ironcladdev.repl.co/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/Vulcanist",
    images: [
      "https://images.connerow.dev/showcase/vulcanist/index.png",
      "https://images.connerow.dev/showcase/vulcanist/gameplay.png",
      "https://images.connerow.dev/showcase/vulcanist/cutscene.png",
      "https://images.connerow.dev/showcase/vulcanist/ooooh.png",
      "https://images.connerow.dev/showcase/vulcanist/mom.png",
      "https://images.connerow.dev/showcase/vulcanist/ded.png",
    ],
  },
  {
    title: "Replyte",
    slides: [
      `Replyte is a realtime chat app hosted on Replit.  I found a way to hook up an express.js server to a Next.js application, so I utilized that to enable websockets with Socket.io.
        \nThis project won a spot in the Replit's [Creator Fund](https://replit.com/@replit/Replit-Creator-Fund) program, and I won $500 for it.`,
      `Overall, Replyte was a really fun project to build.  Not only did I make a chat system, but I also made a fully-functional moderation system and a bot.
        \nFighting abuse, spammers, and botters took the most time in building this - so much to the point where I just tightened ratelimits, and prevented users from posting images.`,
      `At the moment, the project remains active only partially.  Most of the usage comes from either curious people who stumble across my profile, or students in school who want to communicate with each other.`,
    ],
    timeCreated: "2022-08-15",
    stack: [Tc.next, Tc.react, Tc.sass, Tc.mongo, Tc.node],
    url: "https://replyte.connerow.dev/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/Replyte-Chat-App",
    images: [
      "https://images.connerow.dev/showcase/replyte/index.png",
      "https://images.connerow.dev/showcase/replyte/chat.png",
    ],
  },
  {
    title: "Next-Admin",
    slides: [
      `I made a very simple Next.js password-gated admin dashboard that can be set up by just editing a json file to configure your page structure, and a single environment variable.`,
      `This was a very small project, and I wasn't expecting many people to even see it, but it [took off on dev.to](https://dev.to/ironcladdev/adding-a-nextjs-administration-dashboard-to-your-site-in-seconds-7jb) and still remains one of my top posts today.
        \nI got the Next.js Top Author of the Week badge as well as landing a spot in the top 7 posts of the week.`,
      `I usually find it hard and annoying to have to go into my source code to change a single paragraph, so this is why I decided to build this project.
        \nUnfortunately due to filesystem limitations, the next admin won't work in a production environment, and should be instead hooked up to a json database of some sort.
        \nProduction has ceased on this project.`,
    ],
    timeCreated: "2022-08-15",
    stack: [Tc.next, Tc.react, Tc.sass],
    url: "https://next-admin.ironcladdev.repl.co/",
    sourceCodeUrl: "https://github.com/Conner1115/next-admin",
    images: [
      "https://images.connerow.dev/showcase/next-admin/index.png",
      "https://images.connerow.dev/showcase/next-admin/playground.png",
      "https://images.connerow.dev/showcase/next-admin/login.png",
      "https://images.connerow.dev/showcase/next-admin/edit2.png",
    ],
  },
  {
    title: "Agape Chiropractic TX",
    slides: [
      `Agape Chiropractic TX was one of the first websites I'd built back in 2020 for my dad.  
        \nIt's built in static HTML and uses a sort of whacky and old design.`,
      `Despite being a simple site, the time it took to fix all the typos and perfect it took over three months.`,
    ],
    timeCreated: "2020-04-1",
    stack: [Tc.html],
    url: "https://agapechiro-tx.com/",
    sourceCodeUrl: "https://github.com/Conner1115/AgapeChirow",
    images: [
      "https://images.connerow.dev/showcase/agape/index.png",
      "https://images.connerow.dev/showcase/agape/animal.png",
      "https://images.connerow.dev/showcase/agape/pricing.png",
    ],
  },
  {
    title: "Grace Reformed Baptist Church",
    slides: [
      `I made the website for my church, which is currently located in Honey Grove, Texas.  My dad took some pictures at church and gave them to me to insert in the site.
        \nThis website was made in static HTML, and adopts some of the worst web dev practices, of which I will never to use again.`,
    ],
    timeCreated: "2020-02-15",
    stack: [Tc.html],
    url: "https://gracerbcbonham.com/",
    images: [
      "https://images.connerow.dev/showcase/grbc/index.png",
      "https://images.connerow.dev/showcase/grbc/worship.png",
    ],
  },
];

const ProjectsPage: ProjectsPageType = {
  title: "Showcase",
  description:
    "I enjoy making websites, games, and open-source projects for the world to use.  Launching a new project to production is so rewarding 🚀",
  projects: Projects,
};

interface ProjectsPageType {
  title: string;
  description: string;
  projects: Array<Project>;
}

export default ProjectsPage;
