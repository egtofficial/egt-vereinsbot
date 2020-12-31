import { keyBy, find } from 'lodash';
import { getMembers } from '../../api';
import config from './config';

let membersMap: Map<string, Member> | null = null;
let membersArr: Member[] | null = null;

export const resolve = async (discordTag: string, exact: boolean = false): Promise<Member | undefined> => {
  if (!discordTag) return undefined;
  if (!membersMap) {
    membersArr = await getMembers();
    membersMap = new Map(Object.entries(keyBy(membersArr, (m) => m.contactDetails.companyName)));
  }
  return exact ? membersMap.get(discordTag) : find(membersArr, (m) => m.contactDetails.companyName.toLowerCase() === discordTag.toLowerCase());
}

export const getMemberships = (member: Member): Membership[] =>
  member.memberGroups.map(id => (config as any).memberships[id]);
