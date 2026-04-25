import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Vote, CheckCircle2, Search, Calendar, ChevronRight } from 'lucide-react'

/**
 * Home Component
 * 
 * The landing page of the Election Process Assistant.
 * Provides a high-level overview and links to key sections:
 * Process, Timeline, and Resources.
 * Utilizes framer-motion for entrance animations to enhance user experience.
 */
export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?fm=webp&q=80&w=1080&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sm font-medium backdrop-blur-sm mb-6">
              <Vote size={16} /> Your Voice Matters
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Navigate the Election Process <br className="hidden md:block" />
              <span className="text-accent">With Confidence</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-10 font-light">
              A clear, interactive guide to understanding how elections work, tracking important dates, and making sure your vote counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/process"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-primary bg-white hover:bg-neutral-50 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Start Learning <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/timeline"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white border-2 border-white/50 hover:bg-white/10 rounded-full transition-all backdrop-blur-sm"
              >
                View Timeline
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
              Everything You Need to Know
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 mx-auto">
              We've broken down the complex electoral system into easy-to-understand modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-neutral-100 dark:border-neutral-700"
              >
                <div className={`inline-flex p-3 rounded-xl mb-6 ${feature.color} bg-opacity-10 dark:bg-opacity-20`}>
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Explore <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    title: "Step-by-Step Process",
    description: "Understand the journey from registration to election day, including how different types of voting work.",
    icon: CheckCircle2,
    link: "/process",
    color: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    title: "Interactive Timeline",
    description: "Never miss a deadline. Track registration cutoffs, primary dates, and the general election schedule.",
    icon: Calendar,
    link: "/timeline",
    color: "bg-yellow-100 dark:bg-yellow-900/50",
    iconColor: "text-yellow-600 dark:text-yellow-400"
  },
  {
    title: "Voter Resources",
    description: "Find your polling place, understand what's on your ballot, and learn about your rights as a voter.",
    icon: Search,
    link: "/resources",
    color: "bg-red-100 dark:bg-red-900/50",
    iconColor: "text-red-600 dark:text-red-400"
  }
]
