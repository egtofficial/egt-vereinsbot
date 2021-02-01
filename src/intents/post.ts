import { Message, TextChannel } from 'discord.js';
import { resolve } from '../lib/easyverein';
import {  getDiscordTag, wait } from '../lib/utils';
import { red, yellow } from 'colors/safe';
import config from '../lib/easyverein/config';
import { client } from '../lib/discord';

export const post = async (message: Message, channelName: string, content: string) => {
  console.log(`Incoming intend post for channel ${channelName}…`);
  const authorDiscordTag = getDiscordTag(message.author);
  const authorMember = await resolve(authorDiscordTag, true);

  if (!authorMember) {
    console.warn(red(`Could not resolve ${authorDiscordTag}.`));
    return wait(1000)
      .then(() => {
        message.channel.send(`Hmmm…`);
        return wait(2000);
      })
      .then(() => {
        message.channel.send(`Tut mir leid, ich kann dich in unseren Vereinsunterlagen nicht finden. 🤷‍♂️`);
        if (name)
          message.channel.send(`Ich bin nur für Vereinsmitglieder da. 😅`);
        return wait(3000);
      })
      .then(() => {
        message.channel.send(`Entweder bist du kein Mitglied (das sollten wir dann unbedingt ändern!) oder wir haben auf deiner Akte das Post-it mit deinem Discordtag \`${authorDiscordTag}\` vergessen. 🤔`);
        return wait(5000);
      });
  }

  if (message.channel.type !== 'dm') {
    message.channel.send(`Schreibe mich für solche Dinge bitte per DM an.`);
    return;
  }

  const channels = client.channels.cache;

  // Check if authorMember is Vorstand
  if (!config.admins.includes(authorMember.membershipNumber)) {
    console.warn(yellow(`Denied ${authorDiscordTag} to query for ${name}.`));
    return wait(1000)
      .then(() => {
        message.channel.send(`Hmmm…`);
        return wait(2000);
      })
      .then(() => {
        message.channel.send(`Tut mir leid, aber nur Personen mit Zugriff auf die Mitgliederkartei können mich nach der Identität von Leuten fragen. 😛`);
        return wait(3000);
      })
  }


  if (!channelName || !content) {
    message.channel.send(`Fehlt da was? Nutze bitte das Format !egt post <channel> <nachricht> ☝️`);
    return;
  }

  const channel = channels.find((c: any) => c.type === 'text' && c.name === channelName) as TextChannel;
  if (!channel) {
    message.channel.send(`Ich konnte keinen Textchannel namen »${channelName}« finden. Achte auf Groß- und Kleinschreibung! ☝️`);
    return;
  }

  channel.send(content);
  message.channel.send(`Die Nachricht wurde gepostet. 👌`);
}
