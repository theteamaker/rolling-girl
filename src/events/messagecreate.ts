import { Message, Events } from "discord.js";

module.exports = {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (message.author.bot) return;
    const twitter_link_regexp: RegExp = /http[s]?:\/\/twitter.com\/\S*/g;
    const matches: RegExpMatchArray[] = [
      ...message.content.matchAll(twitter_link_regexp),
    ];

    if (matches.length === 0) {
      return;
    } else {
      try {
        await message.react("1124522658650918942");
      } catch {}
    }
  },
};
