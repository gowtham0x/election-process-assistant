export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "Do I need an ID to vote?",
    answer: "Voter ID laws vary by state. About two-thirds of states require voters to show some form of identification at the polls. Check your specific state's requirements before heading to vote."
  },
  {
    question: "What if I can't make it to the polls on Election Day?",
    answer: "Most states offer options for absentee voting or mail-in voting. You usually need to request a ballot in advance. Many states also offer early in-person voting."
  },
  {
    question: "How does the Electoral College work?",
    answer: "When you vote for President, you're actually voting for electors. A state has the same number of electors as it has members of Congress. To win the presidency, a candidate needs a majority of electoral votes (270 out of 538)."
  },
  {
    question: "Can I vote if I have a criminal record?",
    answer: "This depends entirely on your state. In some states, you never lose your right to vote. In others, your rights are restored after serving your sentence. A few states permanently disenfranchise people with certain convictions."
  },
  {
    question: "What should I do if I move?",
    answer: "You must update your voter registration with your new address. If you move out of state, you must register in your new state. Deadlines apply, so do this as soon as possible after moving."
  }
];
