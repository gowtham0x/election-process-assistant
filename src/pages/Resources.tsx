import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ExternalLink, HelpCircle, Users, Send, Loader2, AlertCircle, Bot } from 'lucide-react';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { GoogleGenAI } from '@google/genai';
import { faqs } from '../data/faqs';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

interface Pledge {
  id: string;
  name: string;
  state: string;
  createdAt: unknown; // serverTimestamp returns FieldValue which evaluates differently
}

/**
 * Resources Component
 * 
 * Provides external voter resources, frequently asked questions, a Firebase-powered
 * "Voter Pledge Wall" where users can publicly commit to voting, and an AI Chatbot powered by Gemini.
 */
export const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Firebase Pledge Wall State
  const [pledgeName, setPledgeName] = useState('');
  const [pledgeState, setPledgeState] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pledgeError, setPledgeError] = useState('');
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  // Gemini AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [aiError, setAiError] = useState('');

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch recent pledges from Firestore
  useEffect(() => {
    try {
      const q = query(collection(db, 'pledges'), orderBy('createdAt', 'desc'), limit(5));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const pledgesData: Pledge[] = [];
        querySnapshot.forEach((doc) => {
          pledgesData.push({ id: doc.id, name: doc.data().name, state: doc.data().state, createdAt: doc.data().createdAt });
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
    } catch {
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
    } catch (error: unknown) {
      console.error('Error adding document: ', error);
      setPledgeError('Failed to submit pledge. Please check your Firebase configuration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    
    setIsAsking(true);
    setAiError('');
    setAiResponse('');

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a helpful and neutral assistant focused solely on United States election processes. Answer the following question accurately and concisely: ${aiPrompt}`,
      });
      setAiResponse(response.text || 'I could not generate an answer.');
    } catch (error) {
      console.error('AI Error:', error);
      setAiError('Failed to connect to Ask AI. Please ensure your Gemini API key is correct.');
    } finally {
      setIsAsking(false);
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

      {/* Ask AI about Elections */}
      <section className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-800" aria-labelledby="ai-chat-heading">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-sm">
            <Bot className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h2 id="ai-chat-heading" className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Ask AI about Elections
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Powered by Google Gemini AI</p>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
          <form onSubmit={handleAiSubmit} className="space-y-4">
            <div>
              <label htmlFor="ai-prompt" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                What would you like to know about the election process?
              </label>
              <div className="flex gap-4">
                <input
                  id="ai-prompt"
                  type="text"
                  className="flex-grow px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="e.g., How does the electoral college work?"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  disabled={isAsking}
                  required
                />
                <button
                  type="submit"
                  disabled={isAsking || !aiPrompt.trim()}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-shrink-0"
                >
                  {isAsking ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  <span className="hidden sm:inline">Ask</span>
                </button>
              </div>
            </div>
          </form>

          {aiError && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-start gap-3" role="alert">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{aiError}</p>
            </div>
          )}

          {aiResponse && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700"
            >
              <div className="flex items-start gap-3">
                <Bot className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {aiResponse}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

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
