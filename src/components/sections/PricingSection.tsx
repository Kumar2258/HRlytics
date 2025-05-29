import React from 'react';
import { CheckCircle } from 'lucide-react';

const PricingSection = ({ openModal }: { openModal: (type: 'signin' | 'signup') => void }) => {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      features: [
        "Up to 50 employees",
        "Basic performance analytics",
        "Standard reports",
        "Email support",
        "1 admin user"
      ],
      isPopular: false
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      features: [
        "Up to 200 employees",
        "Advanced analytics",
        "Custom reports",
        "Priority support",
        "5 admin users",
        "API access"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "Unlimited employees",
        "Full analytics suite",
        "Custom integrations",
        "24/7 support",
        "Unlimited admin users",
        "Dedicated account manager"
      ],
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="min-h-screen bg-gray-50 dark:bg-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide uppercase mb-4">PRICING</div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Select the perfect plan for your team. All plans include our core features with different levels of analytics and support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                plan.isPopular ? 'border-2 border-blue-600 dark:border-blue-400' : 'border border-gray-100 dark:border-gray-700'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openModal('signup')}
                className={`w-full py-3 rounded-xl font-semibold transition-colors duration-300 ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Need a custom plan? <button onClick={() => openModal('signup')} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Contact us</button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 