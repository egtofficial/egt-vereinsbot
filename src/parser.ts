import { Message } from 'discord.js'
import { find, sample, words } from 'lodash'
import { genericFallbackReplies, genericHelloReplies, genericHelloWords, prefix } from './constants'
import { info } from './intents';
import { blue } from 'colors/safe';
import { wait } from './lib/utils';


export const processMessage = async (message: Message) => {
  const messageString = message.content.substr(prefix.length);
  const cmd = words(messageString)[0].toLowerCase();
  const args = messageString.replace(cmd, '').trim();
  console.log(blue(`Incoming command: ${cmd}`), args ? `=> ${args}` : '');

  if (genericHelloWords.includes(cmd.toLowerCase())) {
    message.channel.send((sample(genericHelloReplies) as string).replace('{username}', message.author.username));
    return;
  }

  if (['whoami', 'info'].includes(cmd))
    return info(message, args);

  message.channel.send(sample(genericFallbackReplies) as string);
  return wait(2000).then(() => {
    message.channel.send(`**Mögliche Befehle:**  
    \`\`\`  
    !egt whoami                  Zeigt deine EGT-Mitgliederinformationen an  
    !egt info  

    !egt info Discordtag#1234    Zeigt die Mitgliederinformationen der Person an  
                                 Zugriff auf die Mitgliederkartei notwendig.
    \`\`\``)
  })
}