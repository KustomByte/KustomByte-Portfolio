'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, X, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import Image from 'next/image';

const Portfolio = () => {
  const { t } = useLanguage();
  const [fullscreenProject, setFullscreenProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: t('portfolio.project1.title'),
      description: t('portfolio.project1.description'),
      image: '/portfolio/interactive-menu.jpg', // Image JPG du projet
      htmlCode: '/portfolio/interactive-menu/index.html', // Le chemin vers le fichier HTML
      tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
      category: 'web',
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: t('portfolio.project2.title'),
      description: t('portfolio.project2.description'),
      image: '/portfolio/wedding-invitation.jpg', // Image JPG du projet mobile
      htmlCode: '/portfolio/wedding-invitation/index.html', // Version web du projet Flutter
      tags: ['Flutter', 'Dart', 'Mobile', 'Web'],
      category: 'mobile',
      github: '#',
      demo: '#'
    },
    {
      id: 3,
      title: t('portfolio.project3.title'),
      description: t('portfolio.project3.description'),
      image: '/portfolio/pokemon-app.jpg', // Image JPG du projet Pokemon
      htmlCode: '/portfolio/pokemon-app/index.html', // Version web du projet Flutter Pokemon
      tags: ['Flutter', 'Dart', 'Mobile', 'UI Kit'],
      category: 'mobile',
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section id="portfolio" className="section-centered bg-black/10">
      <div className="content-wrapper center-content">
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
            <span className="text-white/90">{t('portfolio.title')}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full" style={{ marginBottom: '20px' }} />
          <p className="text-xl text-white/70 center-text max-w-2xl mx-auto">
            {t('portfolio.description')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500"
            >
              {/* Project Preview Area */}
              <div className="relative h-64 overflow-hidden">
                {/* Image par défaut */}
                <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                  {project.image === '/portfolio/interactive-menu.jpg' ? (
                    <Image 
                      src="/portfolio/interactive-menu.jpg" 
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : project.image === '/portfolio/wedding-invitation.jpg' ? (
                    <Image 
                      src="/portfolio/wedding-invitation.jpg" 
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : project.image === '/portfolio/pokemon-app.jpg' ? (
                    <Image 
                      src="/portfolio/pokemon-app.jpg" 
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-500/20 center-content">
                      <div className="text-6xl text-white/30 font-bold">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Prévisualisation image au survol */}
                {project.htmlCode && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.id === 1 ? (
                      <Image 
                        src="/portfolio/interactive-menu.jpg" 
                        alt={`Aperçu de ${project.title}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        priority
                      />
                    ) : project.id === 2 ? (
                      <Image 
                        src="/portfolio/wedding-invitation.jpg" 
                        alt={`Aperçu de ${project.title}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        priority
                      />
                    ) : project.id === 3 ? (
                      <Image 
                        src="/portfolio/pokemon-app.jpg" 
                        alt={`Aperçu de ${project.title}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-purple-500/30 center-content">
                        <div className="text-4xl text-white/50 font-bold">
                          Aperçu bientôt disponible
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay avec bouton de zoom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.button
                        onClick={() => setFullscreenProject(project.id)}
                        whileHover={{ scale: 1.08, y: -4, filter: project.category === 'web' ? 'drop-shadow(0 0 16px #60a5fa88)' : 'drop-shadow(0 0 16px #0008)' }}
                        whileTap={{ scale: 0.97 }}
                        className={
                          `relative flex items-center space-x-2 px-7 py-3 rounded-full font-semibold transition-all duration-300 select-none border-none outline-none overflow-hidden ` +
                          (project.category === 'web' ? 'bg-white/10 backdrop-blur-xl text-white shadow-xl' : 'bg-black/70 backdrop-blur-xl text-white shadow-xl')
                        }
                        style={{
                          textShadow: project.category === 'web' ? '0 2px 12px #1e293b88' : '0 2px 12px #000',
                          boxShadow: project.category === 'web' ? '0 4px 32px 0 #0ea5e988' : '0 4px 32px 0 #000a',
                          letterSpacing: '0.01em',
                          border: 'none',
                        }}
                        aria-label={t('portfolio.view.site')}
                      >
                        <span className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{boxShadow: project.category === 'web' ? '0 0 32px 8px #3b82f6aa' : '0 0 32px 8px #000a'}}></span>
                        <ExternalLink className={project.category === 'web' ? 'w-4 h-4 text-primary drop-shadow-md' : 'w-4 h-4 text-white drop-shadow-md'} />
                        <span className="relative z-10 text-sm font-semibold">{t('portfolio.view.site')}</span>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Badge catégorie */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs bg-black/80 backdrop-blur-lg text-white rounded-full border border-white/20">
                    {project.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white/90 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs text-primary transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal plein écran pour la prévisualisation */}
      <AnimatePresence>
        {fullscreenProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setFullscreenProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full h-full max-w-7xl max-h-full bg-gray-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barre d'outils style navigateur */}
              <div className="flex items-center justify-between p-4 bg-gray-800/90 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 cursor-pointer transition-colors"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 cursor-pointer transition-colors"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 cursor-pointer transition-colors"></div>
                  </div>
                  <div className="bg-gray-700/50 px-4 py-1 rounded-lg">
                    <span className="text-white/70 text-sm font-mono">
                      localhost:3000/portfolio/{projects.find(p => p.id === fullscreenProject)?.title.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white/80 font-medium text-sm">
                    {projects.find(p => p.id === fullscreenProject)?.title}
                  </span>
                  <button
                    onClick={() => setFullscreenProject(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Contenu de la prévisualisation avec zoom */}
              <div className="h-full pb-16 bg-white overflow-hidden">
                <iframe
                  src={projects.find(p => p.id === fullscreenProject)?.htmlCode}
                  className="w-full h-full border-0 transform transition-transform duration-300"
                  title="Project Preview"
                  style={{ 
                    transform: 'scale(1)',
                    transformOrigin: 'center center',
                    minHeight: '100%'
                  }}
                />
              </div>

              {/* Contrôles de zoom */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button className="p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white/80 hover:text-white transition-colors">
                  <span className="text-sm font-mono">100%</span>
                </button>
                <button 
                  onClick={() => setFullscreenProject(null)}
                  className="p-2 bg-primary hover:bg-primary/80 rounded-lg text-black font-medium transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
