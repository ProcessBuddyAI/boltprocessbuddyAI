import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'API Documentation', href: '#' },
        { name: 'Integrations', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Press Kit', href: '#' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Community', href: '#' },
        { name: 'Status Page', href: '#' },
        { name: 'Bug Reports', href: '#' },
        { name: 'Feature Requests', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'GDPR', href: '#' },
        { name: 'Security', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@processbuddyai.com', label: 'Email' }
  ];

  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/Logo.png" alt="ProcessBuddyAI" className="h-8 w-auto" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:animate-pulse">
                  ProcessBuddyAI
                </span>
              </Link>
            </div>
            <p className="text-gray-400 dark:text-gray-500 mb-6 max-w-sm">
              Transform complex processes into simple conversations. Get instant clarity and accelerate your team's productivity.
            </p>
            
            {/* Mini CTA */}
            <Link 
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 hover:animate-pulse transition-all duration-300 mb-6 inline-block text-center"
            >
              Book a Demo
            </Link>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:scale-110 hover:animate-bounce transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 hover:animate-pulse transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-2 dark:text-gray-200">Email Support</h4>
              <a href="mailto:support@processbuddyai.com" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 hover:animate-pulse transition-all duration-200">
                support@processbuddyai.com
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-2 dark:text-gray-200">Sales Inquiries</h4>
              <a href="mailto:sales@processbuddyai.com" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 hover:animate-pulse transition-all duration-200">
                sales@processbuddyai.com
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-2 dark:text-gray-200">Partnership</h4>
              <a href="mailto:partners@processbuddyai.com" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 hover:animate-pulse transition-all duration-200">
                partners@processbuddyai.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 dark:text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 ProcessBuddyAI. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400 dark:text-gray-500">
            <span>Made with ❤️ for better processes</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse hover:animate-bounce"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;