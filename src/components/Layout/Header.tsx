'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: '#hero', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#portfolio', label: t('nav.portfolio') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl border-b border-white/10">
      {/* Skip link accessibilité (fallback si le header est focus en premier) */}
      <a
        href="#main-content"
        className="skip-link"
        tabIndex={0}
      >
        Aller au contenu principal
      </a>
      <div className="center-container">
        <nav className="flex items-center justify-between h-16 w-full" role="navigation" aria-label="Navigation principale">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
            role="banner"
            aria-label="KustomByte - Accueil"
          >
            <Link
              href="/"
              aria-label="Accueil KustomByte"
              className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              <span className="text-primary" aria-label="KustomByte logo" role="img">
                KustomByte
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-12">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-white/90 hover:text-primary transition-all duration-300 relative group px-4 py-2 rounded-lg font-medium whitespace-nowrap"
                >
                  {item.label}
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="navbar-hover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 bg-black/20 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10 hover:border-primary/50 transition-all duration-300"
              >
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === language)?.flag}
                </span>
              </motion.button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[150px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as 'fr' | 'en');
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors duration-200 flex items-center space-x-3 ${
                          language === lang.code ? 'bg-primary/20 text-primary' : 'text-white/80'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-black/20 backdrop-blur-lg rounded-full p-2 border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-2 bg-black/20 backdrop-blur-lg rounded-2xl mt-2 border border-white/10">
                {navItems.map((item, index) => (
                  <div key={item.href}>
                    <motion.button
                      onClick={() => scrollToSection(item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="block w-full px-6 py-3 text-white/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 text-center font-medium rounded-lg mx-2"
                    >
                      {item.label}
                    </motion.button>
                    {/* Séparateur entre les éléments mobile (sauf le dernier) */}
                    {index < navItems.length - 1 && (
                      <div className="w-full h-px bg-white/10 mx-auto my-1"></div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
