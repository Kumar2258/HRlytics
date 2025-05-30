import React, { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import DashboardPreview from '../DashboardPreview';
import VideoModal from '../common/VideoModal';

interface HomeSectionProps {
  openModal: (type: 'signin' | 'signup') => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ openModal }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white space-y-8">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Simplify your <span className="text-yellow-300">HR management</span> with AI
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Empowering HR teams with real-time performance analytics, intelligent feedback analysis, and smart decision-making through advanced AI and NLP technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => openModal('signup')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-colors duration-300 shadow-2xl"
              aria-label="Get Started"
            >
              Get Started <ArrowRight className="inline w-5 h-5 ml-2" />
            </button>
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-2"
              aria-label="Watch Demo"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>
        
        <div className="lg:pl-12">
          <DashboardPreview />
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </section>
  );
};

export default HomeSection; 