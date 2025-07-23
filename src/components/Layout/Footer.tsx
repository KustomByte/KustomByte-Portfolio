'use client';

import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const linktreeUrl = 'https://linktr.ee/KustomByte';

  const quickLinks = [
    { href: '#hero', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#portfolio', label: t('nav.portfolio') },
    { href: '#contact', label: t('nav.contact') }
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10" role="contentinfo" aria-label="Pied de page KustomByte">
      <div className="center-container py-12">
        {/* Main Content */}
        <div className="center-text space-y-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
                marginBottom: '18px',
              }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold">
              <span className="text-primary">
                KustomByte
              </span>
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed center-text">
              {t('footer.brand.description')}
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Linktree Button */}
            <motion.a
              href={linktreeUrl}
              whileHover={{ scale: 1.08, y: -4, filter: 'drop-shadow(0 0 16px #60a5fa88)' }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center space-x-2 px-8 py-3 rounded-full font-semibold bg-white/10 backdrop-blur-xl text-white shadow-xl transition-all duration-300 select-none border-none outline-none overflow-hidden"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textShadow: '0 2px 12px #1e293b88',
                boxShadow: '0 4px 32px 0 #0ea5e988',
                letterSpacing: '0.01em',
                border: 'none',
                marginBottom: '18px',
              }}
            >
              <span className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{boxShadow:'0 0 32px 8px #3b82f6aa'}}></span>
              <span className="relative z-10">🔗</span>
              <span className="relative z-10" style={{ marginLeft: '8px' }}>{t('footer.links.title')}</span>
            </motion.a>

            {/* Comeup Contact */}
            <motion.a
              href="https://comeup.com/fr/@kustombyte"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, y: -4, filter: 'drop-shadow(0 0 12px #a78bfa88)' }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center space-x-2 px-8 py-3 rounded-full font-semibold bg-white/5 backdrop-blur-xl text-white shadow-lg transition-all duration-300 select-none border-none outline-none overflow-hidden"
              style={{
                textShadow: '0 2px 12px #1e293b88',
                boxShadow: '0 2px 16px 0 #a78bfa55',
                letterSpacing: '0.01em',
                border: 'none',
                marginBottom: '18px',
              }}
            >
              <span className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{boxShadow:'0 0 24px 6px #a78bfa88'}}></span>
              <Mail className="w-4 h-4 text-purple-400 drop-shadow-md" />
              <span className="relative z-10" style={{ marginLeft: '8px' }}>{t('footer.contact.comeup')}</span>
            </motion.a>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="text-white/60 hover:text-primary transition-all duration-300 font-medium"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8 center-text"
        >
          <div className="flex items-center justify-center space-x-2 text-white/60 text-sm">
            <span>© 2025 KustomByte. Créé avec</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>et beaucoup de café ☕</span>
          </div>
        </motion.div>

        {/* Scroll to top button */}
        <motion.button
          onClick={() => scrollToSection('#hero')}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary rounded-full center-content text-black shadow-lg hover:shadow-glow transition-all duration-300 z-40"
        >
          ↑
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
