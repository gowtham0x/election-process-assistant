import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight, ArrowLeft } from 'lucide-react';

// Move steps data above the component to ensure it's defined before use
import { UserPlus, Users, CalendarDays, Inbox, Flag } from 'lucide-react';

const steps = [
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

/**
 * Process Component
 * 
 * An interactive, step-by-step guide explaining the various phases
 * of the election process. Features animated transitions between steps
 * using framer-motion and a visually clear progress indicator.
 */
export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep(prev => prev - 1);
  };

  const CurrentIcon = steps[activeStep].icon;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl mb-4">
          The Election Process
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Learn how elections work from start to finish. Follow the steps below to understand the journey of your vote.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Progress Navigation */}
        <div className="lg:w-1/3">
          <nav aria-label="Election Process Steps">
            <ol role="list" className="overflow-hidden">
              {steps.map((step, index) => (
                <li key={step.name} className={`relative ${index !== steps.length - 1 ? 'pb-10' : ''}`}>
                  {index !== steps.length - 1 ? (
                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-neutral-200 dark:bg-neutral-700" aria-hidden="true" />
                  ) : null}
                  <button
                    onClick={() => setActiveStep(index)}
                    className="relative flex items-start group text-left w-full"
                    aria-current={index === activeStep ? 'step' : undefined}
                  >
                    <span className="h-9 flex items-center">
                      {index < activeStep ? (
                        <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-primary rounded-full group-hover:bg-primary/80 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-white" aria-hidden="true" />
                        </span>
                      ) : index === activeStep ? (
                        <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-900 border-2 border-primary rounded-full">
                          <span className="h-2.5 w-2.5 bg-primary rounded-full" />
                        </span>
                      ) : (
                        <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-600 rounded-full group-hover:border-neutral-400 transition-colors">
                          <Circle className="w-5 h-5 text-transparent" aria-hidden="true" />
                        </span>
                      )}
                    </span>
                    <span className="ml-4 min-w-0 flex flex-col">
                      <span className={`text-sm font-semibold tracking-wide uppercase ${index <= activeStep ? 'text-primary' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        Step {index + 1}
                      </span>
                      <span className={`text-sm font-medium ${index === activeStep ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        {step.name}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:w-2/3">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden min-h-[400px] flex flex-col">
            <div className="p-8 flex-grow relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-8 overflow-y-auto"
                >
                  <div className="flex items-center gap-3 mb-6 text-primary">
                    <CurrentIcon className="w-8 h-8" />
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {steps[activeStep].name}
                    </h2>
                  </div>
                  
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                      {steps[activeStep].description}
                    </p>
                    
                    <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-6 border border-neutral-100 dark:border-neutral-700/50">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        Key Details
                      </h3>
                      <ul className="space-y-3">
                        {steps[activeStep].details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-accent mr-3"></span>
                            <span className="text-neutral-700 dark:text-neutral-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation Controls */}
            <div className="bg-neutral-50 dark:bg-neutral-900/50 px-8 py-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={activeStep === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeStep === 0 
                    ? 'text-neutral-400 cursor-not-allowed' 
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              
              <div className="text-sm font-medium text-neutral-500">
                {activeStep + 1} of {steps.length}
              </div>
              
              <button
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeStep === steps.length - 1
                    ? 'text-neutral-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90 shadow-sm'
                }`}
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
