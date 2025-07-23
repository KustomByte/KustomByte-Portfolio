'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

const About = () => {
  const { t } = useLanguage();

  const skills = [
    { icon: Code2, name: 'Frontend', description: t('about.skills.frontend') },
    { icon: Smartphone, name: 'Mobile', description: t('about.skills.mobile') },
    { icon: Palette, name: 'Design', description: t('about.skills.design') },
  ];

  return (
    <section id="about" className="section-centered bg-black/20">
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
            <span className="text-white/90">{t('about.title')}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full" style={{ marginBottom: '20px' }} />
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Text Content */}
          <div className="space-y-6 center-text md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white/90" style={{ marginBottom: '10px' }}>
              {t('about.subtitle')}
            </h3>
            <p className="text-lg text-white/70 leading-relaxed" style={{ marginBottom: '10px' }}>
              {t('about.description')}
            </p>
            <p className="text-lg text-white/70 leading-relaxed" style={{ marginBottom: '30px' }}>
              {t('about.mission')}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="center-text">
                <div className="text-3xl font-bold text-primary">1+</div>
                <div className="text-sm text-white/60">{t('about.years_experience')}</div>
              </div>
              <div className="center-text">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-white/60">{t('about.projects_completed')}</div>
              </div>
              <div className="center-text">
                <div className="text-3xl font-bold text-primary">3+</div>
                <div className="text-sm text-white/60">{t('about.happy_clients')}</div>
              </div>
            </div>
          </div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="center-content"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full border border-white/10 center-content bg-black/10 backdrop-blur-lg">
                <Image 
                  src="/kustombyte.png" 
                  alt="KustomByte Logo" 
                  width={256}
                  height={256}
                  className="w-64 h-64 object-cover rounded-full"
                  priority
                />
              </div>
              {/* Floating elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-4 left-1/2 w-3 h-3 bg-primary rounded-full" />
                <div className="absolute bottom-4 right-1/4 w-2 h-2 bg-blue-500 rounded-full" />
                <div className="absolute left-4 top-1/3 w-2 h-2 bg-purple-500 rounded-full" />
                <div className="absolute right-4 bottom-1/3 w-3 h-3 bg-green-500 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mx-auto"
          style={{ marginTop: '30px' }}
        >
          <h3 className="text-3xl font-bold text-white/90 center-text" style={{ marginBottom: '30px' }}>
            {t('about.skills_title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, y: -8 }}
                className="relative group"
              >
                {/* Conteneur principal avec effet glassmorphism avancé */}
                <div className="relative bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl p-8 center-content overflow-hidden transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/20">
                  
                  {/* Effet de lueur d'arrière-plan */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Particules flottantes */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
                    <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-500/40 rounded-full animate-pulse delay-300" />
                    <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-purple-500/30 rounded-full animate-pulse delay-700" />
                  </div>
                  
                  <div className="relative z-10 center-content space-y-6">
                    {/* Icône avec effet moderne */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl center-content group-hover:from-primary/30 group-hover:to-blue-500/30 transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                        <div className="w-16 h-16 bg-black/20 backdrop-blur-lg rounded-xl center-content border border-white/10 group-hover:border-primary/30 transition-all duration-500">
                          <skill.icon className="w-9 h-9 text-primary group-hover:text-white transition-colors duration-500" />
                        </div>
                      </div>
                      
                      {/* Cercle décoratif */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Contenu textuel */}
                    <div className="center-text space-y-3">
                      <h4 className="text-2xl font-bold text-white/95 group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </h4>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full group-hover:w-16 transition-all duration-500" />
                      <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Effet de bordure animée */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
