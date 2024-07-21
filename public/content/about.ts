import { Technology as Tc, Technology } from "./types";

const Content: AboutContent = {
  title: "About Me",
  description: "The complete guide to ... me?",
  introduction: {
    title: "Hi there 👋",
    paragraphs: [
      `My name is Conner`,
      "I live out in the middle of nowhere",
      "I code because it allows me to express my imagination and creativity.",
    ],
  },
  journey: {
    title: "My coding Journey",
    paragraphs: [
      `### Discovery 🔎
      \nMy passion for programming started at the age of eleven after having been introduced to [Khan Academy](https://www.khanacademy.org).`,
      `### Learning 🧭
      \nFor the next three years, I would learn frontend development from Khan and [FreeCodeCamp](https://freecodecamp.org), and the basics of Fullstack Web Applications from [Codecademy](https://www.codecademy.com).`,
      `### Connection 🌐
      \nI searched for a suitable place to host my fullstack websites.  I found [Replit](https://replit.com) and joined their [Discord Community](https://discord.gg/friendsofreplit).  I also joined an unofficial Khan Academy discord server.\n\nDiscord allowed me to communicate with others in realtime, dramatically improving my productivity.  I hung around people I shouldn't have, did some foolish stuff, and got my account nuked.`,
      `### Competition 🏆
      \nI started to dip into competitive programming by doing a few coding challenges and hackathons.  In November of 2021, Replit announced their annual game jam.  Participating in it helped me get close to the community.  I cut the rope on Khan and stuck to Replit.`,
      `### Motivation 🔥
      \nAfter participating in the game jam, I decided that I wanted to work at Replit.  I applied for an internship and flunked the interview.  I wasn't about to stop there.
      \nIn the next eight months, I did a three-month internship at [Saasbox](https://saasbox.net), raced solving algorithms on [Codingame](https://codingame.com), learned and build multiple projects with Next.js, and took up the responsibility of moderating the Replit community.
      \nI made some impactful improvements to Replit's moderation tools and did some contract work for their Trust and Safety team.  I decided it was time to apply for Replit again.`,
      `### Career ✨
      \nAfter two more attempts, I got hired by Replit as a Support Engineer.  For the next year, I:
\n- Built and improved anti-abuse tools
- Fixed some small bugs and added some new features
- Improved some of Replit's Support Tools
- Remodeled and maintained the docs
- Built some AI projects
- Maintained the [Replit Extensions Client](https://github.com/replit/extensions)
- Helped out with DevRel & Marketing on twitter`,
      `### Advancement 🚀
I joined [Fedi](https://fedi.xyz) as a software engineer. It's a small startup that provides a technology for people to freely and easily transact with bitcoin.
\nI got to really appreciate being able to work at a small startup.
\nI got radicalized by the company's mission and vision to fight for freedom.
\nI got to see the world and break the introvert barrier I was stuck behind.
\nAnd I, influenced by my super-based coworkers who are Rust and Nix maxxis, finally found the motivation to learn Rust and get jacked.`,
    ],
  },
  faq: {
    title: "Frequently Asked Questions ❓❓",
    paragraphs: [
      "**Q: What's your favorite programming language?**\n\n**A**: Rust",
      "**Q: What's your worst favorite programming language?**\n\n**A**: Java",
      "**Q: Are you available for hire?**\n\n**A**: Not at the moment",
      "**Q: Are you open to collaboration?**\n\n**A**: I'm currently packed with work and side projects, so I'm unavailable",
      "**Q: What's the best way to reach you?**\n\n**A**: Join my [Discord Server](/discord) and send me a Direct Message, or hit me up through [email](mailto:conner@connerow.dev) / [X/Twitter](https://x.com/IroncladDev)",
    ],
  },
  skillsHeader: "Skills 🛠",
  skills: Object.keys(Tc).sort((a, b) =>
    a.localeCompare(b)
  ) as Array<Technology>,
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
