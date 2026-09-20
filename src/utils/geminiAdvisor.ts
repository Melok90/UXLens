import { GoogleGenAI } from '@google/genai';

export interface AdvisorResult {
  primarySystem: string;
  matchScore: number;
  headline: string;
  rationale: string;
  componentStrategies: { component: string; recommendation: string }[];
  tokenGuidance: string;
  alternativeSystem: string;
  alternativeMatchScore: number;
  alternativeComparison: string;
  isAiGenerated?: boolean;
}

const STORAGE_KEY = 'uxlens_gemini_api_key';

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored.trim();
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (envKey) return envKey.trim();
  return '';
}

export function saveStoredApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  if (!key.trim()) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, key.trim());
  }
}

/**
 * Built-in domain heuristic advisor when no API key is set or on network failure.
 */
function getHeuristicRecommendation(prompt: string, lang: 'ru' | 'en'): AdvisorResult {
  const p = prompt.toLowerCase();

  // E-commerce / Shop / Retail / Marketplace
  if (p.includes('магазин') || p.includes('товар') || p.includes('e-commerce') || p.includes('ecommerce') || p.includes('шоп') || p.includes('маркет')) {
    return lang === 'ru'
      ? {
          primarySystem: 'Shopify Polaris',
          matchScore: 96,
          headline: 'Shopify Polaris — идеальная система для электронной коммерции и витрин товаров.',
          rationale: 'Polaris специально спроектирован для минимизации когнитивной нагрузки продавцов и покупателей. Радиус 8px, четкие поля ввода с суффиксами валют и деликатная контрастность предотвращают усталость при длительной работе с каталогом.',
          componentStrategies: [
            { component: 'Кнопки', recommendation: 'Используйте Primary кнопку цвета #008060 для целевого действия оформления заказа и вторичные Outline для фильтров.' },
            { component: 'Поля ввода', recommendation: 'Используйте Polaris Input с встроенными префиксами валют ($ / ₽) и четкой валидацией количества.' },
            { component: 'Теги', recommendation: 'Используйте бейджи тегов товаров для быстрой фильтрации категорий и артикулов.' },
          ],
          tokenGuidance: 'Применяйте токен p-color-bg-fill-brand (#008060) для главного CTA и p-border-radius-200 (8px) для всех карточек продуктов.',
          alternativeSystem: 'Ant Design',
          alternativeMatchScore: 84,
          alternativeComparison: 'Ant Design хорош для сложных складских таблиц, но уступает Polaris в эстетике витрин и теплоте коммерческого опыта.',
          isAiGenerated: false,
        }
      : {
          primarySystem: 'Shopify Polaris',
          matchScore: 96,
          headline: 'Shopify Polaris is the premier design system for e-commerce and retail experiences.',
          rationale: 'Polaris is engineered specifically for merchants and shoppers. Its 8px radius, currency-suffix input architecture, and accessible emerald palette reduce cognitive load during catalog navigation.',
          componentStrategies: [
            { component: 'Buttons', recommendation: 'Use Primary #008060 CTA for checkout and Outline buttons for facet filters.' },
            { component: 'Input Fields', recommendation: 'Leverage native prefix/suffix inputs for pricing and SKU tracking.' },
            { component: 'Tags', recommendation: 'Deploy removable category badges for fast product filtering.' },
          ],
          tokenGuidance: 'Leverage p-color-bg-fill-brand (#008060) and standard 8px border radius tokens across all product cards.',
          alternativeSystem: 'Ant Design',
          alternativeMatchScore: 84,
          alternativeComparison: 'Ant Design is great for dense warehouse tables but lacks Polaris merchant-first warmth.',
          isAiGenerated: false,
        };
  }

  // Cloud / DevOps / Infrastructure / Linux / Data Engineering
  if (p.includes('облак') || p.includes('devops') || p.includes('сервер') || p.includes('контейнер') || p.includes('логи') || p.includes('мониторинг') || p.includes('cloud') || p.includes('инфраструктур')) {
    return lang === 'ru'
      ? {
          primarySystem: 'IBM Carbon',
          matchScore: 97,
          headline: 'IBM Carbon — бескомпромиссный выбор для сложных Cloud и DevOps консолей.',
          rationale: 'Carbon создан для визуализации терабайтов метрик, логов серверов и сетевых топологий. Строгая геометрия 0px, соответствие WCAG AAA 7.1:1 и 8-пиксельный ритм исключают случайные ошибки оператора.',
          componentStrategies: [
            { component: 'Переключатели', recommendation: 'Используйте текстовые метки On/Off рядом с тумблером для исключения двусмысленности в продакшене.' },
            { component: 'Таблицы и Селекты', recommendation: 'Применяйте числовые счетчики «5 выбрано» вместо тяжелых чипсов.' },
            { component: 'Модальные окна', recommendation: 'Используйте полноразмерные кнопки действий в футере 50/50.' },
          ],
          tokenGuidance: 'Используйте токен highlight (#0F62FE), темную палитру Gray 90 / Gray 100 и строгие углы 0px.',
          alternativeSystem: 'Atlassian',
          alternativeMatchScore: 82,
          alternativeComparison: 'Atlassian удобен для задач, но Carbon превосходит его в высокой контрастности и плотности логов.',
          isAiGenerated: false,
        }
      : {
          primarySystem: 'IBM Carbon',
          matchScore: 97,
          headline: 'IBM Carbon is the gold standard for Cloud, DevOps, and Infrastructure consoles.',
          rationale: 'Carbon is built for mission-critical monitoring, server logs, and dense telemetry. Its zero-radius geometry and WCAG AAA 7.1:1 contrast prevent operational errors.',
          componentStrategies: [
            { component: 'Switches', recommendation: 'Always pair switches with explicit On/Off labels to avoid ambiguity.' },
            { component: 'Multi-select', recommendation: 'Use numeric counter badges to prevent layout shifts in tabular views.' },
            { component: 'Modals', recommendation: 'Adopt full-bleed 50/50 split buttons in the dialog footer.' },
          ],
          tokenGuidance: 'Standardize on #0F62FE brand color, Gray 90/100 dark backgrounds, and 0px corner tokens.',
          alternativeSystem: 'Atlassian',
          alternativeMatchScore: 82,
          alternativeComparison: 'Atlassian handles tasks well, but Carbon excels in extreme data density and contrast.',
          isAiGenerated: false,
        };
  }

  // Mobile Consumer App / iOS / Lifestyle / Social
  if (p.includes('ios') || p.includes('apple') || p.includes('айфон') || p.includes('мобильн') || p.includes('mobile') || p.includes('приложен') || p.includes('соцсет') || p.includes('медиа')) {
    return lang === 'ru'
      ? {
          primarySystem: 'Apple HIG',
          matchScore: 95,
          headline: 'Apple Human Interface Guidelines — лучший выбор для мобильных приложений с фокусом на контенте.',
          rationale: 'Apple HIG фокусируется на физике взаимодействия: сквирклы 12px, адаптивное размытие Vibrancy и пружинные анимации создают ощущение нативности и премиального качества.',
          componentStrategies: [
            { component: 'Кнопки', recommendation: 'Высота 44pt с деликатным scale(0.96) при нажатии и мягким скруглением.' },
            { component: 'Переключатели', recommendation: 'Зеленый системный тумблер SystemGreen (#34C759) с пружинным откликом.' },
            { component: 'Модальные окна', recommendation: 'Алерты со стеклянным размытием и тонкими 0.5px разделителями действий.' },
          ],
          tokenGuidance: 'Используйте SF Pro типографику (17px Body), системные тинты #0071E3 и непрерывные скругления углов.',
          alternativeSystem: 'Material Design 3',
          alternativeMatchScore: 88,
          alternativeComparison: 'Material 3 хорош для Android и кроссплатформенных Flutter-проектов, но Apple HIG обеспечивает идеальную нативность на iOS.',
          isAiGenerated: false,
        }
      : {
          primarySystem: 'Apple HIG',
          matchScore: 95,
          headline: 'Apple Human Interface Guidelines is the supreme choice for content-first mobile products.',
          rationale: 'Apple HIG prioritizes physical micro-interactions: continuous 12px squircles, liquid glass vibrancy, and spring animations delivering a refined, native iOS feel.',
          componentStrategies: [
            { component: 'Buttons', recommendation: '44pt touch-target height with fluid scale(0.96) press physics.' },
            { component: 'Switches', recommendation: 'Signature SystemGreen (#34C759) toggle with spring rebound.' },
            { component: 'Dialogs', recommendation: 'Frosted glass vibrancy alerts with 0.5px hairline button dividers.' },
          ],
          tokenGuidance: 'Adopt SF Pro typography (17px Body), SystemBlue #0071E3, and dynamic continuous corner radii.',
          alternativeSystem: 'Material Design 3',
          alternativeMatchScore: 88,
          alternativeComparison: 'Material 3 is great for cross-platform Android/Flutter, but Apple HIG is unmatched for iOS aesthetics.',
          isAiGenerated: false,
        };
  }

  // Enterprise B2B / Office / Windows / CRM
  if (p.includes('b2b') || p.includes('crm') || p.includes('офис') || p.includes('таблиц') || p.includes('office') || p.includes('windows') || p.includes('документ') || p.includes('корпоративн')) {
    return lang === 'ru'
      ? {
          primarySystem: 'Fluent UI',
          matchScore: 94,
          headline: 'Microsoft Fluent UI — лидер для высоконагруженных корпоративных систем и B2B CRM.',
          rationale: 'Fluent UI оптимизирован для компактных десктопных рабочих сред (Office 365, Teams). Стандартная высота контролов 32px и четкий радиус 4px позволяют размещать до 40% больше информации на одном экране.',
          componentStrategies: [
            { component: 'Кнопки', recommendation: 'Компактная высота 32px с плоскими hover-эффектами без тяжелых теней.' },
            { component: 'Поля ввода', recommendation: 'Тонкая обводка с синим 2px индикатором активного фокуса.' },
            { component: 'Календарь', recommendation: 'Outlook-подобная сетка с квадратными ячейками 28×28px.' },
          ],
          tokenGuidance: 'Базовый цвет colorBrandBackground (#0078D4) и радиус borderRadiusMedium (4px).',
          alternativeSystem: 'Atlassian',
          alternativeMatchScore: 86,
          alternativeComparison: 'Atlassian отлично подходит для совместной работы в проектных командах, тогда как Fluent непревзойден в табличных CRM.',
          isAiGenerated: false,
        }
      : {
          primarySystem: 'Fluent UI',
          matchScore: 94,
          headline: 'Microsoft Fluent UI is the benchmark for enterprise B2B CRM and productivity workspaces.',
          rationale: 'Fluent UI is tuned for information-dense desktop interfaces (Office, Teams). 32px default control height and tidy 4px radius present up to 40% more operational data without clutter.',
          componentStrategies: [
            { component: 'Buttons', recommendation: 'Crisp 32px height with flat hover states avoiding unnecessary shadows.' },
            { component: 'Inputs', recommendation: 'Clean outline with high-visibility 2px bottom accent focus stroke.' },
            { component: 'DatePickers', recommendation: 'Outlook-style compact grid with 28×28px calendar cells.' },
          ],
          tokenGuidance: 'Standardize on colorBrandBackground (#0078D4) and 4px borderRadiusMedium tokens.',
          alternativeSystem: 'Atlassian',
          alternativeMatchScore: 86,
          alternativeComparison: 'Atlassian excels in agile workflows, whereas Fluent is optimized for spreadsheet-like tools.',
          isAiGenerated: false,
        };
  }

  // Default: Material Design 3 (Adaptive universal system)
  return lang === 'ru'
    ? {
        primarySystem: 'Material Design 3',
        matchScore: 92,
        headline: 'Google Material Design 3 — наиболее универсальная и адаптивная дизайн-система.',
        rationale: 'M3 идеально масштабируется от мобильных экранов до широких планшетов и веб-приложений. Динамическая тональная палитра Material You и крупные области касания 48dp гарантируют доступность для всех пользователей.',
        componentStrategies: [
          { component: 'Кнопки', recommendation: 'Форма полной капсулы (full pill) с мягким ripple-откликом.' },
          { component: 'Поля ввода', recommendation: 'Filled-стиль с анимированной плавающей меткой для понятного контекста ввода.' },
          { component: 'Диалоги', recommendation: 'Выразительный радиус 28px с затемнением scrim.' },
        ],
        tokenGuidance: 'Используйте токены md.sys.color.primary (#1447E6) и md.sys.shape.corner.full (9999px).',
        alternativeSystem: 'Fluent UI',
        alternativeMatchScore: 85,
        alternativeComparison: 'Fluent более компактен на экранах десктопа, но Material 3 превосходит его на смартфонах и в веб-приложениях.',
        isAiGenerated: false,
      }
    : {
        primarySystem: 'Material Design 3',
        matchScore: 92,
        headline: 'Google Material Design 3 is the most versatile, responsive universal system.',
        rationale: 'M3 scales effortlessly from mobile smartphones to web dashboards. Material You dynamic tonal palettes and generous 48dp touch targets provide maximum accessibility.',
        componentStrategies: [
          { component: 'Buttons', recommendation: 'Full-pill rounded capsule with subtle ripple feedback.' },
          { component: 'Inputs', recommendation: 'Filled input styling with animated floating labels.' },
          { component: 'Dialogs', recommendation: 'Expressive 28px corners with scrim backdrop blur.' },
        ],
        tokenGuidance: 'Deploy md.sys.color.primary (#1447E6) and md.sys.shape.corner.full (9999px).',
        alternativeSystem: 'Fluent UI',
        alternativeMatchScore: 85,
        alternativeComparison: 'Fluent offers higher density for desktop tools, while Material 3 excels on mobile touch devices.',
        isAiGenerated: false,
      };
}

