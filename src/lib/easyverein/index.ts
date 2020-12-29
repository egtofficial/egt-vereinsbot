import { keyBy } from 'lodash';
import { getMembers } from '../../api';
import config from './config';

let membersMap: Map<string, Member> | null = null;

export const resolve = async (discordTag: string): Promise<Member | undefined> => {
  if (!membersMap) {
    const members: Member[] = await getMembers();
    membersMap = new Map(Object.entries(keyBy(members, (m) => m.contactDetails.companyName)));
  }
  return membersMap.get(discordTag);
}

export const getMemberships = (member: Member): Membership[] =>
  member.memberGroups.map(id => (config as any).memberships[id]);
