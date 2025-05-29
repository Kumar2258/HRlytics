import React from 'react';
import { Star } from 'lucide-react';

const AboutSection = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Former HR Director with 15+ years of experience in tech companies."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "AI/ML expert with a focus on human behavior analytics."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      description: "UX specialist with deep knowledge of HR workflows."
    },
    {
      name: "David Kim",
      role: "Head of Customer Success",
      description: "10+ years experience in HR consulting and implementation."
    }
  ];

  return (
    <section id="about" className="min-h-screen bg-gray-50 dark:bg-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide uppercase mb-4">ABOUT US</div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Meet the Team Behind HRlytics</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We're a team of HR professionals, data scientists, and software engineers passionate about revolutionizing human resource management through data-driven insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h4>
              <div className="text-blue-600 dark:text-blue-400 font-semibold mb-4">{member.role}</div>
              <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white dark:bg-gray-900 rounded-2xl p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                At HRlytics, we believe in empowering organizations to make data-driven decisions about their most valuable asset — their people. Our mission is to transform traditional HR practices through innovative analytics and AI-powered insights.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We're committed to helping companies build better workplaces by providing them with the tools they need to understand, engage, and develop their workforce effectively.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-6">Why Choose HRlytics?</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Star className="w-5 h-5" />
                  <span>Industry-leading analytics platform</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="w-5 h-5" />
                  <span>AI-powered insights and predictions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="w-5 h-5" />
                  <span>Dedicated customer success team</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="w-5 h-5" />
                  <span>Regular platform updates and improvements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 