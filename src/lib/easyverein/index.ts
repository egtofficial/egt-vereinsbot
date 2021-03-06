import { keyBy, find } from 'lodash';
import config from './config';
import { getMembers, Member, setApiToken } from 'easyverein';

let membersMap: Map<string, Member> | null = null;
let membersArr: Member[] | null = null;

setApiToken(process.env.EASYVEREIN_TOKEN || '');

export const resolve = async (discordTag: string, exact: boolean = false): Promise<Member | undefined> => {
  if (!discordTag) return undefined;
  if (!membersMap) {
    membersArr = await getMembers(
      '{id,contactDetails{name,companyName,dateOfBirth},membershipNumber,memberGroups,joinDate}'
    );
    membersMap = new Map(Object.entries(keyBy(membersArr, (m) => m.contactDetails.companyName)));
  }
  return exact ? membersMap.get(discordTag) : find(membersArr, (m) => m.contactDetails.companyName.toLowerCase() === discordTag.toLowerCase());
}

export const getMemberships = (member: Member): Membership[] =>
  member.memberGroups.map(id => (config as any).memberships[id]);
