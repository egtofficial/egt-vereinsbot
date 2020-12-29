interface Member {
  id: number;
  contactDetails: {
    name: string;
    dateOfBirth: string;
    companyName: string;
  },
  membershipNumber: string;
  memberGroups: number[];
  joinDate: string;
}

interface Membership {
  discordRoleId: number;
  short: string;
  roleName: string;
  longName: string;
  description: string;
}
