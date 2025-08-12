import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Crown, Building2 } from 'lucide-react';

const Pricing = () => {
  const [visibleCards, setVisibleCards] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: 'Free',
      icon: Zap,
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out ProcessBuddyAI',
      features: [
        '1 Process document',
        'Basic AI conversations',
        'Email support',
        'Standard security'
      ],
      cta: 'Get Started Free',
      popular: false,
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Pro',
      icon: Crown,
      price: '$5',
      period: 'per user/month',
      description: 'Ideal for growing teams and departments',
      features: [
        '10 Process documents',
        'Advanced AI conversations',
        'Priority support',
        'Team collaboration',
        'Analytics dashboard',
        'Custom integrations'
      ],
      cta: 'Start Pro Trial',
      popular: true,
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Enterprise',
      icon: Building2,
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited processes',
        'Advanced AI with custom training',
        'Dedicated support manager',
        'SSO & advanced security',
        'Custom workflows',
        'API access',
        'On-premise deployment'
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Simple, transparent
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              pricing for everyone
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              data-index={index}
              className={`relative bg-white dark:bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              } pricing-card ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl mb-4 hover:scale-110 hover:rotate-3 transition-all duration-300`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600 dark:text-gray-300 ml-2">/{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0 hover:animate-spin`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to="/login"
                  className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 hover:animate-pulse inline-block text-center'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-500 hover:scale-105 inline-block text-center'
                  } ${plan.name === 'Enterprise' ? 'pointer-events-none opacity-75' : ''}`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Questions about pricing? We're here to help.
          </p>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:animate-pulse">
            View FAQ →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;