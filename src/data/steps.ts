import { UserPlus, Users, CalendarDays, Inbox, Flag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Step {
  name: string;
  icon: LucideIcon;
  description: string;
  details: string[];
}

export const steps: Step[] = [
  {
    name: 'Voter Registration',
    icon: UserPlus,
    description: 'Before you can vote, you must register. This is the crucial first step in participating in the democratic process. Eligibility requirements and deadlines vary by state.',
    details: [
      'Must be a U.S. citizen',
      'Meet your state\'s residency requirements',
      'Be 18 years old on or before Election Day',
      'Register before your state\'s specific deadline'
    ]
  },
  {
    name: 'Primaries and Caucuses',
    icon: Users,
    description: 'These are the methods political parties use to select candidates for a general election. Voters choose their preferred candidate to represent the party.',
    details: [
      'Primaries use secret ballots for voting',
      'Caucuses are local gatherings where voters decide candidates openly',
      'Rules vary: some states have "closed" primaries (only registered party members can vote), others have "open" primaries',
      'These events happen months before the general election'
    ]
  },
  {
    name: 'National Conventions',
    icon: Flag,
    description: 'After the primaries and caucuses, most political parties hold a national convention. Here, the party officially nominates its candidate for president.',
    details: [
      'Delegates selected during primaries cast their votes',
      'The Presidential candidate officially announces their Vice Presidential running mate',
      'The party adopts its platform (stance on core issues)',
      'Usually held in the summer before the general election'
    ]
  },
  {
    name: 'General Election',
    icon: CalendarDays,
    description: 'People in every state across the country vote for one President and Vice President. When you cast your vote, you are actually voting for a group of people known as electors.',
    details: [
      'Held on the Tuesday following the first Monday in November',
      'You can vote in person at your polling place',
      'Many states offer early voting options',
      'The popular vote determines which electors represent the state'
    ]
  },
  {
    name: 'Electoral College',
    icon: Inbox,
    description: 'The Electoral College is a process, not a place. It decides who will be elected president and vice president of the United States.',
    details: [
      'Consists of 538 electors total',
      'A majority of 270 electoral votes is required to win the presidency',
      'Each state\'s number of electors equals its total number of Senators and Representatives in Congress',
      'Electors meet in their respective states in December to cast their official votes'
    ]
  }
];
