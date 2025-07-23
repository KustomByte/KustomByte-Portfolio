'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types pour les langues supportées
export type Language = 'fr' | 'en';

// Interface pour le contexte
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Textes multilingues
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Bonjour, je suis',
    'hero.title': 'KustomByte',
    'hero.subtitle': 'Développeur Full-Stack & Designer passionné par la création d\'expériences digitales exceptionnelles',
    'hero.description': 'Créateur d\'applications mobiles et web innovantes avec Flutter et les technologies modernes. Transformons vos idées en solutions digitales exceptionnelles.',
    'hero.cta_work': 'Voir mes projets',
    'hero.cta_contact': 'Me contacter',
    'hero.scroll_down': 'Découvrir',
    
    // About Section
    'about.title': 'À Propos',
    'about.subtitle': 'Développeur passionné & Créateur d\'expériences',
    'about.description': 'Fort d’une expérience de plus d’un an dans le domaine, je me consacre exclusivement au design UX/UI et au web design. Mon objectif : concevoir des interfaces intuitives et esthétiques, tout en répondant aux enjeux fonctionnels des projets. J’allie sens du détail et vision stratégique pour créer des expériences utilisateurs fluides et impactantes.',
    'about.mission': 'Ma mission est de transformer vos idées en solutions digitales innovantes qui dépassent vos attentes et créent de la valeur pour vos utilisateurs.',
    'about.years_experience': 'Années d\'expérience',
    'about.projects_completed': 'Projets réalisés',
    'about.happy_clients': 'Clients satisfaits',
    'about.skills_title': 'Mes Compétences',
    'about.skills.frontend': 'React, Next.js, TypeScript',
    'about.skills.mobile': 'React Native, Flutter',
    'about.skills.design': 'UI/UX, Canva',
    
    // Portfolio Section
    'portfolio.title': 'Mes Projets',
    'portfolio.description': 'Découvrez une sélection de mes réalisations récentes',
    'portfolio.project1.title': 'Menu HTML Interactif',
    'portfolio.project1.description': 'Menu HTML interactif et responsive avec design moderne',
    'portfolio.project2.title': 'Invitation de Mariage Numérique',
    'portfolio.project2.description': 'Application mobile Flutter pour invitations de mariage numériques avec compteur en temps réel',
    'portfolio.project3.title': 'Kit UI Pokemon Flutter',
    'portfolio.project3.description': 'Interface Pokemon avec connexion personnalisable - saisissez ce que vous souhaitez pour vous connecter tant que les champs ne sont pas vides',
    'portfolio.category.all': 'Tous',
    'portfolio.category.mobile': 'Mobile',
    'portfolio.category.web': 'Web',
    'portfolio.category.ui': 'UI/UX',
    'portfolio.view': 'Voir le projet',
    'portfolio.github': 'Code source',
    'portfolio.view.site': 'Voir le site',
    
    // Contact Section
    'contact.title': 'Contactez-Moi',
    'contact.description': 'Prêt à donner vie à votre projet ? Discutons ensemble !',
    'contact.comeup.title': 'Me contacter sur Comeup',
    'contact.comeup.description': 'Je suis disponible sur Comeup pour tous vos projets de développement web et mobile. Consultez mon profil et contactez-moi directement pour discuter de vos besoins.',
    'contact.comeup.button': 'Voir mon profil Comeup',
    'contact.comeup.why.title': 'Pourquoi Comeup ?',
    'contact.comeup.why.secure': 'Paiements sécurisés',
    'contact.comeup.why.support': 'Support client 24/7',
    'contact.comeup.why.guarantee': 'Satisfaction garantie',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Adresse e-mail',
    'contact.form.company': 'Entreprise',
    'contact.form.budget': 'Budget estimé',
    'contact.form.budget.placeholder': 'Sélectionnez votre budget',
    'contact.form.budget.1k': '1K - 5K €',
    'contact.form.budget.5k': '5K - 10K €',
    'contact.form.budget.10k': '10K - 25K €',
    'contact.form.budget.25k': '25K - 50K €',
    'contact.form.budget.50k': '50K+ €',
    'contact.form.project': 'Type de projet',
    'contact.form.project.placeholder': 'Sélectionnez le type de projet',
    'contact.form.project.mobile': 'Application Mobile',
    'contact.form.project.web': 'Site Web',
    'contact.form.project.ecommerce': 'E-commerce',
    'contact.form.project.custom': 'Solution sur mesure',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Envoyer le message',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Téléphone',
    'contact.info.location': 'Localisation',
    'contact.info.availability': 'Disponibilité',
    'contact.availability.available': 'Disponible pour nouveaux projets',
    'contact.cta.call': 'Planifier un appel',
    'contact.cta.discuss': 'Discuter de votre projet',
    
    // Footer
    'footer.brand.description': 'Développeur Flutter & Web spécialisé dans la création d\'applications innovantes et d\'expériences utilisateur exceptionnelles.',
    'footer.navigation.title': 'Navigation',
    'footer.services.title': 'Services',
    'footer.services.mobile': 'Développement Mobile',
    'footer.services.web': 'Développement Web',
    'footer.services.ui': 'Design UI/UX',
    'footer.services.consulting': 'Consulting Tech',
    'footer.contact.title': 'Contact',
    'footer.contact.availability': 'Disponible pour nouveaux projets',
    'footer.social.title': 'Réseaux Sociaux',
    'footer.links.title': 'Mes liens',
    'footer.contact.comeup': 'Me contacter sur Comeup',
    'footer.rights': 'Tous droits réservés.',
    'footer.back.top': 'Retour en haut',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Hello, I\'m',
    'hero.title': 'KustomByte',
    'hero.subtitle': 'Full-Stack Developer & Designer passionate about creating exceptional digital experiences',
    'hero.description': 'Creator of innovative mobile and web applications with Flutter and modern technologies. Let\'s transform your ideas into exceptional digital solutions.',
    'hero.cta_work': 'View my work',
    'hero.cta_contact': 'Get in touch',
    'hero.scroll_down': 'Discover',
    
    // About Section
    'about.title': 'About',
    'about.subtitle': 'Passionate Developer & Experience Creator',
    'about.description': 'With over a year of experience in the field, I dedicate myself exclusively to UX/UI design and web design. My goal: to design intuitive and aesthetic interfaces while addressing the functional challenges of projects. I combine attention to detail and strategic vision to create fluid and impactful user experiences.',
    'about.mission': 'My mission is to transform your ideas into innovative digital solutions that exceed your expectations and create value for your users.',
    'about.years_experience': 'Years of experience',
    'about.projects_completed': 'Projects completed',
    'about.happy_clients': 'Happy clients',
    'about.skills_title': 'My Skills',
    'about.skills.frontend': 'React, Next.js, TypeScript',
    'about.skills.mobile': 'React Native, Flutter',
    'about.skills.design': 'UI/UX, Canva',
    
    // Portfolio Section
    'portfolio.title': 'My Projects',
    'portfolio.description': 'Discover a selection of my recent work',
    'portfolio.project1.title': 'Interactive HTML Menu',
    'portfolio.project1.description': 'Interactive and responsive HTML menu with modern design',
    'portfolio.project2.title': 'Digital Wedding Invitation',
    'portfolio.project2.description': 'Flutter mobile application for digital wedding invitations with real-time counter',
    'portfolio.project3.title': 'Pokemon Flutter UI Kit',
    'portfolio.project3.description': 'Pokemon interface with customizable login - enter what you want to connect as long as the fields are not empty',
    'portfolio.category.all': 'All',
    'portfolio.category.mobile': 'Mobile',
    'portfolio.category.web': 'Web',
    'portfolio.category.ui': 'UI/UX',
    'portfolio.view': 'View project',
    'portfolio.github': 'Source code',
    'portfolio.view.site': 'View site',
    
    // Contact Section
    'contact.title': 'Contact Me',
    'contact.description': 'Ready to bring your project to life? Let\'s discuss!',
    'contact.comeup.title': 'Contact me on Comeup',
    'contact.comeup.description': 'I\'m available on Comeup for all your web and mobile development projects. Check out my profile and contact me directly to discuss your needs.',
    'contact.comeup.button': 'View my Comeup profile',
    'contact.comeup.why.title': 'Why Comeup?',
    'contact.comeup.why.secure': 'Secure payments',
    'contact.comeup.why.support': '24/7 customer support',
    'contact.comeup.why.guarantee': 'Satisfaction guaranteed',
    'contact.form.name': 'Full name',
    'contact.form.email': 'Email address',
    'contact.form.company': 'Company',
    'contact.form.budget': 'Estimated budget',
    'contact.form.budget.placeholder': 'Select your budget',
    'contact.form.budget.1k': '1K - 5K €',
    'contact.form.budget.5k': '5K - 10K €',
    'contact.form.budget.10k': '10K - 25K €',
    'contact.form.budget.25k': '25K - 50K €',
    'contact.form.budget.50k': '50K+ €',
    'contact.form.project': 'Project type',
    'contact.form.project.placeholder': 'Select project type',
    'contact.form.project.mobile': 'Mobile App',
    'contact.form.project.web': 'Website',
    'contact.form.project.ecommerce': 'E-commerce',
    'contact.form.project.custom': 'Custom Solution',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send message',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.location': 'Location',
    'contact.info.availability': 'Availability',
    'contact.availability.available': 'Available for new projects',
    'contact.cta.call': 'Schedule a call',
    'contact.cta.discuss': 'Discuss your project',
    
    // Footer
    'footer.brand.description': 'Flutter & Web Developer specialized in creating innovative applications and exceptional user experiences.',
    'footer.navigation.title': 'Navigation',
    'footer.services.title': 'Services',
    'footer.services.mobile': 'Mobile Development',
    'footer.services.web': 'Web Development',
    'footer.services.ui': 'UI/UX Design',
    'footer.services.consulting': 'Tech Consulting',
    'footer.contact.title': 'Contact',
    'footer.contact.availability': 'Available for new projects',
    'footer.social.title': 'Social Media',
    'footer.links.title': 'My links',
    'footer.contact.comeup': 'Contact me on Comeup',
    'footer.rights': 'All rights reserved.',
    'footer.back.top': 'Back to top',
  }
};

// Création du contexte
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider du contexte
interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('fr'); // Français par défaut

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
