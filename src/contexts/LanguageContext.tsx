import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  ru: {
    // Header
    "nav.components": "Компоненты",
    "nav.systems": "Системы",
    "nav.share": "Поделиться",
    "nav.login": "Войти",

    // Hero
    "hero.title": "Сравнивайте UX-паттерны гигантов.",
    "hero.subtitle": "компонентов",
    "hero.description": "Единая платформа для анализа, сравнения и внедрения готовых UI-компонентов из ведущих дизайн-систем. Принимайте обоснованные архитектурные решения.",
    "hero.searchPlaceholder": "Поиск дизайн-системы",

    // Filters
    "filters.component": "Компонент:",
    "filters.type": "Тип:",
    "filters.state": "Состояние:",
    "filters.button": "Button",
    "filters.input": "Input",
    "filters.switch": "Switch",
    "filters.select": "Select",
    "filters.datepicker": "Date Picker",
    "filters.modal": "Modal",
    "filters.radio": "Radio Button",
    "filters.tag": "Tag",

    "filters.state.default": "Default",
    "filters.state.hover": "Hover",
    "filters.state.focus": "Focus",
    "filters.state.disabled": "Disabled",
    "filters.state.error": "Error",
    "filters.state.open": "Open",
    "filters.state.loading": "Загрузка",

    "filters.button.primary": "Primary",
    "filters.button.secondary": "Secondary",
    "filters.button.tertiary": "Tertiary",
    "filters.button.destructive": "Destructive",
    "filters.button.icon": "Icon Button",
    
    "filters.modal.alert": "Alert Dialog",
    "filters.modal.transactional": "Transactional Modal",
    "filters.modal.acknowledgment": "Acknowledgment",

    // CompGrid
    "grid.logic": "Логика работы",
    "grid.a11y": "Доступность",
    "grid.bestpractices": "Best Practices",
    "grid.notfound": "Ничего не найдено по запросу",

    // Systems Page
    "systems.title": "Библиотека систем",
    "systems.description": "Исследуйте ведущие дизайн-системы индустрии. Каждая из них предлагает уникальный подход к визуальному языку, компонентам и доступности.",
    "systems.gotodocs": "Перейти к документации",
    "systems.docs": "Документация",
    "systems.material.desc": "Последнее поколение открытой системы проектирования Google, ориентированное на персонализацию и адаптивность.",
    "systems.fluent.desc": "Набор UX-фреймворков для создания кроссплатформенных приложений, которые выглядят и работают согласованно в экосистеме Microsoft.",
    "systems.atlassian.desc": "Стандарты проектирования для создания эффективного опыта совместной работы в продуктах Atlassian (Jira, Confluence, Trello).",
    "systems.carbon.desc": "Открытая система проектирования IBM для продуктов и цифрового опыта. Построена на основе стандартов дизайна IBM.",
    "systems.polaris.desc": "Помогает создавать отличный опыт для миллионов продавцов, использующих Shopify каждый день.",
    "systems.ant.desc": "Корпоративная система проектирования для фоновых приложений, предоставляющая богатый набор компонентов React.",

    // Footer
    "footer.rights": "© 2026 UXLens Open Source Project",
    "footer.changelog": "Список измененений",
    "footer.privacy": "Политика конфедециальности",
    "footer.support": "Поддержка"
  },
  en: {
    // Header
    "nav.components": "Components",
    "nav.systems": "Systems",
    "nav.share": "Share",
    "nav.login": "Log In",

    // Hero
    "hero.title": "Compare UX Patterns of Giants.",
    "hero.subtitle": "of components",
    "hero.description": "A unified platform to analyze, compare and implement production-ready UI components from leading design systems. Make informed architectural decisions.",
    "hero.searchPlaceholder": "Search design system",

    // Filters
    "filters.component": "Component:",
    "filters.type": "Type:",
    "filters.state": "State:",
    "filters.button": "Button",
    "filters.input": "Input",
    "filters.switch": "Switch",
    "filters.select": "Select",
    "filters.datepicker": "Date Picker",
    "filters.modal": "Modal",
    "filters.radio": "Radio Button",
    "filters.tag": "Tag",

    "filters.state.default": "Default",
    "filters.state.hover": "Hover",
    "filters.state.focus": "Focus",
    "filters.state.disabled": "Disabled",
    "filters.state.error": "Error",
    "filters.state.open": "Open",
    "filters.state.loading": "Loading",

    "filters.button.primary": "Primary",
    "filters.button.secondary": "Secondary",
    "filters.button.tertiary": "Tertiary",
    "filters.button.destructive": "Destructive",
    "filters.button.icon": "Icon Button",
    
    "filters.modal.alert": "Alert Dialog",
    "filters.modal.transactional": "Transactional Modal",
    "filters.modal.acknowledgment": "Acknowledgment",

    // CompGrid
    "grid.logic": "Logic",
    "grid.a11y": "Accessibility",
    "grid.bestpractices": "Best Practices",
    "grid.notfound": "Nothing found for",

    // Systems Page
    "systems.title": "Systems Library",
    "systems.description": "Explore the industry's leading design systems. Each offers a unique approach to visual language, components, and accessibility.",
    "systems.gotodocs": "Go to documentation",
    "systems.docs": "Documentation",
    "systems.material.desc": "Google's latest open-source design system, focused on personalization and adaptability.",
    "systems.fluent.desc": "A set of UX frameworks for creating cross-platform apps that look and feel cohesive across the Microsoft ecosystem.",
    "systems.atlassian.desc": "Design standards for creating effective collaboration experiences in Atlassian products (Jira, Confluence, Trello).",
    "systems.carbon.desc": "IBM's open design system for products and digital experiences. Built on the foundation of IBM's design standards.",
    "systems.polaris.desc": "Helps create great experiences for millions of merchants who use Shopify every day.",
    "systems.ant.desc": "An enterprise-class design system for web applications, providing a rich set of React components.",

    // Footer
    "footer.rights": "© 2026 UXLens Open Source Project",
    "footer.changelog": "Changelog",
    "footer.privacy": "Privacy Policy",
    "footer.support": "Support"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
