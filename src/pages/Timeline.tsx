import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle } from 'lucide-react';

/**
 * Timeline Component
 * 
 * Displays an interactive timeline of the key events in an election year.
 * Helps users track important dates like registration deadlines, primaries,
 * debates, and election day.
 */
export const Timeline: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl mb-4">
          Election Year Timeline
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Key dates and milestones leading up to the presidential election.
        </p>
      </div>

      <div className="relative border-l-2 border-neutral-200 dark:border-neutral-700 ml-4 md:mx-auto max-w-3xl">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-12 ml-6 md:ml-8 relative"
          >
            {/* Timeline dot */}
            <span className="absolute -left-[35px] md:-left-[43px] flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-neutral-900 border-4 border-primary ring-4 ring-white dark:ring-neutral-900"></span>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
                <Calendar className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wider">{event.date}</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {event.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                {event.description}
              </p>

              {event.alert && (
                <div className="mt-4 flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{event.alert}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const timelineEvents = [
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
