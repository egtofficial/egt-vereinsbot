import { Message } from 'discord.js'
import { find, sample, words } from 'lodash'
import { genericFallbackReplies, genericHelloReplies, genericHelloWords, prefix } from './constants'
import { getMemberships, resolve } from './lib/easyverein';
import { formatDate } from './lib/utils';
const util = require('util');
const wait = util.promisify(setTimeout);

export const processMessage = async (message: Message) => {
  const cmd = words(message.content.substr(prefix.length));
  const discordTag = `${message.author.username}#${message.author.discriminator}`;

  if (find(cmd, (w) => genericHelloWords.includes(w.toLowerCase()))) {
    message.channel.send((sample(genericHelloReplies) as string).replace('{username}', message.author.username));
    return;
  }

  if (cmd[0] === 'whoami' || cmd[0] === 'werbinich') {
    const member = await resolve(discordTag);

    if (!member) {
      console.log(`[WARN] Could not resolve ${discordTag}.`);
      return wait(1000)
        .then(() => {
          message.channel.send(`Hmmm…`);
          return wait(2000);
        })
        .then(() => {
          message.channel.send(`Tut mir leid, ich kann dich in unseren Vereinsunterlagen nicht finden. 🤷‍♂️`);
          return wait(3000);
        })
        .then(() => {
          message.channel.send(`Entweder bist du noch gar kein Mitglied (das sollten wir dann unbedingt ändern!) oder wir haben auf deiner Akte das Post-it mit deinem Discordtag **${discordTag}** vergessen. 🤔`);
          return wait(5000);
        })
        .then(() => {
          message.channel.send(`Aber wenn du sicher bist, dass du Mitglied bei Elysium Gaming Tübingen e.V. bist, dann schreib doch einfach mal dem *Cattus | Fred*, der meldet sich dann bei mir und wir klären das alles ganz easy.`);
        });
    }

    console.log(`[WARN] Successfully resolved ${discordTag}.`);
    return wait(1000)
      .then(() => {
        message.channel.send(`Du bist **${message.author.username}**, aber dein echter Name ist **${member.contactDetails.name}**.`);
        return wait(2000);
      })
      .then(() => {
        message.channel.send(`Deine Mitgliedsnummer ist ${member.membershipNumber}.`);
        return wait(1500);
      })
      .then(() => {
        const membership = getMemberships(member)[0];
        if (membership.short === 'former')
          message.channel.send(`Du bist am dem ${formatDate(member.joinDate)} beigetreten, aber bist in der Zwischenzeit ein ${membership.description}. 😭`);
        else
          message.channel.send(`Du bist seit dem ${formatDate(member.joinDate)} ein ${membership.description}. 🥳`);
      })
  }

  message.channel.send(sample(genericFallbackReplies) as string);
  return;
}