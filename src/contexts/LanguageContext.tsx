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
    "nav.unlockPro": "Разблокировать Pro",
    "nav.proActive": "PRO Активен",

    // Hero
    "hero.title": "Сравнивайте UX-паттерны гигантов.",
    "hero.subtitle": "компонентов",
    "hero.description": "Единая платформа для анализа, сравнения и внедрения готовых UI-компонентов из ведущих дизайн-систем. Принимайте обоснованные архитектурные решения.",
    "hero.searchPlaceholder": "Поиск дизайн-системы",

    // Filters
    "filters.title": "Компоненты",
    "filters.subtitle": "Просматривайте и тестируйте элементы дизайн-системы",
    "filters.openDocs": "Открыть документацию",
    "filters.reset": "Сбросить фильтры",
    "filters.selectComponent": "Выберите компонент",
    "filters.searchComponents": "Поиск компонентов...",
    "filters.show": "Показать",
    "filters.noComponentsFound": "Компоненты не найдены",
    "filters.platform": "Платформа",
    "filters.platform.all": "Все",
    "filters.platform.web": "Web",
    "filters.platform.mobile": "Mobile",
    "filters.component": "Компонент",
    "filters.type": "Тип",
    "filters.state": "Состояние",
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
    "grid.bestpractices": "Лучшие практики",
    "grid.notfound": "Ничего не найдено по запросу",
    "grid.showComponent": "Показать компонент",
    "grid.resetSearch": "Сбросить поиск",
    "grid.copyJson": "Копировать JSON",
    "grid.tabUi": "UI",
    "grid.tabCode": "Код",
    "grid.tabTokens": "Токены",
    "grid.copyCode": "Копировать код",
    "grid.copied": "Скопировано в буфер!",
    "grid.copiedCode": "Код скопирован!",
    "grid.copiedTokens": "Токены скопированы!",
    "grid.inspect": "Инспектор",
    "grid.compareSideBySide": "Сравнить 1-на-1",
    "theme.toggle": "Переключить тему",
    "ai.advisor": "AI UX Советник",
    "ai.button": "Подобрать дизайн-систему",
    "ai.prompt": "Опишите ваш проект...",
    "grid.unlock": "Разблокировать Pro-паттерны",
    "grid.details": "Подробнее",
    "grid.hideDetails": "Скрыть",
    "grid.showAllDetails": "Показать детали всех систем",
    "grid.hideAllDetails": "Скрыть детали",

    // Hero stats
    "hero.stat": "8 компонентов × 8 дизайн-систем (Web & Mobile) — 64 разбора",

    // Context bar
    "context.view.showcase": "Витрина",
    "context.view.table": "Таблица",
    "context.systemsCount": "систем",
    "context.copied": "Ссылка скопирована",
    "context.copyLink": "Скопировать ссылку",

    // Compare table
    "table.property": "Свойство",
    "table.onlyDiffering": "Только различия",
    "table.identical": "Все системы совпадают",

    // Pro banner
    "pro.title": "Больше паттернов и Best Practices",
    "pro.description": "В Pro-версии — расширенные code-примеры, чек-листы доступности и экспорт токенов в Figma.",
    "pro.cta": "Разблокировать Pro",

    // Sidebar
    "sidebar.filters": "Фильтры",

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
    "systems.apple.desc": "Стандарты интерфейсов Apple, основанные на ясности, уважении к контенту и глубине взаимодействия на всех платформах Apple.",
    "systems.samsung.desc": "Дизайн-система Samsung для смартфонов Galaxy с фокусом на управление одной рукой и доступность ключевых зон экрана.",
    "systems.figma": "Figma Kit",
    "systems.platforms": "Платформы",
    "systems.platform.all": "Все платформы",
    "systems.platform.web": "Web",
    "systems.platform.mobile": "Mobile",

    // Live Playground
    "playground.title": "Live Playground",
    "playground.badge": "Тестирование в реальном времени",
    "playground.desc": "Проверьте поведение компонентов с вашим текстом и фирменным цветом бренда на всех 8 дизайн-системах",
    "playground.customText": "Текст компонента",
    "playground.customTextPlaceholder": "Введите произвольный текст (напр., 'Купить сейчас', 'Оформить заказ')...",
    "playground.brandColor": "Цвет бренда (HEX)",
    "playground.brandPresets": "Пресеты бренда",
    "playground.direction": "Направление",
    "playground.reset": "Сбросить настройки",
    "playground.activeOverrides": "активно",
    "playground.preset1": "Начать работу",
    "playground.preset2": "Оформить заказ ($49)",
    "playground.preset3": "Подтвердить перевод",
    "playground.presetLong": "Очень длинный текст для проверки обрезки и переполнения контейнера",
    "playground.proBadge": "PRO ФУНКЦИЯ",
    "playground.proActive": "PRO АКТИВЕН",
    "playground.lockedTitle": "Эксклюзивная функция UX Lens PRO",
    "playground.lockedDesc": "Тестируйте собственные тексты, фирменные Brand HEX цвета и RTL-верстку на всех 8 дизайн-системах одновременно.",
    "playground.unlockPro": "Перейти на PRO (7 дней бесплатно)",
    "playground.testDemo": "Быстрый тест (включить демо PRO)",
    "playground.demoActive": "Режим: PRO Демо",
    "playground.disableDemo": "Отключить демо",
    "proModal.badge": "ЭКСКЛЮЗИВ UX LENS PRO",
    "proModal.title": "Интерактивный Live Playground",
    "proModal.subtitle": "Тестируйте компоненты в реальном времени: меняйте текст, применяйте фирменный Brand HEX и проверяйте RTL во всех 8 дизайн-системах одновременно.",
    "proModal.price": "990 ₽ / месяц",
    "proModal.priceSub": "или $12 / mo • 7 дней бесплатно",
    "proModal.trialBadge": "7 дней trial",
    "proModal.interactiveTitle": "Живая демонстрация Live Playground:",
    "proModal.interactiveInputLabel": "Попробуйте ввести свой текст:",
    "proModal.interactiveColorLabel": "Выберите цвет бренда:",
    "proModal.sampleText": "Оформить подписку",
    "proModal.f1Title": "Фирменный Brand HEX",
    "proModal.f1Desc": "Мгновенное перекрашивание кнопок, свитчей, инпутов и тегов под цвет вашей компании",
    "proModal.f2Title": "Свой текст и копирайт",
    "proModal.f2Desc": "Проверяйте длину строк, переполнение контейнеров и микрокопирайт до написания кода",
    "proModal.f3Title": "RTL-зеркалирование",
    "proModal.f3Desc": "Тестирование интернационализации для арабского языка и иврита в 1 клик",
    "proModal.f4Title": "Экспорт Design Tokens",
    "proModal.f4Desc": "Выгрузка готовых CSS Variables, JSON и Tailwind конфигураций для команды",
    "proModal.cta": "Разблокировать Pro (7 дней бесплатно)",
    "proModal.quickDemo": "Быстрый тест (включить демо PRO)",
    "proModal.activated": "PRO доступ успешно активирован!",
    "proModal.close": "Закрыть",

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
    "nav.unlockPro": "Unlock Pro",
    "nav.proActive": "PRO Active",

    // Hero
    "hero.title": "Compare UX Patterns of Giants.",
    "hero.subtitle": "of components",
    "hero.description": "A unified platform to analyze, compare and implement production-ready UI components from leading design systems. Make informed architectural decisions.",
    "hero.searchPlaceholder": "Search design system",

    // Filters
    "filters.title": "Components",
    "filters.subtitle": "Browse and test design system elements",
    "filters.openDocs": "Open documentation",
    "filters.reset": "Reset filters",
    "filters.selectComponent": "Select Component",
    "filters.searchComponents": "Search components...",
    "filters.show": "Show",
    "filters.noComponentsFound": "No components found",
    "filters.platform": "Platform",
    "filters.platform.all": "All",
    "filters.platform.web": "Web",
    "filters.platform.mobile": "Mobile",
    "filters.component": "Component",
    "filters.type": "Type",
    "filters.state": "State",
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
    "grid.showComponent": "Show component",
    "grid.resetSearch": "Reset search",
    "grid.copyJson": "Copy JSON",
    "grid.tabUi": "UI",
    "grid.tabCode": "Code",
    "grid.tabTokens": "Tokens",
    "grid.copyCode": "Copy code",
    "grid.copied": "Copied to clipboard!",
    "grid.copiedCode": "Code copied!",
    "grid.copiedTokens": "Tokens copied!",
    "grid.inspect": "Inspect",
    "grid.compareSideBySide": "Compare 1v1",
    "theme.toggle": "Toggle theme",
    "ai.advisor": "AI UX Advisor",
    "ai.button": "Recommend Design System",
    "ai.prompt": "Describe your product...",
    "grid.unlock": "Unlock Pro patterns",
    "grid.details": "Details",
    "grid.hideDetails": "Hide",
    "grid.showAllDetails": "Show details for all systems",
    "grid.hideAllDetails": "Hide details",

    // Hero stats
    "hero.stat": "8 components × 8 design systems (Web & Mobile) — 64 breakdowns",

    // Context bar
    "context.view.showcase": "Showcase",
    "context.view.table": "Table",
    "context.systemsCount": "systems",
    "context.copied": "Link copied",
    "context.copyLink": "Copy link",

    // Compare table
    "table.property": "Property",
    "table.onlyDiffering": "Differences only",
    "table.identical": "All systems match",

    // Pro banner
    "pro.title": "More patterns and best practices",
    "pro.description": "Pro unlocks extended code samples, accessibility checklists, and token export to Figma.",
    "pro.cta": "Unlock Pro",

    // Sidebar
    "sidebar.filters": "Filters",

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
    "systems.apple.desc": "Apple's interface standards built on clarity, deference, and depth. Providing an intuitive and cohesive experience across all Apple platforms.",
    "systems.samsung.desc": "Samsung's interface system for Galaxy devices designed for seamless one-handed reachability and smooth visual hierarchy.",
    "systems.figma": "Figma Kit",
    "systems.platforms": "Platforms",
    "systems.platform.all": "All platforms",
    "systems.platform.web": "Web",
    "systems.platform.mobile": "Mobile",

    // Live Playground
    "playground.title": "Live Playground",
    "playground.badge": "Real-Time Sandbox",
    "playground.desc": "Test components with your custom text and brand accent color across all 8 design systems",
    "playground.customText": "Component Text",
    "playground.customTextPlaceholder": "Enter custom text (e.g. 'Get Started', 'Checkout $49')...",
    "playground.brandColor": "Brand Color (HEX)",
    "playground.brandPresets": "Brand Presets",
    "playground.direction": "Direction",
    "playground.reset": "Reset Overrides",
    "playground.activeOverrides": "active",
    "playground.preset1": "Get Started",
    "playground.preset2": "Checkout ($49)",
    "playground.preset3": "Confirm Transfer",
    "playground.presetLong": "Extremely long label to stress-test text truncation and container overflow",
    "playground.proBadge": "PRO FEATURE",
    "playground.proActive": "PRO ACTIVE",
    "playground.lockedTitle": "Exclusive UX Lens PRO Feature",
    "playground.lockedDesc": "Test custom copy, brand HEX accent colors, and RTL layout across all 8 design systems simultaneously.",
    "playground.unlockPro": "Upgrade to PRO (7 Days Free)",
    "playground.testDemo": "Quick Test (Enable PRO Demo)",
    "playground.demoActive": "Mode: PRO Demo",
    "playground.disableDemo": "Disable Demo",
    "proModal.badge": "UX LENS PRO EXCLUSIVE",
    "proModal.title": "Interactive Live Playground",
    "proModal.subtitle": "Test components in real time: change copy, apply your brand HEX, and verify RTL layouts across all 8 design systems simultaneously.",
    "proModal.price": "$12 / month",
    "proModal.priceSub": "Billed monthly • 7 days free trial",
    "proModal.trialBadge": "7-day trial",
    "proModal.interactiveTitle": "Interactive Live Playground Preview:",
    "proModal.interactiveInputLabel": "Try entering custom copy:",
    "proModal.interactiveColorLabel": "Pick a brand accent color:",
    "proModal.sampleText": "Start Free Trial",
    "proModal.f1Title": "Custom Brand HEX",
    "proModal.f1Desc": "Instant recoloring of buttons, switches, inputs, and tags to match your product's palette",
    "proModal.f2Title": "Custom Copy & Text",
    "proModal.f2Desc": "Verify string length, container overflow, and microcopy before writing any code",
    "proModal.f3Title": "RTL Layout Mirroring",
    "proModal.f3Desc": "One-click internationalization layout testing for Arabic and Hebrew",
    "proModal.f4Title": "Design Tokens Export",
    "proModal.f4Desc": "Export ready-to-use CSS Variables, JSON, and Tailwind configs for your engineering team",
    "proModal.cta": "Unlock Pro (7 Days Free)",
    "proModal.quickDemo": "Quick Test (Enable PRO Demo)",
    "proModal.activated": "PRO access successfully activated!",
    "proModal.close": "Close",

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

const STORAGE_KEY = 'uxlens.language';

function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'ru';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'en' || stored === 'ru' ? stored : 'ru';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  };

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
