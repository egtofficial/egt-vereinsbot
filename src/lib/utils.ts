import { format as dateFNsFormat, parseJSON } from 'date-fns';
import { de } from 'date-fns/locale';
import { User } from 'discord.js';
const util = require('util');

export const formatDate = (date: string, format?: string) => dateFNsFormat(parseJSON(date), format || 'P', { locale: de })
export const getDiscordTag = (user: User) => `${user.username}#${user.discriminator}`;
export const wait = util.promisify(setTimeout);
export const parseDiscordTag = (str: string) => {
  const matches = /[A-Z |_\\/]+#[0-9]{4}/i.exec(str);
  return matches ? matches[0] : null;
}