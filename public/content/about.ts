import { Technology as Tc } from "./types";

const Content: AboutContent = {
  title: "About Me",
  description: "The complete guide to ... me?",
  introduction: {
    title: "Hi there 👋",
    paragraphs: [
      `My name is Conner Ow (pronounced "ow" like when you get hurt). I'm a seventeen-year-old Fullstack Developer who enjoys building with AI, Content Creation, and designing websites.`,
      "I'm currently living in Texas, far out in the country.  It's a peaceful, simple, and relaxing life out here.  I usually do some farm work on weekends.",
      "Outside of work, I enjoy drawing, solving puzzles, carpentry, competitive programming, and Brazilian Jiu-Jitsu.",
    ],
  },
  journey: {
    title: "My coding Journey 🧭",
    paragraphs: [
      "My passion for programming started at the age of eleven in late 2016. My mom's midwife, who delivered my little brother, introduced me to [Khan Academy](https://khanacademy.org).",
      "After having completed most of the programming courses on Khan, I moved on to [FreeCodeCamp](https://freecodecamp.org) and gained a decent understanding in Frontend Development.",
      "I moved on to learn how to make fullstack websites with Flask (python) on [Codecademy](https://www.codecademy.com), discovered Replit, and started interacting with other communities.",
      "Discord enabled me to communicate in realtime with other programmers, massively improving my productivity.  After joining the platform, I did some really foolish stuff, got my account nuked, and hung around people I really shouldn't have.",
      "Shortly after, I started competitive programming for the next few months.",
      "In November 2021, Replit announced their Kajam competition, which I was super hyped up about.  Participating in the competition really got me close to the community, and that's when I finally cut the rope on Khan and moved over to Replit.",
      "Shortly after Kajam, I decided that I wanted to work at Replit, so I applied for an internship.  I flunked the interview but wasn't about to stop there.",
      "For the next few months, I drilled and raced solving programming algorithms as fast as I could, got really close to the Replit community, and became site moderator on Replit.  I also learned Next.js and switched my html/css/js/node/mongo stack to Next.js",
      "I created a lot more content with Next.js, started building moderation tools, and changed the way moderation worked at Replit.  I did some contract work for Replit's moderation team for a bit.",
      "Finally, I decided to try to apply to work at Replit again.  I had racked up a large amount of knowledge in the past year and was ready to try again.",
      "I wrote an [email](https://email.ironcladdev.repl.co) to Amjad Masad, the CEO of Replit and sent the HTML email to him with Node.js.  I almost got in, but the engineering team didn't have the time or capacity to mentor me.  The head of Support posted in discord that he needed a support engineer, and I decided to go for it.  After going through all the interviews, I got hired.",
      "For the next year, I fixed some issues I had been wanting to fix for years, remodeled some of Replit's Support tools, hammered hard on abusers, remodeled and maintained the docs, built some fun projects with AI, maintained the [Replit Extensions Client](https://github.com/replit/extensions) and helped out with DevRel.",
    ],
  },
  faq: {
    title: "Frequently Asked Questions ❓❓",
    paragraphs: [
      "**Q: What's your favorite programming language?**\n\n**A**: Typescript",
      "**Q: What's your worst favorite programming language?**\n\n**A**: Java",
      "**Q: Are you open to collaboration?**\n\n**A**: I'm packed with work and side projects at the moment.",
      "**Q: Can you accept my discord friend request?**\n\n**A**: I try to limit the amount of friends I have on discord.  If you share a mutual server, DMs are open.",
    ],
  },
  skillsHeader: "Skills 🛠",
  skills: [
    Tc.next,
    Tc.node,
    Tc.react,
    Tc.typescript,
    Tc.mongo,
    Tc.langchain,
    Tc.html,
    Tc.p5,
    Tc.sass,
    Tc.python,
    Tc.stripe,
  ],
};

interface AboutContent {
  title: string;
  description: string;
  introduction: {
    title: string;
    paragraphs: Array<string>;
  };
  journey: {
    title: string;
    paragraphs: Array<string>;
  };
  faq: {
    title: string;
    paragraphs: Array<string>;
  };
  skillsHeader: string;
  skills: Array<Tc>;
}

export default Content;
