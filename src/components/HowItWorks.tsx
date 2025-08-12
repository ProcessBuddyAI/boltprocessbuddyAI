import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSteps(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const steps = document.querySelectorAll('.step-card');
    steps.forEach(step => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Upload',
      description: 'Simply upload your documents, manuals, or process guides. Our AI instantly analyzes and understands your content.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      icon: MessageSquare,
      title: 'Ask',
      description: 'Ask questions in natural language. No need to search through documents or remember complex procedures.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Execute',
      description: 'Get precise, actionable answers instantly. Follow step-by-step guidance to complete any process with confidence.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Get started in
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              three simple steps
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transform your complex processes into simple conversations in minutes, not months
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-400 dark:via-purple-400 dark:to-green-400 transform -translate-y-1/2 animate-pulse"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                data-index={index}
                className={`text-center group step-card transition-all duration-1000 ${
                  visibleSteps[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-700 rounded-full shadow-lg mb-6 group-hover:scale-110 group-hover:animate-bounce transition-all duration-300">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:animate-pulse transition-all duration-300`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-6 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300 dark:text-gray-500 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to transform your processes?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of teams who've already simplified their workflows
            </p>
            <Link 
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 hover:animate-pulse transition-all duration-300 inline-block text-center"
            >
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;