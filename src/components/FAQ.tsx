import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [visibleItems, setVisibleItems] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: 'How secure is my data with ProcessBuddyAI?',
      answer: 'We take security seriously. All data is encrypted in transit and at rest using bank-level encryption. We\'re SOC 2 compliant and never share your data with third parties. Your processes remain completely private and secure.'
    },
    {
      question: 'How quickly can I integrate ProcessBuddyAI with my existing systems?',
      answer: 'Most teams are up and running within minutes. Simply upload your documents, and our AI immediately starts understanding your processes. For advanced integrations with existing tools, our API allows seamless connectivity with your current workflow.'
    },
    {
      question: 'What\'s the learning curve for my team?',
      answer: 'There\'s virtually no learning curve. If your team can ask questions in plain English, they can use ProcessBuddyAI. The interface is intuitive, and most users become proficient within their first conversation with the AI.'
    },
    {
      question: 'How do I measure ROI with ProcessBuddyAI?',
      answer: 'Our customers typically see 75% reduction in time spent searching for process information, 60% faster onboarding, and significant reduction in process-related errors. Our analytics dashboard tracks usage and time savings to help you measure concrete ROI.'
    },
    {
      question: 'Can ProcessBuddyAI handle complex, multi-step processes?',
      answer: 'Absolutely. Our AI excels at breaking down complex processes into clear, actionable steps. Whether it\'s regulatory compliance, technical procedures, or multi-department workflows, ProcessBuddyAI provides step-by-step guidance tailored to your specific situation.'
    },
    {
      question: 'What file formats does ProcessBuddyAI support?',
      answer: 'We support all major document formats including PDF, Word, Excel, PowerPoint, plain text, and more. Our AI can also process structured data from databases and integrate with popular tools like Confluence, Notion, and SharePoint.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Frequently asked
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about ProcessBuddyAI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              data-index={index}
              className={`faq-item bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-500 ${
                visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-bounce" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Still have questions? We'd love to help.
          </p>
          <Link 
            to="/login"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 hover:animate-pulse transition-all duration-300 inline-block text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;