/**
 * Generates recommendation using Google Gemini API if key exists, or falls back to heuristic engine.
 */
export async function getDesignSystemRecommendation(
  prompt: string,
  lang: 'ru' | 'en' = 'ru'
): Promise<AdvisorResult> {
  const apiKey = getStoredApiKey();

  if (!apiKey) {
    // Artificial small delay to make UX feel deliberate and thoughtful
    await new Promise((res) => setTimeout(res, 600));
    return getHeuristicRecommendation(prompt, lang);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are a Principal Design Systems Architect at UXLens.
Analyze the user's project requirements and recommend the best-suited design system among:
1. "Apple HIG" (Apple Human Interface Guidelines)
2. "Material Design 3" (Google)
3. "Fluent UI" (Microsoft)
4. "Atlassian" (Atlassian Design System)
5. "IBM Carbon" (IBM Carbon Design System)
6. "Shopify Polaris" (Shopify Polaris)
7. "Ant Design" (Ant Group)

Respond ONLY in valid JSON matching this schema:
{
  "primarySystem": "exact name from the 7 above",
  "matchScore": number between 85 and 99,
  "headline": "punchy 1-sentence summary in ${lang === 'ru' ? 'Russian' : 'English'}",
  "rationale": "detailed architectural rationale in ${lang === 'ru' ? 'Russian' : 'English'}",
  "componentStrategies": [
    {"component": "Buttons / Кнопки", "recommendation": "specific advice"},
    {"component": "Inputs / Поля ввода", "recommendation": "specific advice"},
    {"component": "Navigation / Навигация", "recommendation": "specific advice"}
  ],
  "tokenGuidance": "tokens advice in ${lang === 'ru' ? 'Russian' : 'English'}",
  "alternativeSystem": "runner up system name",
  "alternativeMatchScore": number,
  "alternativeComparison": "comparison with runner up in ${lang === 'ru' ? 'Russian' : 'English'}"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser project description:\n"${prompt}"` }] },
      ],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    const cleaned = text.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
    const parsed = JSON.parse(cleaned);

    return {
      primarySystem: parsed.primarySystem || 'Material Design 3',
      matchScore: parsed.matchScore || 95,
      headline: parsed.headline || 'Рекомендация дизайн-системы',
      rationale: parsed.rationale || '',
      componentStrategies: parsed.componentStrategies || [],
      tokenGuidance: parsed.tokenGuidance || '',
      alternativeSystem: parsed.alternativeSystem || 'Fluent UI',
      alternativeMatchScore: parsed.alternativeMatchScore || 85,
      alternativeComparison: parsed.alternativeComparison || '',
      isAiGenerated: true,
    };
  } catch (err) {
    console.warn('Gemini API call failed or rate-limited, falling back to heuristic engine:', err);
    return getHeuristicRecommendation(prompt, lang);
  }
}
