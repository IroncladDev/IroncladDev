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
      Tc.emotion,
    ],
    timeCreated: "February 2023",
    url: "https://ai.repl.page",
    sourceCodeUrl: "https://github.com/IroncladDev/Amjad-GPT",
    images: [
      "/images/amjadGPT/login.png",
      "/images/amjadGPT/index.png",
      "/images/amjadGPT/settings.png",
    ],
  },
  {
    title: "Hyperdome",
    slides: [
      `Hyperdome, short for "HTMX Thunderdome" is an AI chat app that comes with three AI presets consisting of:

- the [@htmx_org](https://x.com/htmx_org) twitter account
- Carson Gross, the creator of HTMX
- Grug, the main character in [grugbrain.dev](https://grugbrain.dev)

This was my first time actually using Bun, HTMX, and Hyperscript in a project and I had a **blast**`,
      `After [Replit](https://replit.com) announced [Modelfarm](https://blog.replit.com/modelfarm), I decided I wanted to build a project with it.

I wasn't familiar with how context, embeddings, and vectors worked yet, so I created a bounty which [Tanya Kemkar](https://twitter.com/kemkartanya) built for me.

I modified the completed bounty and published a template [Modelfarm with Context](https://replit.com/@IroncladDev/Modelfarm-With-Context?v=1) on Replit.

Shortly after, Replit announced their [Virtual Modelfarm Hackathon](https://twitter.com/Replit/status/1703834805572715003), which was an even better excuse for me to build this.`,
      `I then proceeded to build Hyperdome while trying out a few new technologies.
      
I trained it on a ton of data including:

- The HTMX [Github Repository](https://github.com/bigskysoftware/htmx) and [Documentation](https://htmx.org/)
- The Hyperscript [Source code](https://github.com/bigskysoftware/_hyperscript) and [Documentation](https://hyperscript.org/docs/)
- [Hypermedia Systems](https://hypermedia.systems)
- [Grugbrain.dev](https://grugbrain.dev/)
- Tons of tweets
- Documented trends, lore, and famous players in the HTMX shitposting history`,
    ],
    stack: [
      Tc.typescript,
      Tc.next,
      Tc.supabase,
      Tc.htmx,
      Tc.hyperscript,
      Tc.tailwind,
      Tc.bun,
    ],
    timeCreated: "November 2023",
    url: "https://h-t.mx",
    sourceCodeUrl: "https://github.com/IroncladDev/HTMXBot",
    images: [
      "/images/hyperdome/index.png",
      "/images/hyperdome/presets.png",
      "/images/hyperdome/chat.png",
      "/images/hyperdome/presets.png",
    ],
  },
  {
    title: "Replit",
    slides: [
      `I worked at Replit as a Support Engineer from August 2022 to July 2023 and used a wide range of technologies from GraphQL to Next.js and implemented various features.
      \nOne of the first things I fixed was jumping to a comment from your notifications.  Previously, there was no way to find which notification a comment was linked to.`,
      `Over the course of a few months, I redesigned and improved the structure of Replit's documentation and became the top contributor.`,
      `I redesigned the Ask forum by modifying the discourse default theme with over a thousand lines of SCSS.  It's a bit unpolished, but it looks more like Replit.`,
      `The Support Team migrated to the Ask Forum for bug reports and feedback instead of directly letting users contact Support.
      \nI built the Support Flow located in the Help menu in the sidebar.`,
      `The job of a Support Engineer is to try and help users find a solution as soon as possible, preferably before contacting the Support Team.
      \nI built an indicator that linked to the Status page and displayed whenever there was an ongoing incident to prevent further user confusion.`,
      `I had been in the Replit Community for almost three years and really enjoyed engaging with and updating them with newly-released features.
      \nI took ownership of writing the [Replit Changelog](https://docs.replit.com/updates) and eventually came around to tweeting it from the main [Replit Twitter Account](https://twitter.com/replit).`,
      `I built and wrote most of the documentation for Replit Extensions, including tutorials, examples, and the API reference.`,
      `I maintained the Replit Extensions Client and became one of the top two contributors of the [Repository](https://github.com/replit/extensions).
      \nI also built the foundations of the React Client to provide extension developers with a seamless and easy-to-use library for making Replit Extensions.`,
      `The Extensions API would often break at times, resulting in multiple incidents and creating a bad developer and end-user experience.
      \n I made an API tester to ensure that all the existing APIs worked as expected.`,
      `My last project and the one I'm most proud of is the Extensions store.  I implemented a search, ordering, and filtering form to enable people to find the Extension they need.`,
    ],
    timeCreated: "August 2022",
    stack: [Tc.next, Tc.typescript, Tc.react, Tc.emotion],
    url: "https://replit.com",
    images: [
      "/images/replit/index.png",
      "/images/replit/comment-jump.png",
      "/images/replit/docs-index.png",
      "/images/replit/ask.png",
      "/images/replit/support-flow.png",
      "/images/replit/status-indicator.png",
      "/images/replit/changelog.png",
      "/images/replit/extension-docs.png",
      "/images/replit/extensions-client.png",
      "/images/replit/extensions-tester.png",
      "/images/replit/extensions-store.png",
    ],
  },
  {
    title: "Agape Chiropractic TX",
    slides: [
      `I rebuilt my dad's home business chiropractic website with Framer Motion and Next.js.  The first version (bottom of page) is a literal embarrassment compared to this one.
        \nI took on a minimalistic black-on-white design and used some fancy animations with the aid of Framer Motion.  It turned out as one of the cleanest and most polished websites I'd ever built.`,
      `I'm really happy how this one turned out, and thanks to this, I'd adopted Framer Motion (React) as a new technology for my programming stack.
        \nLove you dad <3`,
    ],
    timeCreated: "June 2023",
    stack: [Tc.next, Tc.react, Tc.emotion],
    url: "https://agapechiro-tx.com/",
    sourceCodeUrl: "https://github.com/IroncladDev/AgapeChirow",
    images: [
      "/images/agapev2/index.png",
      "/images/agapev2/services.png",
      "/images/agapev2/contact.png",
    ],
  },
  {
    title: "Liberty Cappy",
    slides: [
      `I built a website for [Liberty Cappy](https://twitter.com/LibertyCappy), a large Twitter/X influencer.
        \nI had a lot of fun building, tweaking, and polishing the site. The scroll-linked animations built with Framer Motion, SVG, and HTML Canvas, were very fun to build.`,
      `One of the major challenges I faced was figuring out how to fit the Shop and Contacts page on a mobile device.
        \nThanks to Framer Motion's mouse drag utilities, I was able to add a horizontal carousel for smaller screens without corrupting the rest of the UI.`,
      `Out of all the projects I've built, this one probably has the best lighthouse score (still a little whacky on mobile).
        \nI'm really happy to be able to support a guy like this and I'm really appreciative of the opportunity this guy gave me.`,
    ],
    timeCreated: "August 2023",
    stack: [Tc.next, Tc.react, Tc.framer, Tc.emotion, Tc.typescript],
    url: "https://libertycappy.com/",
    images: [
      "/images/cappy/scroll1.png",
      "/images/cappy/about.png",
      "/images/cappy/shop.png",
      "/images/cappy/accounts.png",
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
    timeCreated: "February 2022",
    url: "https://www.youbarter.us/",
    sourceCodeUrl: "https://github.com/IroncladDev/yb2",
    images: [
      "/images/youbarter/index.png",
      "/images/youbarter/login.png",
      "/images/youbarter/function.png",
      "/images/youbarter/spotlight.png",
    ],
  },
  {
    title: "AI Playground (Replit Extension)",
    slides: [
      `I built a Replit Extension that allows users to chat with multiple AI models, customize the base prompts, and even run and compare different AI models in parallel.`,
      `Users can switch between a **chat** and **prompt** interface to choose between parallel mode and chat mode.
      \nAs of July 2023, the AI playground remains the top Replit Extension in the store with over 6,200 installs.`,
    ],
    stack: [Tc.next, Tc.node, Tc.react, Tc.mongo, Tc.sass],
    timeCreated: "April 2023",
    url: "https://replit.com/extensions",
    images: [
      "/images/ai-playground/index.png",
      "/images/ai-playground/chat.png",
      "/images/ai-playground/compare.png",
    ],
  },
  {
    title: "ReplTV (Replit Extension)",
    slides: [
      `ReplTV allows you to stream your code directly within the Replit Workspace.  A collaboration between [bddy](https://replit.com/@bddy), [haroon](https://replit.com/@haroon), and I.
      \nThe extension watches the contents of the current file you are coding in and streams it to all viewers over websockets.`,
      `Viewers can post in the built-in chat and watch exactly what the streamer is coding.
      \nStreamers can self-moderate their own streams such as temporarily kicking or muting an abusive viewer.`,
      `This was a really challenging project to make as it was the most complex use of websockets I'd ever attempted, but the result was extremely satisfying.`,
    ],
    stack: [Tc.next, Tc.node, Tc.react, Tc.mongo, Tc.sass],
    timeCreated: "March 2023",
    url: "https://replit.com/extensions",
    images: [
      "/images/repltv/index.png",
      "/images/repltv/watch-stream.png",
      "/images/repltv/as-streamer.png",
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
    timeCreated: "April 2022",
    stack: [Tc.p5, Tc.typescript, Tc.sass, Tc.node],
    url: "https://celestron.spotandjake.repl.co",
    sourceCodeUrl: "https://github.com/IroncladDev/Celestron",
    images: ["/images/celestron/index.png", "/images/celestron/gameplay.png"],
  },
  {
    title: "Langchain.js LLM Template",
    slides: [
      `Shortly after launching AmjadGPT, Langchain.js just got released.  I created a template with it and made a tweet thread that went viral.
        \nI made the template because I really dislike the syntax of Python.`,
    ],
    timeCreated: "February 2023",
    stack: [Tc.node, Tc.langchain],
    url: "https://twitter.com/IroncladDev/status/1629534148091162626?s=20",
    sourceCodeUrl:
      "https://github.com/IroncladDev/Celestronhttps://github.com/IroncladDev/LangChain.js-LLM-Template",
    images: ["/images/llm-template/gh.png", "/images/llm-template/files.png"],
  },
  {
    title: "All Metal Welding",
    slides: [
      `All Metal Welding was one of my freelance projects for a welder, Philip Davis.
        \nPhilip is currently living around northern Texas, so if you need a welding job done, you got the right man for the job 🔨`,
      `If you open the site, it still has a bit of Lorem Ipsum text on it since the content was never filled out completely by the client.
        \nThis was one of my first Next.js projects, and I'm happy how it turned out.`,
    ],
    timeCreated: "May 2021",
    stack: [Tc.next, Tc.react],
    url: "https://www.allmetalwelding.com/",
    sourceCodeUrl: "https://github.com/IroncladDev/Metal",
    images: [
      "/images/amw/index.png",
      "/images/amw/about.png",
      "/images/amw/features.png",
    ],
  },
  {
    title: "KuhnHong.com",
    slides: [
      `Kuhn Hong has created some of the most amazing art I've ever laid my eyes on, and it was an honor to be able to build his website.
          \nThe design style I took on for this project is unique among all my other projects, and I really like how it turned out.`,
      `I had originally made this website in Flask, HTML, and CSS a year before (it looked horrible), but decided to remake it after having fallen in love with Next.js.`,
    ],
    timeCreated: "August 2021",
    stack: [Tc.next, Tc.react],
    url: "https://www.kuhnhong.com/",
    sourceCodeUrl: "https://github.com/IroncladDev/KuhnHong",
    images: [
      "/images/kuhnhong/index.png",
      "/images/kuhnhong/preview.png",
      "/images/kuhnhong/gallery.png",
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
    timeCreated: "June 2021",
    stack: [Tc.p5, Tc.html],
    url: "https://tarragon.haroon.repl.co/",
    sourceCodeUrl: "https://replit.com/@haroon/Tarragon",
    images: [
      "/images/tarragon/index.png",
      "/images/tarragon/ice.png",
      "/images/tarragon/portal.png",
      "/images/tarragon/fire.png",
      "/images/tarragon/stone.png",
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
    timeCreated: "February 2020",
    stack: [Tc.html],
    url: "https://face-the-darkness.ironcladdev.repl.co/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/face-the-darkness",
    images: [
      "/images/face-the-darkness/index.png",
      "/images/face-the-darkness/climb.png",
      "/images/face-the-darkness/enemies.png",
      "/images/face-the-darkness/sorcerer.png",
      "/images/face-the-darkness/wraith.png",
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
    timeCreated: "August 2022",
    stack: [Tc.html, Tc.p5],
    url: "https://intercepter.ironcladdev.repl.co/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/Intercepter",
    images: [
      "/images/intercepter/index.png",
      "/images/intercepter/rules.png",
      "/images/intercepter/gameplay1.png",
      "/images/intercepter/gameplay2.png",
      "/images/intercepter/gameplay3.png",
    ],
  },
  {
    title: "Orbitron Tower Defense",
    slides: [
      `The name "Orbitron Tower Defense" was inspired by the [Orbitron google font](https://fonts.google.com/specimen/Orbitron?query=orbitron).  This tower defense was made for a mini-jam on Khan Academy following the theme of no text.  Although there is text in the game, I drew the font out of pixel art.`,
      `This was one of the first games where I started to use a lot of image caching and optimize for performance.  Thousands of particles and items can be running on the screen with a decent framerate.
        \nI'm very proud of this project and still play it on my own sometimes.`,
    ],
    timeCreated: "April 2021",
    stack: [Tc.html, Tc.p5],
    url: "https://orbitron-3.ironcladdev.repl.co/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/Orbitron-3",
    images: [
      "/images/orbitron/index.png",
      "/images/orbitron/gameplay1.png",
      "/images/orbitron/gameplay2.png",
    ],
  },
  {
    title: "Taime is Ticking",
    slides: [
      `A time-based dungeon crawler game made for the [Huggingface Open Source AI Game Jam](https://itch.io/jam/open-source-ai-game-jam) in 48 hours.  
      \nKaboom.js v3000 had been released a few days beforehand and I was eager to try it out.`,
      `The game was heavily inspired by [Enter the Chronosphere](https://effort-star.itch.io/enter-the-chronosphere).  Playtesting it and trying to get the timing engine to work properly were both challenging and fun.
      \nOne of my personal favorite aspects of the game is that you get to deflect bullets.`,
      `I stayed up coding for about 30-32 out of the 48 hours.  This was one of the shortest jams I'd ever participated in.  I lost a lot of sleep but the result was worth it.
      \nI didn't have any spare time to make graphics so I decided to use Twemoji for the player and enemies.  It turned out better than I expected.`,
    ],
    timeCreated: "July 2023",
    stack: [Tc.html, Tc.kaboom],
    url: "https://taime-is-ticking.ironcladdev.repl.co/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/TAIme-is-ticking",
    images: [
      "/images/taime/index.png",
      "/images/taime/meelee.png",
      "/images/taime/bullets.png",
      "/images/taime/level.png",
    ],
  },
  {
    title: "Advanced P5.js Platformer Engine",
    slides: [
      `I used Matter.js and P5.js to make this easy-to-use platformer template for people to kickstart their next game with.  Not only does this engine support default physics and mechanics, but also wall jumping, irregularly-shaped blocks, and more.`,
      `The documentation on how to use the engine is provided within the Repl, in a folder named "docs".`,
    ],
    timeCreated: "August 2022",
    stack: [Tc.html, Tc.p5],
    url: "https://advanced-p5js-platformer-engine.ironcladdev.repl.co/",
    sourceCodeUrl:
      "https://replit.com/@IroncladDev/Advanced-P5js-Platformer-Engine?v=1",
    images: ["/images/p5platform/index.png", "/images/p5platform/jump.png"],
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
    timeCreated: "November 2021",
    stack: [Tc.html, Tc.p5, Tc.node],
    url: "https://vulcanist.ironcladdev.repl.co/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/Vulcanist",
    images: [
      "/images/vulcanist/index.png",
      "/images/vulcanist/gameplay.png",
      "/images/vulcanist/cutscene.png",
      "/images/vulcanist/ooooh.png",
      "/images/vulcanist/mom.png",
      "/images/vulcanist/ded.png",
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
    timeCreated: "August 2022",
    stack: [Tc.next, Tc.react, Tc.sass, Tc.mongo, Tc.node],
    url: "https://replyte.connerow.dev/",
    sourceCodeUrl: "https://replit.com/@IroncladDev/Replyte-Chat-App",
    images: ["/images/replyte/index.png", "/images/replyte/chat.png"],
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
    timeCreated: "November 2021",
    images: [
      "/images/mod-dash/index.png",
      "/images/mod-dash/filter.png",
      "/images/mod-dash/select.png",
      "/images/mod-dash/action.png",
      "/images/mod-dash/tools.png",
    ],
  },
  {
    title: "Grace Reformed Baptist Church",
    slides: [
      `I made the website for my church, which is currently located in Honey Grove, Texas.  My dad took some pictures at church and gave them to me to insert in the site.
        \nThis website was made in static HTML, and adopts some of the worst web dev practices, of which I will never to use again.`,
    ],
    timeCreated: "February 2020",
    stack: [Tc.html],
    url: "https://gracerbcbonham.com/",
    images: ["/images/grbc/index.png", "/images/grbc/worship.png"],
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
