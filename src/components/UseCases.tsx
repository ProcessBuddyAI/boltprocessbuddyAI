import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Pill, Users } from 'lucide-react';

const UseCases = () => {
  const [visibleSections, setVisibleSections] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSections(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('.use-case-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const useCases = [
    {
      icon: Palette,
      title: 'Creative Teams',
      subtitle: 'Design & Marketing Excellence',
      description: 'Streamline creative workflows, brand guidelines, and project management. Get instant answers about design standards, approval processes, and campaign execution.',
      benefits: ['Faster project delivery', 'Consistent brand execution', 'Reduced revision cycles'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Pill,
      title: 'Pharma Sales',
      subtitle: 'Compliance & Procedure Mastery',
      description: 'Navigate complex regulatory requirements and sales procedures with confidence. Access compliance guidelines, product information, and sales protocols instantly.',
      benefits: ['Regulatory compliance', 'Faster onboarding', 'Reduced compliance risks'],
      image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Users,
      title: 'HR & Training',
      subtitle: 'People Operations Simplified',
      description: 'Transform employee onboarding and policy management. Provide instant access to HR policies, training materials, and procedural guidance.',
      benefits: ['Improved onboarding', 'Policy clarity', 'Reduced HR workload'],
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Trusted across
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              industries and teams
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how different teams use ProcessBuddyAI to eliminate confusion and accelerate results
          </p>
        </div>

        <div className="space-y-20">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              data-index={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 use-case-section transition-all duration-1000 ${
                visibleSections[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center hover:scale-110 hover:rotate-3 transition-all duration-300">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{useCase.title}</h3>
                    <p className="text-blue-600 font-medium">{useCase.subtitle}</p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {useCase.description}
                </p>

                <div className="space-y-3">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  to="/login"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 hover:animate-pulse transition-all duration-300 inline-block text-center"
                >
                  Learn More
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1">
                <div className="relative group">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/30 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;