import { initCommands } from "server/lib/discord";

initCommands();

export default function Handler (req, res) {
  res.send('Hello world!')
}