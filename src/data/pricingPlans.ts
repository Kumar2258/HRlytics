import { PricingPlan } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$29",
    period: "per month",
    features: [
      "Up to 50 employees",
      "Basic performance analytics",
      "Email support",
      "Standard templates",
      "Monthly reports"
    ],
    isPopular: false
  },
  {
    name: "Professional",
    price: "$79",
    period: "per month",
    features: [
      "Up to 200 employees",
      "Advanced AI analytics",
      "Call center analysis",
      "Priority support",
      "Custom dashboards",
      "Real-time insights",
      "Sentiment analysis"
    ],
    isPopular: true
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "per month",
    features: [
      "Unlimited employees",
      "Full AI suite",
      "Custom integrations",
      "Dedicated support",
      "Advanced security",
      "Custom models",
      "White-label options"
    ],
    isPopular: false
  }
]; 