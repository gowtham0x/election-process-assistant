export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  alert?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    date: "Spring - Summer (Election Year - 1)",
    title: "Candidates Announce",
    description: "Candidates formally announce their intention to run for president and begin campaigning, fundraising, and building their teams.",
  },
  {
    date: "January - June",
    title: "Primaries and Caucuses",
    description: "States hold their primary elections or caucuses. Voters decide which candidates they want their party to nominate for the general election.",
    alert: "Check your state's specific primary/caucus date. Registration deadlines for these are often much earlier than the actual event."
  },
  {
    date: "July - August",
    title: "National Conventions",
    description: "Parties hold their national conventions to officially nominate their candidate for President and Vice President.",
  },
  {
    date: "September - October",
    title: "Presidential Debates",
    description: "Nominees participate in televised debates to discuss their platforms and debate key issues.",
  },
  {
    date: "Early Fall",
    title: "Voter Registration Deadlines",
    description: "The last day to register to vote for the general election. This varies significantly by state.",
    alert: "Missing this deadline means you cannot vote in the general election. Verify your status early!"
  },
  {
    date: "October",
    title: "Early Voting Begins",
    description: "Many states open polling places for early voting or begin sending out mail-in ballots to registered voters.",
  },
  {
    date: "First Tuesday in November",
    title: "Election Day",
    description: "The official day for the general election. Voters cast their ballots for President and other federal, state, and local offices.",
  },
  {
    date: "December",
    title: "Electoral College Votes",
    description: "Electors meet in their respective states and cast their official votes for President and Vice President.",
  },
  {
    date: "January 6",
    title: "Congress Counts Electoral Votes",
    description: "Congress meets in a joint session to count the electoral votes and officially declare the winner of the election.",
  },
  {
    date: "January 20",
    title: "Inauguration Day",
    description: "The President-elect and Vice President-elect are sworn into office and officially begin their term.",
  }
];
