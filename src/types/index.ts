export interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  organization: {
    name: string;
    industry: string;
    size: string;
    location: string;
  };
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SignupData) => void;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular: boolean;
} 