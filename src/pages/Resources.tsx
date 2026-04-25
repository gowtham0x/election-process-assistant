import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ExternalLink, HelpCircle, Users, Send, Loader2, AlertCircle } from 'lucide-react';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Resources Component
 * 
 * Provides external voter resources, frequently asked questions, and a Firebase-powered
 * "Voter Pledge Wall" where users can publicly commit to voting.
 */
export const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Firebase Pledge Wall State
  const [pledgeName, setPledgeName] = useState('');
  const [pledgeState, setPledgeState] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pledgeError, setPledgeError] = useState('');
  const [pledges, setPledges] = useState<any[]>([]);
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch recent pledges from Firestore
  useEffect(() => {
    try {
      const q = query(collection(db, 'pledges'), orderBy('createdAt', 'desc'), limit(5));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const pledgesData: any[] = [];
        querySnapshot.forEach((doc) => {
          pledgesData.push({ id: doc.id, ...doc.data() });
        });
        setPledges(pledgesData);
      }, (error) => {
        console.warn('Firebase error (expected if config is missing/invalid):', error.message);
        // Fallback mock data if Firestore fails
        setPledges([
          { id: '1', name: 'Alex', state: 'New York', createdAt: new Date() },
          { id: '2', name: 'Jordan', state: 'Texas', createdAt: new Date() }
        ]);
      });
      
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firebase initialization skipped.');
    }
  }, []);

  const handlePledgeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName.trim() || !pledgeState.trim()) return;

    setIsSubmitting(true);
    setPledgeError('');

    try {
      await addDoc(collection(db, 'pledges'), {
        name: pledgeName.trim(),
        state: pledgeState.trim(),
        createdAt: serverTimestamp()
      });
      setPledgeName('');
      setPledgeState('');
      setPledgeSuccess(true);
      setTimeout(() => setPledgeSuccess(false), 3000);
    } catch (error: any) {
      console.error('Error adding document: ', error);
      setPledgeError('Failed to submit pledge. Please check your Firebase configuration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl mb-4">
          Voter Resources
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Essential tools and information to help you prepare for election day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" aria-label="Quick Links">
        {resourceLinks.map((resource, index) => (
          <motion.a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md hover:border-primary/50 transition-all group"
            aria-label={`External link to ${resource.title}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${resource.bgColor}`} aria-hidden="true">
                <resource.icon className={`w-6 h-6 ${resource.color}`} />
              </div>
              <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-primary transition-colors" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {resource.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 flex-grow">
              {resource.description}
            </p>
          </motion.a>
        ))}
      </div>

      {/* Firebase Voter Pledge Wall */}
      <section className="mb-16 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-3xl p-8 border border-primary/20" aria-labelledby="pledge-wall-heading">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary text-white rounded-xl shadow-sm">
            <Users className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h2 id="pledge-wall-heading" className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Voter Pledge Wall
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Powered by Google Firebase</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pledge Form */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Make Your Pledge</h3>
            <form onSubmit={handlePledgeSubmit} className="space-y-4">
              <div>
                <label htmlFor="pledge-name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  First Name
                </label>
                <input
                  id="pledge-name"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="e.g., Alex"
                  value={pledgeName}
                  onChange={(e) => setPledgeName(e.target.value)}
                  disabled={isSubmitting}
                  required
                  aria-required="true"
                />
              </div>
              
              <div>
                <label htmlFor="pledge-state" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  State
                </label>
                <input
                  id="pledge-state"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="e.g., California"
                  value={pledgeState}
                  onChange={(e) => setPledgeState(e.target.value)}
                  disabled={isSubmitting}
                  required
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !pledgeName.trim() || !pledgeState.trim()}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                aria-label="Submit pledge to vote"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                <span>I Pledge to Vote</span>
              </button>
            </form>

            {pledgeError && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-start gap-3" role="alert">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{pledgeError}</p>
              </div>
            )}

            {pledgeSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm text-center font-medium"
                role="status"
              >
                Thank you for pledging to vote!
              </motion.div>
            )}
          </div>

          {/* Recent Pledges Feed */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Recent Pledges</h3>
            <div className="flex-grow overflow-y-auto">
              {pledges.length > 0 ? (
                <ul className="space-y-3" aria-label="List of recent pledges">
                  {pledges.map((pledge) => (
                    <motion.li 
                      key={pledge.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-100 dark:border-neutral-700 flex justify-between items-center"
                    >
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">{pledge.name}</span>
                      <span className="text-sm text-neutral-500 bg-white dark:bg-neutral-900 px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-700">
                        📍 {pledge.state}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-neutral-500 py-8 text-center">
                  <Users className="w-8 h-8 mb-2 opacity-50" />
                  <p>Be the first to pledge!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800" aria-labelledby="faq-heading">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 id="faq-heading" className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" aria-hidden="true" />
            Frequently Asked Questions
          </h2>
          
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" aria-hidden="true" />
            </div>
            <label htmlFor="faq-search" className="sr-only">Search frequently asked questions</label>
            <input
              id="faq-search"
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg leading-5 bg-white dark:bg-neutral-800 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <article key={index} className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {faq.question}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {faq.answer}
                </p>
              </article>
            ))
          ) : (
            <div className="text-center py-8 text-neutral-500" role="status">
              No questions found matching "{searchQuery}"
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const resourceLinks = [
  {
    title: "Check Registration Status",
    description: "Verify that you are registered to vote at your current address.",
    icon: Search,
    url: "https://www.vote.org/am-i-registered-to-vote/",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    title: "Find Polling Place",
    description: "Locate where you need to go to cast your ballot on Election Day.",
    icon: MapPin,
    url: "https://www.vote.org/polling-place-locator/",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30"
  }
];

const faqs = [
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
