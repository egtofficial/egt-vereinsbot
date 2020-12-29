import fetch from 'node-fetch';

const host = 'https://easyverein.com/api/v1';
const defaultQuery = '{id,contactDetails{name,companyName,dateOfBirth},membershipNumber,memberGroups,joinDate}';
let finished = false;
let MEMBERS_CACHE: object[] | null = null;

export const getMember = (id: string) =>
  fetch(
    `${host}/member/${id}?query=${defaultQuery}`,
    {
      headers: {
        Authorization: `Token ${process.env.EASYVEREIN_TOKEN}`,
      },
    },
  );

export const getMembers = (url?: string): Promise<any> => {
  if (finished)
    return Promise.resolve(MEMBERS_CACHE);

  if (!MEMBERS_CACHE) {
    MEMBERS_CACHE = [];
    finished = false;
  }

  return fetch(
    url || `${host}/member?query=${defaultQuery}`,
    {
      headers: {
        Authorization: `Token ${process.env.EASYVEREIN_TOKEN}`,
      },
    },
  )
    .then((response) => response.json())
    .then(json => {
      MEMBERS_CACHE!.push(...json.results);
      if (!json.next)
        finished = true;
      return getMembers(json.next);
    })
}
