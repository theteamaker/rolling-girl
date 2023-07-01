import { MessageReaction, Events, MessageFlags, User } from "discord.js";

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction: MessageReaction, user: User) {
    if (
      reaction.emoji.id != "1124522658650918942" ||
      reaction.message === null ||
      reaction.message.content === null ||
      reaction.message.author === null ||
      (reaction.me && reaction.count === 1)
    ) {
      return;
    }

    if (user.id != reaction.message.author.id) {
      return;
    }

    const twitter_link_regexp: RegExp = /http[s]?:\/\/twitter.com\/\S*/g;
    const matches: RegExpMatchArray[] = [
      ...reaction.message.content.matchAll(twitter_link_regexp),
    ];

    if (matches == null) return;

    const replaced_links: Array<string> = [];

    matches.forEach((link) => {
      const replaced_link: string = link[0].replace(
        "https://twitter.com",
        "https://vxtwitter.com"
      );

      if (!replaced_links.includes(replaced_link)) {
        replaced_links.push(replaced_link);
      }
    });

    let stringified_array = replaced_links.join("\n");

    try {
      await reaction.remove();
    } catch {}

    try {
      await reaction.message.reply({
        content: stringified_array,
        allowedMentions: { parse: [] },
        flags: MessageFlags.SuppressNotifications,
      });
    } catch {}
  },
};
