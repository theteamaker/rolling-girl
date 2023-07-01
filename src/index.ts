import { Client, GatewayIntentBits } from "discord.js";
import * as fs from "node:fs";
import * as path from "node:path";

const TOKEN = process.env["BOT_TOKEN"];

const CLIENT = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  console.log(`loading event ${event}`);

  if (event.once) {
    CLIENT.once(event.name, (...args) => event.execute(...args));
  } else {
    CLIENT.on(event.name, (...args) => event.execute(...args));
  }
}

CLIENT.login(TOKEN);
