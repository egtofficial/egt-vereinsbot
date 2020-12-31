import { Message } from 'discord.js'
import { find, sample, words } from 'lodash'
import { genericFallbackReplies, genericHelloReplies, genericHelloWords, prefix } from './constants'
import { info } from './intents';
import { blue } from 'colors/safe';


export const processMessage = async (message: Message) => {
  const messageString = message.content.substr(prefix.length);
  const cmd = words(messageString)[0].toLowerCase();
  const args = messageString.replace(cmd, '').trim();
  console.log(blue(`Incoming command: ${cmd}`), args ? `=> ${args}` : '');

  if (find(cmd, (w) => genericHelloWords.includes(w.toLowerCase()))) {
    message.channel.send((sample(genericHelloReplies) as string).replace('{username}', message.author.username));
    return;
  }

  if (['whoami', 'werbinich', 'info'].includes(cmd))
    return info(message, args);

  message.channel.send(sample(genericFallbackReplies) as string);
  return;
}