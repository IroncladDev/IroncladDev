import { Technology as Tc } from "./types";

const Content: AboutContent = {
  title: "About Me",
  description: "The complete guide to ... me?",
  introduction: {
    title: "Hi there 👋",
    paragraphs: [
      `My name is Conner Ow (pronounced "ow" like when you get hurt). I'm a seventeen-year-old Christian homeschooler who is currently doing Support Engineering at [Replit](https://replit.com). I love poking around with AI, doing DevRel for fun, and creating cool content here and there.`,
      "I'm currently living in Texas, far out in the country.  It's a peaceful, simple, and relaxing life out here.  I usually do some farm work on weekends.",
      "Outside of work, I enjoy drawing, solving puzzles, carpentry, competitive programming, hanging out with the Replit community, and Brazilian Jiu-Jitsu.  Jiu-Jitsu is a martial art sort of like wrestline that keeps me active and challenges me in a different way.",
      "I'm currently doing my college courses online at the University of the People, which takes only a couple of hours a week.",
    ],
  },
  journey: {
    title: "My coding Journey 🧭",
    paragraphs: [
      "My passion for programming started at the age of eleven in late 2016. My mom's midwife, who delivered my little brother, introduced me to [Khan Academy](https://khanacademy.org).",
      "After having completed most of the programming courses on Khan, I moved on to [FreeCodeCamp](https://freecodecamp.org). Through FreeCodeCamp, I gained fluency in the frontend HTML/CSS/JS stack.",
      "I made a large mistake of being tied to Khan Academy for a time span of about three years.  In that time span, I learned how to make fullstack websites with python flask on [Codecademy](https://www.codecademy.com), discovered Replit and hosted some projects there, and joined a few discord servers.",
      "Discord completely changed the way I saw programming, and how communities were structured.  I was able to communicate in realtime with many other programmers and learn how to code so much faster.  On the other side of discord, however, I did some really foolish stuff, got my account nuked, and hung around people I really shouldn't have.",
      "Shortly after the discord incident, I stood back up again and started to learn more about programming and participated in some hackathons.",
      "In the November of 2021, Replit announced their Kajam competition, which I was super hyped up about.  Participating in the competition really got me close to the community, and that's when I finally cut the rope on Khan and moved over to Replit.",
      "Shortly after Kajam, I decided that I wanted to work at Replit, so I applied for an internship.  I flunked the interview but wasn't about to stop there.",
      "For the next few months, I drilled and raced solving programming algorithms as fast as I could, got really close to the Replit community, and became site moderator on Replit.  I also learned Next.js and switched my html/css/js/node/mongo stack to Next.js",
      "I created a lot more content with Next.js, started building moderation tools, and changed the way moderation worked at Replit.  I did some contract work for Replit's moderation team for a bit.",
      "Finally, I decided to try to apply to work at Replit again.  I had racked up a large amount of knowledge in the past year and was ready to try again.",
      "I wrote an [email](https://email.ironcladdev.repl.co) to Amjad Masad, the CEO of Replit and sent the HTML email to him with Node.js.  I almost got in, but the engineering team didn't have the time or capacity to mentor me.  My manager posted in discord that he needed a support engineer, and I jumped into that entry point.  After going through all the interviews, I got hired.",
      "Now I'm here continuing to grow and learn in Replit.  I'm currently trying to lean into Product Engineering and DevRel more outside of Support Engineering.",
    ],
  },
  faq: {
    title: "Frequently Asked Questions ❓❓",
    paragraphs: [
      "**Q: What's your favorite programming language?**\n\n**A**: Typescript",
      "**Q: What's your worst favorite programming language?**\n\n**A**: Java",
      "**Q: Can you collaborate with me?**\n\n**A**: Unfortunately I'll have to turn the collaboration request down.  I'm completely packed with work and side projects at the moment.",
      "**Q: What do you have against python?**\n\n**A**: I really despise the fact that python uses indentation instead of curly braces for wrapping code.  Object indexing is also annoying that you can't use dot notation.  Performance is slow, etc.",
      "**Q: Can you accept my discord friend request?**\n\n**A**: I try to limit the amount of friends I have on discord.  If you share a mutual server, DMs are open.",
      "**Q: I found a bug in Replit, can you fix it?**\n\n**A**: Create a post on the [Ask Forum](https://ask.replit.com).",
      "**Q: There's a malicious user in Replit, can you take action on them?**\n\n**A**: Use the built-in report feature.",
      "**Q: I have an account issue in Replit, can you help me?**\n\n**A**: Create a ticket at https://replit.com/support and we'll get to you in a bit.",
      "**Q: Can you help me/do something for me?**\n\n**A**: It depends on the request.  Ask away.",
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
