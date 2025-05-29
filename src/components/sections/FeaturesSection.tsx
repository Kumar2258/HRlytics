import React from 'react';
import { TrendingUp, Brain, Phone, Users } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-Time Performance Analytics",
      description: "Monitor employee performance metrics live — from time tracking and efficiency to on-time task completion and overdue rates. HRlytics delivers dynamic dashboards that provide instant visibility into productivity trends."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Feedback & Sentiment Analysis",
      description: "Automatically analyze written feedback from peers, managers, and clients using NLP to extract tone, sentiment, and actionable insights. Our AI decodes subtle cues in feedback to identify areas of improvement."
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Center Interaction Analysis",
      description: "Leverage AI to evaluate recorded calls between employees and clients for tone, clarity, and resolution effectiveness. HRlytics uses speech-to-text and NLP to assess call quality and customer satisfaction."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Comprehensive Employee 360 Dashboard",
      description: "Get a holistic view of each employee's journey through unified performance metrics, task logs, communication quality, and feedback. Identify high performers and address concerns proactively."
    }
  ];

  return (
    <section id="features" className="min-h-screen bg-white dark:bg-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide uppercase mb-4">FEATURES</div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Everything you need to manage your workforce</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            HRlytics revolutionizes human resource management by analyzing employee performance from every angle — from task completion rates to efficiency metrics, peer and client feedback, and even voice interactions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 