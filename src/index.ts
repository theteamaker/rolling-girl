import { Client, Events, GatewayIntentBits } from "discord.js";

const TOKEN = process.env["BOT_TOKEN"];

const CLIENT = new Client({ intents: [GatewayIntentBits.Guilds] });

CLIENT.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

CLIENT.login(TOKEN);
