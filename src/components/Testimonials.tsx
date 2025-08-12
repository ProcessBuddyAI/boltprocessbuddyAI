import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
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

    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Operations Director',
      company: 'TechFlow Solutions',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'ProcessBuddyAI reduced our onboarding time from 2 weeks to 3 days. New team members can instantly find answers instead of waiting for meetings.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Compliance Manager',
      company: 'BioPharma Inc',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'Our regulatory compliance improved dramatically. The AI understands complex pharma procedures and provides accurate, audit-ready responses.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Creative Director',
      company: 'Design Studio Pro',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'Game-changer for our creative team. Brand guidelines, design processes, client requirements - everything is instantly accessible through simple questions.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Loved by teams
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See what industry leaders are saying about ProcessBuddyAI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-index={index}
              className={`testimonial-card bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-4 hover:scale-105 transition-all duration-500 relative ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current hover:animate-spin" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                  <div className="text-sm text-blue-600 font-medium">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center hover:scale-105 transition-transform duration-300">
            <div>
              <div className="text-4xl font-bold mb-2 hover:animate-pulse">98%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 hover:animate-pulse">75%</div>
              <div className="text-blue-100">Time Saved on Processes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 hover:animate-pulse">10k+</div>
              <div className="text-blue-100">Processes Automated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;