'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Code, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

const Hero = () => {
  const { t } = useLanguage();
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
  }>>([]);
  
  useEffect(() => {
    // Générer les particules côté client pour éviter l'erreur d'hydratation
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    console.log('Scrolling to:', sectionId, 'Element found:', element);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="section-centered">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, particle.x],
              y: [0, particle.y],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: particle.delay,
            }}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>

      <div className="content-wrapper center-content space-y-8">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="center-text space-y-4"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold center-text"
            style={{ marginBottom: '18px' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="block text-white/90">
              {t('hero.greeting')}
            </span>
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent mt-2">
              KustomByte
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/70 center-text max-w-3xl mx-auto leading-relaxed"
            style={{ marginBottom: '36px' }}
          >
            {t('hero.subtitle')}
          </motion.p>
        </motion.div>

        {/* Skills badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto"
          style={{ marginBottom: '32px' }}
        >
          {['Web Development', 'UI/UX Design', 'Mobile Apps', 'Branding'].map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.08, y: -4, filter: 'drop-shadow(0 0 12px #60a5fa88)' }}
              className="rounded-full px-7 py-3 text-white text-base font-semibold shadow-none transition-all duration-300 cursor-default select-none bg-transparent border-none outline-none"
              style={{
                textShadow: '0 2px 12px #1e293b88',
                boxShadow: '0 0 0 0 transparent',
                letterSpacing: '0.01em',
                background: 'transparent',
              }}
            >
              <span className="inline-block transition-all duration-300">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ marginBottom: '32px' }}
        >
          <motion.button
            onClick={() => scrollToSection('portfolio')}
            whileHover={{ scale: 1.08, y: -4, filter: 'drop-shadow(0 0 16px #60a5fa88)' }}
            whileTap={{ scale: 0.97 }}
            className="relative px-9 py-4 rounded-full font-semibold flex items-center space-x-3 bg-white/10 backdrop-blur-xl text-white shadow-xl transition-all duration-300 select-none border-none outline-none overflow-hidden"
            style={{
              textShadow: '0 2px 12px #1e293b88',
              boxShadow: '0 4px 32px 0 #0ea5e988',
              letterSpacing: '0.01em',
              border: 'none',
            }}
          >
            <span className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{boxShadow:'0 0 32px 8px #3b82f6aa'}}></span>
            <Code className="w-5 h-5 text-primary drop-shadow-md" />
            <span className="relative z-10">{t('hero.cta_work')}</span>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.08, y: -4, filter: 'drop-shadow(0 0 12px #a78bfa88)' }}
            whileTap={{ scale: 0.97 }}
            className="relative px-9 py-4 rounded-full font-semibold flex items-center space-x-3 bg-white/5 backdrop-blur-xl text-white shadow-lg transition-all duration-300 select-none border-none outline-none overflow-hidden"
            style={{
              textShadow: '0 2px 12px #1e293b88',
              boxShadow: '0 2px 16px 0 #a78bfa55',
              letterSpacing: '0.01em',
              border: 'none',
            }}
          >
            <span className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{boxShadow:'0 0 24px 6px #a78bfa88'}}></span>
            <Mail className="w-5 h-5 text-purple-400 drop-shadow-md" />
            <span className="relative z-10" style={{ marginLeft: '8px' }}>{t('hero.cta_contact')}</span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/50 hover:text-primary transition-colors duration-300 flex flex-col items-center space-y-2"
          >
            <span className="text-sm font-medium">{t('hero.scroll_down')}</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
