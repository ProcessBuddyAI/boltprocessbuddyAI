import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Upload, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark:bg-gray-900">
      {/* Background with gradient and animated nodes */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="absolute inset-0 opacity-20">
          {/* Animated network nodes */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-float-delayed-2"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-white rounded-full animate-float-delayed"></div>
          
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full">
            <line x1="25%" y1="25%" x2="33%" y2="33%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="animate-pulse" />
            <line x1="75%" y1="33%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="animate-pulse" style={{animationDelay: '1s'}} />
            <line x1="33%" y1="75%" x2="50%" y2="67%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="animate-pulse" style={{animationDelay: '2s'}} />
          </svg>
        </div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-gray-100 mb-6 leading-tight">
            Turn complex processes into
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              simple, instant conversations
            </span>
          </h1>

          {/* Supporting Subheadline */}
          <p className="text-xl sm:text-2xl text-blue-100 dark:text-blue-200 mb-8 max-w-3xl mx-auto">
            Stop searching. Start asking. Get clarity in seconds.
          </p>

          {/* Hero Visual Placeholder */}
          <div className="mb-12 relative">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20 dark:border-white/10 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-white dark:text-gray-100 font-bold">AI</span>
                </div>
                <div className="flex-1 bg-white/20 dark:bg-white/10 rounded-lg p-3">
                  <p className="text-white dark:text-gray-100 text-sm">How do I process a refund request?</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-blue-200 dark:text-blue-300 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <span className="ml-2">ProcessBuddyAI is typing...</span>
              </div>
            </div>
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              to="/login"
              className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 hover:animate-pulse transition-all duration-300 flex items-center space-x-2"
            >
              <Play size={20} className="group-hover:animate-bounce" />
              <span>Try Demo</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login"
              className="border-2 border-white dark:border-gray-300 text-white dark:text-gray-100 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 dark:hover:bg-gray-100 dark:hover:text-gray-900 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Upload size={20} className="group-hover:animate-bounce" />
              <span>Upload Process</span>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="text-blue-200 dark:text-blue-300">
            <p className="text-sm mb-4">Trusted by teams at innovative companies</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-xs font-semibold">10,000+ Processes</div>
              <div className="w-1 h-1 bg-blue-300 dark:bg-blue-400 rounded-full"></div>
              <div className="text-xs font-semibold">500+ Companies</div>
              <div className="w-1 h-1 bg-blue-300 dark:bg-blue-400 rounded-full"></div>
              <div className="text-xs font-semibold">99.9% Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;