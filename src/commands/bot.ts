import { Command, flags } from '@oclif/command'
import { prefix } from '../constants';
import { client } from '../lib/discord';
import { processMessage } from '../parser';
const pjson = require('../../package.json');

export default class Roles extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ egt-vereinsbot bot`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }
  async run() {
    client.login(process.env.BOT_TOKEN)
    client.on("message", function (message) {
      if (message.author.bot) return;
      if (!message.content.startsWith(prefix)) return;

      processMessage(message);
    });
    console.log(`Bot ${pjson.version} started…`);
  }
}
