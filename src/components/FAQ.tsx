import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I import employee data?",
    answer: "You can import employee data by navigating to the Organization Import section and uploading a JSON file with the required format. The system will validate and process the data automatically."
  },
  {
    question: "Can I export reports in different formats?",
    answer: "Yes, HRlytics supports both PDF and Excel export formats. You can choose your preferred format when generating reports and customize the content based on departments and date ranges."
  },
  {
    question: "How is employee performance calculated?",
    answer: "Employee performance is calculated using multiple metrics including efficiency, quality, consistency, and attendance. Each metric is weighted equally to provide a comprehensive performance score."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we implement industry-standard security measures including data encryption, secure authentication, and regular backups to ensure your HR data remains protected."
  },
  {
    question: "Can I customize the dashboard view?",
    answer: "Yes, you can customize the dashboard by selecting different time periods, departments, and metrics to display. The system also remembers your preferences for future sessions."
  }
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openItems.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 