'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Shield, Headphones, CheckCircle, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  const comeupFeatures = [
    {
      icon: Shield,
      title: t('contact.comeup.why.secure'),
      description: 'Paiements protégés'
    },
    {
      icon: Headphones,
      title: t('contact.comeup.why.support'),
      description: 'Support disponible'
    },
    {
      icon: CheckCircle,
      title: t('contact.comeup.why.guarantee'),
      description: 'Qualité assurée'
    }
  ];

  return (
    <section id="contact" className="section-centered bg-black/20">
      <div className="content-wrapper center-content space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="center-text"
          style={{ marginBottom: '30px' }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold center-text" style={{ marginBottom: '10px' }}>
            <span className="text-white/90">{t('contact.title')}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full" style={{ marginBottom: '20px' }} />
          <p className="text-xl text-white/70 center-text max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        {/* Comeup Section */}
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 center-text"
          >
            {/* Comeup Logo/Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl center-content mx-auto mb-8"
            >
              <User className="w-10 h-10 text-primary" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white/90 center-text"
              style={{ marginBottom: '20px' }}
            >
              {t('contact.comeup.title')}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed center-text"
              style={{ marginBottom: '20px' }}
            >
              {t('contact.comeup.description')}
            </motion.p>

            {/* Comeup CTA Button */}
            <motion.a
              href="https://comeup.com/fr/@kustombyte"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08, y: -4, filter: 'drop-shadow(0 0 16px #60a5fa88)' }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center space-x-3 px-9 py-4 rounded-full font-semibold bg-white/10 backdrop-blur-xl text-white shadow-xl transition-all duration-300 select-none border-none outline-none overflow-hidden text-lg"
              style={{
                marginBottom: '30px',
                textShadow: '0 2px 12px #1e293b88',
                boxShadow: '0 4px 32px 0 #0ea5e988',
                letterSpacing: '0.01em',
                border: 'none',
              }}
            >
              <span className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{boxShadow:'0 0 32px 8px #3b82f6aa'}}></span>
              <ExternalLink className="w-6 h-6 text-primary drop-shadow-md" />
              <span style={{ marginLeft: '8px' }}>{t('contact.comeup.button')}</span>
            </motion.a>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              style={{ marginTop: '20px', marginBottom: '10px' }}
            >
              <h4 className="text-2xl font-bold text-white/90 center-text" style={{ marginBottom: '20px' }}>
                {t('contact.comeup.why.title')}
              </h4>
              
              <div className="grid md:grid-cols-3 gap-8">
                {comeupFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="center-text center-content"
                  >
                    <div className="w-16 h-16 bg-black/20 backdrop-blur-lg rounded-xl center-content mx-auto border border-white/10" style={{ marginBottom: '20px' }}>
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h5 className="text-lg font-semibold text-white/90 center-text" style={{ marginBottom: '15px' }}>
                      {feature.title}
                    </h5>
                    <p className="text-white/60 text-sm center-text">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;