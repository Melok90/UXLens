import React, { ReactNode, useEffect, useState } from 'react';
import { Search, ChevronDown, Check, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import ComparisonCard from './ComparisonCard';
import { ComponentState, ComponentType, ComponentVariant } from '../App';

import { getDesignTokens } from '../utils/tokens';

function getInputStateClasses(
  state: string,
  base: string,
  hover: string,
  active: string,
  focus: string,
  disabled: string,
  error: string
) {
  let classes = base;
  if (state === 'hover') classes += ' ' + hover;
  if (state === 'active') classes += ' ' + active;
  if (state === 'focus') classes += ' ' + focus;
  if (state === 'disabled') classes += ' ' + disabled;
  if (state === 'loading') classes += ' !opacity-80 !cursor-wait';
  if (state === 'error') classes += ' ' + error;
  return classes;
}

interface CardData {
  title: string;
  icon: ReactNode;
  previewType: 'button' | 'code';
  previewContent?: ReactNode;
  codeContent?: string;
  logicTitle: string;
  logicDescription: string;
  accessibilityText: string;
  bestPractices: string[];
}

import { useLanguage } from '../contexts/LanguageContext';

const translations = {
  "Основная логика": "Logic",
  "Доступность": "Accessibility",
  "Best Practices": "Best Practices",
  "Основное действие": "Primary Action",
  "Метка": "Label",
  "Введите текст": "Enter text",
  "Ничего не найдено по запросу": "Nothing found for",
  "Попробуйте изменить параметры поиска или фильтры": "Try changing search terms or filters",
  "Используется стандартная высота 40px с полностью скругленными углами. Элевация применяется для обозначения состояния интерактивности.": "Standard 40px height with fully rounded corners. Elevation indicates interactive state.",
  "Требуется минимальный контраст 4.5:1. Область касания должна быть не менее 48x48dp.": "Minimum 4.5:1 contrast required. Touch target should be at least 48x48dp.",
  "Используйте одну основную кнопку на экран.": "Use one main primary button per screen.",
  "Всегда дополняйте понятным текстом.": "Always accompany with clear text.",
  "Избегайте длинных меток.": "Avoid long labels.",
  "Тонкое скругление (радиус 4px) с акцентным на плоские цвета и отчетливые состояния при наведении вместо теней.": "Subtle rounding (4px radius) focusing on flat colors and distinct hover states instead of shadows.",
  "Индикатор фокуса отрисовывается снаружи кнопки для сохранения целостности внутренних отступов.": "Focus indicator is drawn outside the button to preserve internal padding.",
  "Текст должен быть коротким и призывать к действию.": "Text should be short and call to action.",
  "Выравнивание по правому краю в диалогах.": "Right-align in dialogs.",
  "Используйте второстепенные кнопки для менее важных задач.": "Use secondary buttons for less critical tasks.",
  "Компактная высота по умолчанию (32px), адаптированная для информационно-плотных интерфейсов. Радиус 3px.": "Compact default height (32px) tailored for information-dense interfaces. 3px radius.",
  "Состояния загрузки заменяют текст спиннером для сохранения размеров кнопки.": "Loading states replace text with a spinner to preserve button dimensions.",
  "Группируйте связанные кнопки.": "Group related buttons.",
  "Основная кнопка — для подтверждения.": "Primary button is for confirmation.",
  "Избегайте длинных текстовых строк.": "Avoid long text strings.",
  "Строгое соблюдение радиуса 2px для профессионального, строгого вида. Фокус на высокой эффективности и четкой иерархии.": "Strict adherence to 2px radius for a professional, austere look. Focused on high efficiency and clear hierarchy.",
  "Соответствует рекомендациям W3C с высококонтрастными цветовыми парами по умолчанию.": "Meets W3C guidelines with high-contrast color pairs by default.",
  "Всегда добавляйте иконку для ясности.": "Always add an icon for clarity.",
  "Используйте ghost-кнопки для вторичных действий.": "Use ghost buttons for secondary actions.",
  "Соблюдайте единый вертикальный ритм.": "Maintain consistent vertical rhythm.",
  "Мягкий радиус 8px, разработанный для формирования доверия и ясности в коммерческой среде.": "Soft 8px radius designed to build trust and clarity in commerce environments.",
  "Обеспечивает четкие состояния фокуса для пользователей, использующих только клавиатуру.": "Provides distinct focus states for keyboard-only users.",
  "Избегайте избыточного использования основных кнопок.": "Avoid overusing primary buttons.",
  "Называйте кнопки четкими глаголами действия.": "Label buttons with clear action verbs.",
  "Используйте критические кнопки with осторожностью.": "Use critical buttons with caution.",
  "Оптимизировано для корпоративных приложений с радиусом 6px. Фокус на ясности и визуальном отклике.": "Optimized for enterprise applications with a 6px radius. Focus on clarity and visual feedback.",
  "Динамические эффекты наведения и активации улучшают обратную связь для пользователя.": "Dynamic hover and active effects improve user feedback.",
  "Используйте единый корпоративный стиль.": "Use a unified corporate style.",
  "Для вторичных действий используйте default type.": "Use default type for secondary actions.",
  "Группируйте связанные действия.": "Group related actions.",
  "Filled-вариант": "Filled variant",
  "Использует заливку фона с акцентной нижней границей. Текст метки перемещается вверх при фокусе.": "Uses background fill with an accent bottom border. Label text moves up on focus.",
  "Минимальная контрастность текста 4.5:1. Поддержка Screen Reader для озвучивания ошибок.": "Minimum text contrast 4.5:1. Screen Reader support for announcing errors.",
  "Используйте вспомогательный текст для подсказок.": "Use helper text for hints.",
  "Группируйте связанные поля.": "Group related fields.",
  "Показывайте ошибки в реальном времени.": "Show errors in real-time.",
  "Outline-стиль": "Outline style",
  "Тонкая рамка 1px с небольшим скруглением. В состоянии фокуса рамка становится толще.": "Thin 1px border with slight rounding. Border thickens on focus.",
  "Индикатор фокуса должен соответствовать системным настройкам контрастности.": "Focus indicator should match system contrast settings.",
  "Избегайте плейсхолдеров вместо меток.": "Avoid placeholders instead of labels.",
  "Соблюдайте отступы между полями ввода.": "Maintain spacing between input fields.",
  "Используйте подходящие типы ввода.": "Use appropriate input types.",
  "Грей-фон": "Gray background",
  "По умолчанию фон серый без границ. При фокусе фон меняется на белый и появляется обводка.": "Gray background by default. On focus, background becomes white and a border appears.",
  "Свяжите метку с полем через ID для корректной работы скринридеров.": "Link label to field via ID for correct screen reader functionality.",
  "Не скрывайте метку.": "Do not hide the label.",
  "Используйте короткие сообщения об ошибках.": "Use short error messages.",
  "Выделяйте обязательные поля.": "Highlight required fields.",
  "Индустриальный вид": "Industrial look",
  "Отсутствие скруглений, серый фон и четкая нижняя граница.": "No rounding, gray background, and a sharp bottom border.",
  "Высокий контраст и четкая индикация ошибок.": "High contrast and clear error indication.",
  "Используйте одинаковые отступы.": "Use uniform spacing.",
  "Всегда указывайте метку.": "Always provide a label.",
  "Избегайте лишних декораций.": "Avoid unnecessary decorations.",
  "Дружелюбный радиус": "Friendly radius",
  "Крупные скругления (12px) и мягкие тени создают ощущение надежности.": "Large rounding (12px) and soft shadows create a sense of reliability.",
  "Оптимизировано для сенсорных экранов и клавиатурного ввода.": "Optimized for touch screens and keyboard input.",
  "Используйте глаголы в метках действий.": "Use verbs in action labels.",
  "Будьте лаконичны в сообщениях.": "Be concise in messages.",
  "Соблюдайте иерархию.": "Maintain hierarchy.",
  "Корпоративный баланс": "Corporate balance",
  "Классический сбалансированный дизайн с радиусом 6px.": "Classic balanced design with 6px radius.",
  "Визуальный отклик через смену теней и границ.": "Visual feedback through changing shadows and borders.",
  "Используйте префиксы для контекста.": "Use prefixes for context.",
  "Выделяйте фокус цветом.": "Highlight focus with color.",
  "Высокий трек (32px) with заметным ползунком. В активном состоянии ползунок может содержать иконку галочки.": "Tall track (32px) with a prominent thumb. Active state may contain a check icon.",
  "Минимальный размер 48x48dp для области нажатия.": "Minimum 48x48dp touch target.",
  "Используйте для мгновенных настроек.": "Use for instant settings.",
  "Всегда сопровождайте меткой.": "Always accompany with a label.",
  "Не используйте вместо чекбоксов в формах.": "Do not use instead of checkboxes in forms.",
  "Более тонкий и компактный вид. Четкие состояния без лишних теней.": "Thinner and more compact look. Clear states without excessive shadows.",
  "Обеспечьте текстовый эквивалент состояния (Вкл/Выкл).": "Provide text equivalent for state (On/Off).",
  "Располагайте метку справа или сверху.": "Place label on the right or top.",
  "Используйте для бинарных опций.": "Use for binary options.",
  "Избегайте неоднозначности.": "Avoid ambiguity.",
  "Минималистичный дизайн, ползунок почти заполняет высоту трека.": "Minimalist design, thumb almost fills the height of the track.",
  "Поддержка клавиатурного управления (Space/Enter).": "Keyboard support (Space/Enter).",
  "Используйте в настройках профиля.": "Use in profile settings.",
  "Не используйте для действий, требующих подтверждения.": "Do not use for actions requiring confirmation.",
  "Группируйте связанные переключатели.": "Group related switches.",
  "Использует зеленый цвет для активного состояния по умолчанию. Строгие формы.": "Uses green for default active state. Strict shapes.",
  "Четкая визуальная граница между треком и ползунком.": "Clear visual boundary between track and thumb.",
  "Добавляйте текст 'On'/'Off'.": "Add 'On'/'Off' text.",
  "Соблюдайте иерархию Carbon.": "Follow Carbon hierarchy.",
  "Используйте для системных настроек.": "Use for system settings.",
  "Мягкие формы, акцент на доступности в контексте e-commerce.": "Soft shapes, focus on accessibility in e-commerce context.",
  "Высокий контраст активного состояния.": "High contrast active state.",
  "Используйте для управления функциями магазина.": "Use for managing store features.",
  "Понятно описывайте последствия переключения.": "Clearly describe the consequences of toggling.",
  "Избегайте перегрузки интерфейса.": "Avoid UI overload.",
  "Компактный и функциональный. Поддерживает текст или иконки внутри трека.": "Compact and functional. Supports text or icons inside the track.",
  "Анимация перемещения ползунка для визуального подтверждения.": "Thumb movement animation for visual confirmation.",
  "Используйте в таблицах и списках.": "Use in tables and lists.",
  "Может содержать иконки check/close.": "May contain check/close icons.",
  "Стандартизируйте размер (small/default).": "Standardize size (small/default).",
  "...еще 5": "...5 more",
  "Поиск в 500+ элементах...": "Search 500+ items...",
  "Выбор": "Selection",
  "Multi-select с чипсами": "Multi-select with chips",
  "M3 использует 'Assist Chips' внутри поля. При большом количестве элементов (500+) рекомендуется виртуализация списка и встроенный поиск.": "M3 uses 'Assist Chips' inside the field. For large numbers (>500), list virtualization and built-in search are recommended.",
  "Роль listbox и aria-multiselectable. Каждое изменение озвучивается через aria-live.": "Listbox role and aria-multiselectable. Every change is announced via aria-live.",
  "Используйте чипсы для удаления.": "Use chips for removal.",
  "Добавляйте поиск при списках > 10 элементов.": "Add search for lists > 10 items.",
  "Группируйте элементы по категориям.": "Group items by category.",
  "Выбор 1, Выбор 2, Выбор 3...": "Option 1, Option 2, Option 3...",
  "Выберите системы": "Select systems",
  "Список с запятыми": "Comma-separated list",
  "В Fluent UI multi-select часто отображает выбранное текстом через запятую. Большие списки управляются через комбобокс с фильтрацией.": "Fluent UI multi-select often displays selection as comma-separated text. Large lists use a combobox with filtering.",
  "Поддержка High Contrast mode. Фокус на чекбоксы внутри выпадающего меню.": "High Contrast mode support. Focus on checkboxes inside the dropdown menu.",
  "Текстовое отображение экономит место.": "Text display saves space.",
  "Используйте 'Select All' для больших наборов.": "Use 'Select All' for large sets.",
  "Обеспечьте визуальное разделение групп.": "Ensure visual separation of groups.",
  "Atlassian фокусируется на 'Select2'-подобном поведении: теги (lozenge) внутри поля. Для 500+ элементов используется пагинация (Async Select).": "Atlassian focuses on 'Select2'-like behavior: tags (lozenge) inside the field. For 500+ items, pagination is used (Async Select).",
  "Анонсирование количества найденных результатов при поиске.": "Announcing the number of results found during search.",
  "Используйте Async для внешних данных.": "Use Async for external data.",
  "Не перегружайте поле более чем 5-7 тегами.": "Do not overload the field with more than 5-7 tags.",
  "Добавляйте аватары если список - это люди.": "Add avatars if the list represents people.",
  "3 выбрано": "3 selected",
  "Выбор элементов": "Select items",
  "Счетчик и чекбоксы": "Counter and checkboxes",
  "Carbon часто использует числовой счетчик в поле вместо перечисления всех тегов. Меню содержит чекбоксы для мульти-выбора.": "Carbon often uses a numeric counter in the field instead of listing all tags. Menu contains checkboxes for multi-select.",
  "Клавиатурная навигация стрелками. Esc закрывает меню без потери выбора.": "Arrow key navigation. Esc closes the menu without losing selection.",
  "Счетчик идеален для мобильных версий.": "Counter is ideal for mobile versions.",
  "Используйте 'Clear all' внутри меню.": "Use 'Clear all' inside the menu.",
  "Соблюдайте строгую сетку IBM.": "Maintain strict IBM grid.",
  "Поиск товаров...": "Search products...",
  "Поиск": "Search",
  "Polaris использует теги с 'X' для явного удаления. Большие списки обрабатываются через Autocomplete с фильтрацией на лету.": "Polaris uses tags with 'X' for explicit removal. Large lists are handled via Autocomplete with on-the-fly filtering.",
  "Голосовой помощник уведомляет о добавлении/удалении тега.": "Voice assistant notifies of tag addition/removal.",
  "Теги должны быть контрастными.": "Tags should be high-contrast.",
  "Используйте поиск как основной режим ввода.": "Use search as primary input mode.",
  "Группируйте результаты по типу данных.": "Group results by data type.",
  "Ant Design имеет мощный режим 'responsive', который скрывает лишние теги под счетчик '+N'. Идеально для списков любой длины.": "Ant Design has a powerful 'responsive' mode that hides extra tags under a '+N' counter. Ideal for lists of any length.",
  "Сложные сценарии фокуса: переключение между полем поиска и списком.": "Complex focus scenarios: switching between search field and list.",
  "Используйте 'maxTagCount' для чистоты.": "Use 'maxTagCount' for cleanliness.",
  "Включайте поиск по умолчанию для списков.": "Enable search by default for lists.",
  "Подсвечивайте совпадения в результатах.": "Highlight matches in results.",
  "мая 2026": "May 2026",
  "Май 2026": "May 2026",
  "Дата": "Date",
  "Календарь (Dialog/Modal)": "Calendar (Dialog/Modal)",
  "M3 предпочитает модальные окна для выбора даты на мобильных и выпадающие списки (popovers) на десктопах. Высокий акцент на 'Selection State'.": "M3 prefers modals for date selection on mobile and popovers on desktop. High emphasis on 'Selection State'.",
  "Полная поддержка клавиатуры (стрелки для навигации по дням).": "Full keyboard support (arrows to navigate days).",
  "Используйте модальный режим для мобильных.": "Use modal mode for mobile.",
  "Выделяйте текущую дату.": "Highlight the current date.",
  "Показывайте сокращенные дни недели.": "Show abbreviated weekdays.",
  "Периоды и сетка": "Periods and grid",
  "Fluent UI отлично справляется с выбором периодов. Сетка строгая, без лишних теней, с четким выделением диапазона (Range Selection).": "Fluent UI excels at period selection. Strict grid without extra shadows, with clear Range Selection highlighting.",
  "Анонсирование выбранного диапазона через aria-live.": "Announcing selected range via aria-live.",
  "Используйте два календаря для выбора больших периодов.": "Use two calendars for selecting large periods.",
  "Позволяйте вводить дату вручную.": "Allow manual date entry.",
  "Добавляйте быстрые пресеты (Сегодня, Неделя).": "Add quick presets (Today, Week).",
  "Atlassian использует компактные календари с фокусом на контент. Дизайн лоялен к плотному расположению элементов в Jira/Confluence.": "Atlassian uses compact calendars focused on content. Design favors dense layouts in Jira/Confluence.",
  "Роль grid для календаря, описание текущего дня.": "Role grid for calendar, description of current day.",
  "Не загромождайте календарь лишними иконками.": "Don't clutter the calendar with unnecessary icons.",
  "Используйте Locales для локализации дат.": "Use Locales for date localization.",
  "Добавляйте возможность очистки (Clear button).": "Add a clear option (Clear button).",
  "Четкость и сетка": "Clarity and grid",
  "Carbon делает упор на табличные данные. Календарь часто имеет фиксированную ширину и строгую сетку с границами 1px.": "Carbon focuses on tabular data. Calendar often has fixed width and a strict grid with 1px borders.",
  "Соблюдение параметров контрастности IBM для всех состояний.": "Adherence to IBM contrast guidelines for all states.",
  "Используйте формат даты, принятый в организации.": "Use the organization's standard date format.",
  "Добавляйте иконку календаря всегда.": "Always add a calendar icon.",
  "Поддерживайте ручной ввод в формате ISO.": "Support manual ISO format entry.",
  "Polaris использует мягкие формы и понятное выделение. Акцент на быстром выборе для управления заказами.": "Polaris uses soft shapes and clear highlighting. Focus on quick selection for managing orders.",
  "Описание даты словами (например, 'Monday, May 18').": "Date description in words (e.g., 'Monday, May 18').",
  "Используйте для отчетных периодов.": "Use for reporting periods.",
  "Добавляйте 'Year picker' при необходимости.": "Add 'Year picker' when necessary.",
  "Соблюдайте отступы Polaris.": "Maintain Polaris spacing.",
  "Мощный выбор": "Powerful selection",
  "Один из самых мощных DatePicker: поддерживает выбор недель, месяцев, кварталов и лет. Очень высокая плотность информации.": "One of the most powerful DatePickers: supports selecting weeks, months, quarters, and years. Very high information density.",
  "Сложные сценарии фокуса: переключение между заголовком и сеткой.": "Complex focus scenarios: switching between header and grid.",
  "Используйте 'RangePicker' для выбора периодов.": "Use 'RangePicker' for period selection.",
  "Настраивайте форматы отображения.": "Customize display formats.",
  "Включайте 'showTime' если нужно время.": "Include 'showTime' if time is needed.",
  "Новый проект": "New project",
  "Название проекта": "Project name",
  "Отмена": "Cancel",
  "Создать": "Create",
  "Обновление завершено": "Update complete",
  "Ваша система успешно обновлена до последней версии.": "Your system has been successfully updated to the latest version.",
  "Понятно": "Got it",
  "Удалить данные?": "Delete data?",
  "Это действие нельзя отменить. Вы уверены, что хотите продолжить?": "This action cannot be undone. Are you sure you want to continue?",
  "Удалить": "Delete",
  "Кнопки действий (Primary и Secondary) выровнены по правому краю. В деструктивных действиях кнопка удаления часто окрашивается в цвет ошибки, но остается Ghost-кнопкой (Text Button).": "Action buttons (Primary & Secondary) are right-aligned. In destructive actions, the delete button is often styled as an error color Ghost/Text button.",
  "Жесткий фокус-треп (focus trap). Закрытие по клику на фон (backdrop click) обычно недоступно для Alert Dialogs (предотвращает случайное закрытие).": "Strict focus trap. Backdrop click closing is typically disabled for Alert Dialogs to prevent accidental closure.",
  "Не скрывайте фон (backdrop) без необходимости.": "Do not hide the backdrop unnecessarily.",
  "Используйте глаголы действия в кнопках.": "Use action verbs in buttons.",
  "Критичные диалоги не должны закрываться по клику вне области.": "Critical dialogs should not close on outside click.",
  "Настройки доступа": "Access settings",
  "Только чтение": "Read-only",
  "Редактирование": "Editing",
  "Сохранить": "Save",
  "Настройки сохранены": "Settings saved",
  "Все изменения были успешно применены к вашему профилю.": "All changes have been successfully applied to your profile.",
  "ОК": "OK",
  "Удалить файл?": "Delete file?",
  "Действительно удалить этот файл навсегда?": "Are you sure you want to permanently delete this file?",
  "Основное действие часто располагается первым (выравнивание по правому краю, кнопка Confirm слева от Cancel или наоборот, в зависимости от платформы). Fluent часто делает акцент на Primary action.": "Primary action is often placed first (right-aligned, Confirm button left of Cancel or vice-versa depending on platform). Fluent emphasizes Primary action.",
  "Специальный trap фокуса. Escape key закрывает некритичные окна, но для Confirm/Delete может требовать явного действия.": "Special focus trap. Escape key closes non-critical windows, but Confirm/Delete may require explicit action.",
  "Primary action должно быть самым заметным.": "Primary action should be the most prominent.",
  "Используйте короткие и понятные заголовки.": "Use short and clear titles.",
  "Задавайте четкий фокус при открытии.": "Set clear focus upon opening.",
  "Создать задачу": "Create task",
  "Краткое описание": "Short description",
  "Успешно опубликовано": "Successfully published",
  "Ваша страница теперь доступна всем пользователям рабочего пространства.": "Your page is now available to all workspace users.",
  "Закрыть": "Close",
  "Удалить репозиторий?": "Delete repository?",
  "Безвозвратное удаление. Все данные будут потеряны.": "Permanent deletion. All data will be lost.",
  "Деструктивное диалоговое окно": "Destructive dialog",
  "Предупреждающая иконка слева от заголовка. Кнопка отмены слева, удаления справа (Primary Right). Цвета строго передают суть действия.": "Warning icon next to title. Cancel left, Delete right. Colors strictly convey urgency.",
  "Атрибут role='alertdialog'. Закрытие по клику на фон (blanket) по умолчанию для Alert запрещено.": "role='alertdialog'. Blanket click close is disabled by default for alerts.",
  "Не используйте диалоги для длинных форм.": "Do not use dialogs for long forms.",
  "Четко объясните последствия перед удалением.": "Clearly explain consequences before deletion.",
  "Сохраняйте кнопки действий по правому краю.": "Keep action buttons right-aligned.",
  "Новый ресурс": "New resource",
  "Имя ресурса": "Resource name",
  "Введите имя": "Enter name",
  "Добавить": "Add",
  "Сервис добавлен": "Service added",
  "Сервис аналитики успешно подключен к вашему аккаунту и готов к использованию.": "Analytics service successfully connected to your account and ready to use.",
  "Удаление сервиса": "Service deletion",
  "Вы точно хотите удалить этот сервис? Это повлияет на зависимые базы данных.": "Are you sure you want to delete this service? This will affect dependent databases.",
  "Четкая сетка и 50% Actions": "Clear grid and 50% Actions",
  "Использует полную ширину для кнопок в нижней части окна. В Carbon кнопки действий занимают по 50% ширины, Primary всегда справа. Деструктивный модал имеет красную рамку или цвет.": "Uses full width for bottom buttons. In Carbon, actions take up 50% width, Primary on the right. Destructive modals inherit red outlines/hues.",
  "Автоматически ловит фокус (Focus trap active).": "Automatically traps focus (Focus trap active).",
  "Кнопки на 100% ширины в мобильной версии.": "100% width buttons on mobile version.",
  "Отмена всегда Primary-Secondary структура.": "Cancel always uses Primary-Secondary structure.",
  "Всегда требуйте подтверждения удалений.": "Always require confirmation for deletions.",
  "Добавить теги": "Add tags",
  "Например, 'летняя_коллекция'": "e.g., 'summer_collection'",
  "Экспорт запущен": "Export started",
  "Удалить товар?": "Delete product?",
  "Кофейник": "Coffee pot",
  "Секционная структура": "Sectional structure",
  "Разделен на четкие секции: заголовок, контент и футер. Primary кнопка всегда выровнена вправо. Действие удаления выделено критическим цветом.": "Divided into clear sections: header, content, footer. Primary button always right-aligned. Delete action highlighted with critical color.",
  "Управление фокусом гарантирует, что пользователь не взаимодействует с фоном. Закрытие по фону отключено в Destructive Modal.": "Focus management ensures user doesn't interact with background. Background close disabled in destructive models.",
  "Уточните, что именно удаляется в тексте.": "Clarify exactly what is being deleted in text.",
  "Четкое разграничение подвала (футера).": "Clear footer boundary.",
  "Отправить приглашение": "Send invite",
  "Email адрес": "Email address",
  "Отправить": "Send",
  "Операция успешна": "Operation successful",
  "Все настройки были применены.": "All settings have been applied.",
  "Удалить эту задачу?": "Delete this task?",
  "Некоторые данные могут быть утеряны навсегда.": "Some data may be permanently lost.",
  "Быстрые диалоги Modal.confirm": "Quick dialogs Modal.confirm",
  "Часто используется функция подтверждения с иконкой вопроса или предупреждения. Кнопки находятся справа, OK (или Удалить) — primary aктивная.": "Often used for confirmation with an icon. Buttons are on the right, OK (or Delete) is primary active.",
  "Анти-scrolling на body. Backdrop click можно конфигурировать (маскировка). В destructive - часто maskClosable: false.": "Anti-scrolling on body. Backdrop click configurable. Destructive often uses maskClosable: false.",
  "Используйте Modal.confirm для быстрых действий.": "Use Modal.confirm for quick actions.",
  "Для кастомных сложных форм используйте компонент Modal.": "Use the Modal component for custom advanced forms.",
  "У диалогов предупреждения всегда должна быть иконка.": "Warning dialogs should always have an icon."
};

function renderButton(system: string, variant: ComponentVariant, state: ComponentState, tText: (key: string) => string) {
  const isLoading = state === 'loading';
  const isDisabled = state === 'disabled' || isLoading;
  
  const content = isLoading ? (
    <div className={`flex items-center justify-center ${variant === 'icon' ? '' : 'gap-2'}`}>
      <svg className={`animate-spin ${variant === 'icon' ? 'h-5 w-5' : 'h-4 w-4'}`} viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      {variant !== 'icon' && tText('Основное действие')}
    </div>
  ) : variant === 'icon' ? (
    <Search size={18} />
  ) : tText('Основное действие');

  let base = "";
  let hover = "";
  let active = "";
  let focus = "";
  let disabled = "";

  if (system === "Material Design 3") {
    // defaults
    base = "font-medium text-sm rounded-full transition-all cursor-pointer outline-none flex items-center justify-center ";
    base += variant === 'icon' ? "w-10 h-10 p-0 shadow-none  " : "px-6 py-3  ";
    disabled = "!opacity-50 !cursor-not-allowed !bg-black/10 !text-black/40 !shadow-none";
    focus = "!ring-2 !ring-accent-blue !ring-offset-2";
    
    if (variant === 'primary' || variant === 'default' || variant === 'icon') {
      base += "bg-accent-blue text-white shadow-md ";
      hover = "!shadow-lg !brightness-110";
      active = "!scale-95";
    } else if (variant === 'secondary') {
      base += "border border-gray-400 text-accent-blue hover:bg-accent-blue/10 ";
      hover = "!bg-accent-blue/10";
      active = "!bg-accent-blue/20";
    } else if (variant === 'tertiary') {
      base += "text-accent-blue hover:bg-accent-blue/10 ";
      hover = "!bg-accent-blue/10";
      active = "!bg-accent-blue/20";
    } else if (variant === 'destructive') {
      base += "bg-[#B3261E] text-white shadow-md ";
      hover = "!shadow-lg !brightness-110";
      active = "!scale-95";
      focus = "!ring-2 !ring-[#B3261E] !ring-offset-2";
    }
  } else if (system === "Fluent UI") {
    base = "font-medium text-sm rounded-sm transition-all cursor-pointer flex items-center justify-center ";
    base += variant === 'icon' ? "w-8 h-8 p-0 " : "px-4 py-2 ";
    disabled = "!opacity-50 !cursor-not-allowed !bg-gray-400 !border-none !text-white !shadow-none";
    focus = "!outline !outline-2 !outline-[#0078D4] !outline-offset-1";

    if (variant === 'primary' || variant === 'default') {
      base += "bg-[#0078D4] text-white ";
      hover = "!brightness-125";
      active = "!bg-[#005a9e]";
    } else if (variant === 'secondary') {
      base += "border border-[#8a8886] text-[#323130] hover:bg-[#f3f2f1] ";
      hover = "!bg-[#f3f2f1]";
      active = "!bg-[#edebe9]";
      focus = "!outline !outline-2 !outline-black !outline-offset-1";
    } else if (variant === 'tertiary') {
      base += "text-[#0078D4] hover:bg-[#f3f2f1] ";
      hover = "!bg-[#f3f2f1]";
      active = "!bg-[#edebe9]";
    } else if (variant === 'destructive') {
      base += "bg-[#A4262C] text-white ";
      hover = "!brightness-125";
      active = "!bg-[#811E22]";
      focus = "!outline !outline-2 !outline-[#A4262C] !outline-offset-1";
    } else if (variant === 'icon') {
      base += "text-[#323130] hover:bg-[#f3f2f1] ";
      hover = "!bg-[#f3f2f1]";
      active = "!bg-[#edebe9]";
    }
  } else if (system === "Atlassian") {
    base = "font-medium text-sm rounded shadow-sm transition-all cursor-pointer flex items-center justify-center ";
    base += variant === 'icon' ? "w-8 h-8 p-0 object-center " : "px-5 py-2 ";
    disabled = "!opacity-50 !cursor-not-allowed !bg-[#ebecf0] !text-[#a5adba] !border-none !shadow-none";
    focus = "!ring-2 !ring-[#4C90FF]";

    if (variant === 'primary' || variant === 'default') {
      base += "bg-[#0052CC] text-white ";
      hover = "!bg-[#0065FF]";
      active = "!bg-[#0747A6]";
    } else if (variant === 'secondary') {
      base += "bg-[#091e420f] text-[#42526e] hover:bg-[#091e4214] ";
      hover = "!bg-[#091e4214]";
      active = "!bg-[#091e4224]";
    } else if (variant === 'tertiary') {
      base += "text-[#0052CC] hover:bg-[#0052CC]/10 ";
      hover = "!bg-[#0052CC]/10";
      active = "!bg-[#0052CC]/20";
    } else if (variant === 'destructive') {
      base += "bg-[#DE350B] text-white ";
      hover = "!bg-[#FF5630]";
      active = "!bg-[#BF2600]";
    } else if (variant === 'icon') {
      base += "text-[#42526e] hover:bg-[#091e4214] ";
      hover = "!bg-[#091e4214]";
      active = "!bg-[#091e4224]";
    }
  } else if (system === "IBM Carbon") {
    base = "font-medium text-sm rounded-none transition-all cursor-pointer flex items-center justify-center ";
    base += variant === 'icon' ? "w-12 h-12 p-0 " : "px-6 py-3 ";
    disabled = "!opacity-50 !cursor-not-allowed !bg-[#c6c6c6] !text-white !shadow-none";
    focus = "!outline !outline-2 !outline-[#0f62fe] !outline-offset-2";

    if (variant === 'primary' || variant === 'default') {
      base += "bg-[#0f62fe] text-white ";
      hover = "!bg-[#0353e9]";
      active = "!bg-[#002d9c]";
    } else if (variant === 'secondary') {
      base += "bg-[#393939] text-white hover:bg-[#4c4c4c] ";
      hover = "!bg-[#4c4c4c]";
      active = "!bg-[#6f6f6f]";
    } else if (variant === 'tertiary') {
      base += "text-[#0f62fe] hover:bg-[#e5e5e5] ";
      hover = "!bg-[#e5e5e5]";
      active = "!bg-[#c6c6c6]";
    } else if (variant === 'destructive') {
      base += "bg-[#da1e28] text-white ";
      hover = "!bg-[#ba1b23]";
      active = "!bg-[#750e13]";
    } else if (variant === 'icon') {
      base += "bg-white text-[#161616] hover:bg-[#e5e5e5] ";
      hover = "!bg-[#e5e5e5]";
      active = "!bg-[#c6c6c6]";
    }
  } else if (system === "Shopify Polaris") {
    base = "font-medium text-sm rounded-lg transition-all cursor-pointer flex items-center justify-center border shadow-sm ";
    base += variant === 'icon' ? "w-9 h-9 p-0 " : "px-6 py-2 ";
    disabled = "!opacity-50 !cursor-not-allowed !bg-gray-100 !border-gray-200 !text-gray-500 !shadow-none";
    focus = "!ring-2 !ring-[#008060] !ring-offset-2";

    if (variant === 'primary' || variant === 'default') {
      base += "bg-[#008060] border-transparent text-white ";
      hover = "!bg-[#006e52]";
      active = "!bg-[#005e46]";
    } else if (variant === 'secondary') {
      base += "bg-white border-[#c9cccf] text-[#202223] hover:bg-[#f6f6f7] ";
      hover = "!bg-[#f6f6f7]";
      active = "!bg-[#f1f2f3]";
    } else if (variant === 'tertiary') {
      base += "border-transparent text-[#202223] hover:bg-[#f6f6f7] shadow-none ";
      hover = "!bg-[#f6f6f7]";
      active = "!bg-[#f1f2f3]";
    } else if (variant === 'destructive') {
      base += "bg-[#E32929] border-transparent text-white ";
      hover = "!bg-[#bf1f1f]";
      active = "!bg-[#8f1717]";
    } else if (variant === 'icon') {
      base += "border-transparent text-[#202223] hover:bg-[#f6f6f7] shadow-none ";
      hover = "!bg-[#f6f6f7]";
      active = "!bg-[#f1f2f3]";
    }
  } else if (system === "Ant Design") {
    base = "font-medium text-sm rounded-md transition-all shadow-sm cursor-pointer flex items-center justify-center ";
    base += variant === 'icon' ? "w-8 h-8 p-0 " : "px-6 py-2 ";
    disabled = "!opacity-50 !cursor-not-allowed !bg-gray-200 !text-[#00000040] !border-gray-300 !shadow-none";
    focus = "!ring-4 !ring-[#1677ff]/30";

    if (variant === 'primary' || variant === 'default') {
      base += "bg-[#1677ff] border border-transparent text-white ";
      hover = "!bg-[#4096ff]";
      active = "!bg-[#0958d9]";
    } else if (variant === 'secondary') {
      base += "bg-white border border-[#d9d9d9] text-[#000000e0] hover:text-[#4096ff] hover:border-[#4096ff] ";
      hover = "!text-[#4096ff] !border-[#4096ff]";
      active = "!text-[#0958d9] !border-[#0958d9]";
    } else if (variant === 'tertiary') {
      base += "text-[#1677ff] hover:bg-[#0000000a] shadow-none ";
      hover = "!bg-[#0000000a]";
      active = "!bg-[#00000014]";
    } else if (variant === 'destructive') {
      base += "bg-[#ff4d4f] border border-transparent text-white ";
      hover = "!bg-[#ff7875]";
      active = "!bg-[#d9363e]";
      focus = "!ring-4 !ring-[#ff4d4f]/30";
    } else if (variant === 'icon') {
      base += "bg-white border border-[#d9d9d9] text-[#000000e0] hover:text-[#4096ff] hover:border-[#4096ff] ";
      hover = "!text-[#4096ff] !border-[#4096ff]";
      active = "!text-[#0958d9] !border-[#0958d9]";
    }
  }

  return (
    <button className={getInputStateClasses(state, base, hover, active, focus, disabled, "")} disabled={isDisabled}>
      {content}
    </button>
  );
}

function renderRadio(system: string, state: ComponentState, tText: (key: string) => string) {
  let outerBase = "relative w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all outline-none ";
  let outerHover = "";
  let outerActive = "";
  let outerFocus = "";
  let outerDisabled = "";
  let outerError = "";

  let innerBase = "w-2.5 h-2.5 rounded-full transition-all ";
  
  if (system === "Material Design 3") {
    outerBase += "border-accent-blue ";
    outerHover = "!after:content-[''] !after:absolute !after:w-10 !after:h-10 !after:bg-accent-blue/10 !after:rounded-full";
    outerFocus = "!after:content-[''] !after:absolute !after:w-10 !after:h-10 !after:bg-accent-blue/10 !after:rounded-full";
    outerDisabled = "!border-black/30 !opacity-50 !cursor-not-allowed";
    outerError = "!border-[#B3261E] !after:bg-[#B3261E]/10";
    
    innerBase += "bg-accent-blue scale-100 ";
  } else if (system === "Fluent UI") {
    outerBase = "w-5 h-5 rounded-full border flex items-center justify-center transition-all outline-none ";
    outerBase += "border-[#0078D4] ";
    outerHover = "!border-[#005a9e]";
    outerFocus = "!outline !outline-2 !outline-[#0078D4] !outline-offset-1";
    outerDisabled = "!border-gray-400 !bg-gray-100 !opacity-50 !cursor-not-allowed";
    outerError = "!border-[#A4262C]";
    
    innerBase = "w-2.5 h-2.5 rounded-full transition-all ";
    innerBase += "bg-[#0078D4] scale-100 ";
  } else if (system === "Atlassian") {
    outerBase = "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all outline-none bg-white ";
    outerBase += "border-[#0052CC] ";
    outerHover = "!border-[#0065FF] !bg-[#0052CC]/10";
    outerFocus = "!ring-2 !ring-[#4C90FF]";
    outerDisabled = "!border-[#ebecf0] !bg-[#f4f5f7] !opacity-50 !cursor-not-allowed";
    outerError = "!border-[#DE350B]";
    
    innerBase = "w-1.5 h-1.5 rounded-full transition-all ";
    innerBase += "bg-[#0052CC] scale-100 ";
  } else if (system === "IBM Carbon") {
    outerBase = "w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-all outline-none ";
    outerBase += "border-[#0f62fe] ";
    outerHover = "!border-[#0353e9]";
    outerFocus = "!outline !outline-2 !outline-[#0f62fe] !outline-offset-1";
    outerDisabled = "!border-[#c6c6c6] !opacity-50 !cursor-not-allowed";
    outerError = "!border-[#da1e28]";
    
    innerBase = "w-2 h-2 rounded-full transition-all ";
    innerBase += "bg-[#0f62fe] scale-100 ";
  } else if (system === "Shopify Polaris") {
    outerBase = "w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all outline-none shadow-sm bg-white ";
    outerBase += "border-[#008060] ";
    outerHover = "!border-[#006e52]";
    outerFocus = "!ring-2 !ring-[#008060] !ring-offset-1";
    outerDisabled = "!border-gray-300 !bg-gray-100 !opacity-50 !cursor-not-allowed";
    outerError = "!border-[#E32929] !bg-[#fff4f4]";
    
    innerBase = "w-2 h-2 rounded-full transition-all ";
    innerBase += "bg-[#008060] scale-100 ";
  } else if (system === "Ant Design") {
    outerBase = "w-4 h-4 rounded-full border flex items-center justify-center transition-all outline-none bg-white relative ";
    outerBase += "border-[#1677ff] ";
    outerHover = "!border-[#4096ff]";
    outerFocus = "!ring-2 !ring-[#1677ff]/20";
    outerDisabled = "!border-gray-300 !bg-gray-100 !opacity-50 !cursor-not-allowed";
    outerError = "!border-[#ff4d4f]";
    
    innerBase = "w-2 h-2 rounded-full transition-all ";
    innerBase += "bg-[#1677ff] scale-100 ";
  }

  const isErrorState = state === 'error';
  // If error, override innerBase bg to red
  if (isErrorState && system === 'Material Design 3') {
     innerBase = innerBase.replace('bg-accent-blue', 'bg-[#B3261E]');
  } else if (isErrorState && system === 'Fluent UI') {
     innerBase = innerBase.replace('bg-[#0078D4]', 'bg-[#A4262C]');
  } else if (isErrorState && system === 'Atlassian') {
     innerBase = innerBase.replace('bg-[#0052CC]', 'bg-[#DE350B]');
  } else if (isErrorState && system === 'IBM Carbon') {
     innerBase = innerBase.replace('bg-[#0f62fe]', 'bg-[#da1e28]');
  } else if (isErrorState && system === 'Shopify Polaris') {
     innerBase = innerBase.replace('bg-[#008060]', 'bg-[#E32929]');
  } else if (isErrorState && system === 'Ant Design') {
     innerBase = innerBase.replace('bg-[#1677ff]', 'bg-[#ff4d4f]');
  }

  return (
    <div className="flex items-center gap-3">
      <div className={getInputStateClasses(state, outerBase, outerHover, outerActive, outerFocus, outerDisabled, outerError)}>
        <div className={innerBase}></div>
      </div>
      <span className={`text-sm ${state === 'disabled' ? 'opacity-50' : 'text-[#1d1b20]'}`}>
        {tText('Выбрано')}
      </span>
    </div>
  );
}

function renderTag(system: string, state: ComponentState, tText: (key: string) => string) {
  let base = "inline-flex items-center gap-1.5 transition-all ";
  let hover = "";
  let active = "";
  let focus = "";
  let disabled = "";
  
  if (system === "Material Design 3") {
    /* Chips */
    base += "h-8 px-3 rounded-lg border border-[#79747E] text-[#1D1B20] text-sm font-medium ";
    hover = "!bg-[#1D1B20]/10";
    focus = "!bg-[#1D1B20]/10 !ring-2 !ring-accent-blue !ring-offset-1";
    disabled = "!opacity-38 !cursor-not-allowed !border-[#1D1B20]/12 !text-[#1D1B20]/38";
  } else if (system === "Fluent UI") {
    /* Tags */
    base += "h-6 px-2.5 rounded text-xs font-medium bg-[#f3f2f1] text-[#323130] ";
    hover = "!bg-[#e1dfdd]";
    focus = "!outline !outline-2 !outline-offset-1 !outline-[#0078D4]";
    disabled = "!bg-[#f3f2f1] !text-[#a19f9d] !opacity-50 !cursor-not-allowed";
  } else if (system === "Atlassian") {
    /* Lozenges */
    base += "h-5 px-1.5 rounded text-xs font-bold uppercase tracking-wide bg-[#DFE1E6] text-[#42526E] ";
    hover = "!bg-[#C1C7D0]";
    focus = "!ring-2 !ring-[#4C90FF]";
    disabled = "!bg-[#EBECF0] !text-[#A5ADBA] !opacity-50 !cursor-not-allowed";
  } else if (system === "IBM Carbon") {
    base += "h-6 px-2 rounded-full text-xs bg-[#e0e0e0] text-[#161616] ";
    hover = "!bg-[#c6c6c6]";
    focus = "!outline !outline-2 !outline-[#0f62fe] !outline-offset-1";
    disabled = "!opacity-50 !cursor-not-allowed !bg-[#f4f4f4] !text-[#c6c6c6]";
  } else if (system === "Shopify Polaris") {
    base += "h-[22px] px-2 rounded-md text-xs font-medium bg-[#e4e5e7] text-[#202223] ";
    hover = "!bg-[#c9cccf]";
    focus = "!ring-2 !ring-[#008060] !ring-offset-1";
    disabled = "!opacity-50 !cursor-not-allowed";
  } else if (system === "Ant Design") {
    base += "h-[22px] px-2 rounded-[2px] text-xs leading-[20px] border border-[#d9d9d9] bg-[#fafafa] text-[#000000D9] ";
    hover = "!opacity-80";
    focus = "!ring-2 !ring-[#1677ff]/20";
    disabled = "!opacity-50 !cursor-not-allowed !bg-gray-100 !text-gray-400";
  }

  return (
    <div className={getInputStateClasses(state, base, hover, active, focus, disabled, "")}>
      <span className="w-2 h-2 rounded-full bg-current opacity-70"></span>
      {tText('Новый')}
    </div>
  );
}

import { useStore } from '../store/useStore';

export default function ComparisonGrid() {
  const activeComponent = useStore(state => state.activeComponent);
  const activeState = useStore(state => state.activeState);
  const activeVariant = useStore(state => state.activeVariant);
  const searchQuery = useStore(state => state.searchQuery);
  const { t, language } = useLanguage();
  const tText = (ruText: string) => language === 'en' ? (translations[ruText as keyof typeof translations] || ruText) : ruText;
  const [selectedDay, setSelectedDay] = useState<number>(18);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [rangeStart, setRangeStart] = useState<number>(17);
  const [rangeEnd, setRangeEnd] = useState<number>(24);
  const [openSystem, setOpenSystem] = useState<string | null>(null);

  useEffect(() => {
    const handleClick = () => setOpenSystem(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Close open system when clicking elsewhere
  const handleToggle = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSystem(openSystem === title ? null : title);
  };

  // SVG Logos for Design Systems
  const logos = {
    material: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 2L2 19.74h20L12 2z" fill="#4285F4" />
        <circle cx="12" cy="14" r="4" fill="#EA4335" />
        <rect x="9" y="10" width="6" height="6" fill="#FBBC05" />
      </svg>
    ),
    fluent: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <rect x="2" y="2" width="9" height="9" fill="#F25022" />
        <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
        <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
        <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
      </svg>
    ),
    atlassian: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0052CC">
        <path d="M22.5 12c0-5.8-4.7-10.5-10.5-10.5S1.5 6.2 1.5 12 6.2 22.5 12 22.5 22.5 17.8 22.5 12zm-12.7 5.2l-2.1-4.2 2.1-4.2h4.2l2.1 4.2-2.1 4.2h-4.2z" />
      </svg>
    ),
    carbon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0F62FE">
        <path d="M20 12c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-14 0c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z" />
        <rect x="10" y="8" width="4" height="2" />
        <rect x="10" y="11" width="4" height="2" />
        <rect x="10" y="14" width="4" height="2" />
      </svg>
    ),
    polaris: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#008060">
        <path d="M19 6h-2c0-2.8-2.2-5-5-5S7 3.2 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.7 0 3 1.3 3 3H9c0-1.7 1.3-3 3-3zm7 17H5V8h2v2c0 .6.4 1 1 1s1-.4 1-1V8h6v2c0 .6.4 1 1 1s1-.4 1-1V8h2v12z" />
      </svg>
    ),
    ant: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 2l10 5.8v11.5L12 22 2 19.3V7.8L12 2zm0 3.5L5.5 8.7v6.6l6.5 3.3 6.5-3.3V8.7L12 5.5z" fill="#1677FF" />
        <path d="M12 8l4 2.3v4.6L12 17l-4-2.3v-4.6L12 8z" fill="#FF4D4F" />
      </svg>
    )
  };

  const buttonCards: CardData[] = [
    {
      title: "Material Design 3",
      icon: logos.material,
      previewType: "button",
      previewContent: renderButton("Material Design 3", activeVariant, activeState, tText),
      codeContent: `<Button variant="${activeVariant === 'secondary' ? 'outlined' : activeVariant === 'tertiary' || activeVariant === 'icon' ? 'text' : 'filled'}"${activeVariant === 'destructive' ? ' color="error"' : ''}${activeState === 'disabled' ? ' disabled' : ''}${activeState === 'loading' ? ' loading' : ''}>${activeVariant === 'icon' ? '\n  <SearchIcon />\n' : tText("Основное действие")}</Button>`,
      logicTitle: "Основная логика",
      logicDescription: "Используется стандартная высота 40px с полностью скругленными углами. Элевация применяется для обозначения состояния интерактивности.",
      accessibilityText: "Требуется минимальный контраст 4.5:1. Область касания должна быть не менее 48x48dp.",
      bestPractices: [
        "Используйте одну основную кнопку на экран.",
        "Всегда дополняйте понятным текстом.",
        "Избегайте длинных меток."
      ]
    },
    {
      title: "Fluent UI",
      icon: logos.fluent,
      previewType: "button",
      previewContent: renderButton("Fluent UI", activeVariant, activeState, tText),
      codeContent: `<Button appearance="${activeVariant === 'secondary' ? 'outline' : activeVariant === 'tertiary' || activeVariant === 'icon' ? 'transparent' : 'primary'}"${activeState === 'disabled' ? ' disabled' : ''}${activeState === 'loading' ? ' icon={<Spinner />}' : ''}>${activeVariant === 'icon' ? '\n  <SearchIcon />\n' : tText("Основное действие")}</Button>`,
      logicTitle: "Основная логика",
      logicDescription: "Тонкое скругление (радиус 4px) с акцентным на плоские цвета и отчетливые состояния при наведении вместо теней.",
      accessibilityText: "Индикатор фокуса отрисовывается снаружи кнопки для сохранения целостности внутренних отступов.",
      bestPractices: [
        "Текст должен быть коротким и призывать к действию.",
        "Выравнивание по правому краю в диалогах.",
        "Используйте второстепенные кнопки для менее важных задач."
      ]
    },
    {
      title: "Atlassian",
      icon: logos.atlassian,
      previewType: "button",
      previewContent: renderButton("Atlassian", activeVariant, activeState, tText),
      codeContent: `<Button appearance="${activeVariant === 'secondary' ? 'default' : activeVariant === 'tertiary' || activeVariant === 'icon' ? 'subtle' : activeVariant === 'destructive' ? 'danger' : 'primary'}"${activeState === 'disabled' ? ' isDisabled' : ''}${activeState === 'loading' ? ' isLoading' : ''}${activeVariant === 'icon' ? ' spacing="none"' : ''}>${activeVariant === 'icon' ? '\n  <SearchIcon />\n' : tText("Основное действие")}</Button>`,
      logicTitle: "Основная логика",
      logicDescription: "Компактная высота по умолчанию (32px), адаптированная для информационно-плотных интерфейсов. Радиус 3px.",
      accessibilityText: "Состояния загрузки заменяют текст спиннером для сохранения размеров кнопки.",
      bestPractices: [
        "Группируйте связанные кнопки.",
        "Основная кнопка — для подтверждения.",
        "Избегайте длинных текстовых строк."
      ]
    },
    {
      title: "IBM Carbon",
      icon: logos.carbon,
      previewType: "button",
      previewContent: renderButton("IBM Carbon", activeVariant, activeState, tText),
      codeContent: `<Button kind="${activeVariant === 'secondary' ? 'secondary' : activeVariant === 'tertiary' ? 'tertiary' : activeVariant === 'destructive' ? 'danger' : activeVariant === 'icon' ? 'ghost' : 'primary'}"${activeState === 'disabled' ? ' disabled' : ''}${activeVariant === 'icon' ? ' renderIcon={Search}' : ''}${activeVariant === 'icon' ? ' hasIconOnly iconDescription="Search"' : ''}>${activeVariant === 'icon' ? '' : tText("Основное действие")}</Button>`,
      logicTitle: "Основная логика",
      logicDescription: "Строгое соблюдение радиуса 2px для профессионального, строгого вида. Фокус на высокой эффективности и четкой иерархии.",
      accessibilityText: "Соответствует рекомендациям W3C с высококонтрастными цветовыми парами по умолчанию.",
      bestPractices: [
        "Всегда добавляйте иконку для ясности.",
        "Используйте ghost-кнопки для вторичных действий.",
        "Соблюдайте единый вертикальный ритм."
      ]
    },
    {
      title: "Shopify Polaris",
      icon: logos.polaris,
      previewType: "button",
      previewContent: renderButton("Shopify Polaris", activeVariant, activeState, tText),
      codeContent: `<Button variant="${activeVariant === 'primary' || activeVariant === 'default' ? 'primary' : activeVariant === 'secondary' ? 'monochromeOutline' : 'plain'}"${activeVariant === 'destructive' ? ' tone="critical"' : ''}${activeState === 'disabled' ? ' disabled' : ''}${activeState === 'loading' ? ' loading' : ''}${activeVariant === 'icon' ? ' icon={SearchIcon}' : ''}>${activeVariant === 'icon' ? '' : tText("Основное действие")}</Button>`,
      logicTitle: "Основная логика",
      logicDescription: "Мягкий радиус 8px, разработанный для формирования доверия и ясности в коммерческой среде.",
      accessibilityText: "Обеспечивает четкие состояния фокуса для пользователей, использующих только клавиатуру.",
      bestPractices: [
        "Избегайте избыточного использования основных кнопок.",
        "Называйте кнопки четкими глаголами действия.",
        "Используйте критические кнопки with осторожностью."
      ]
    },
    {
      title: "Ant Design",
      icon: logos.ant,
      previewType: "button",
      previewContent: renderButton("Ant Design", activeVariant, activeState, tText),
      codeContent: `<Button type="${activeVariant === 'secondary' ? 'default' : activeVariant === 'tertiary' || activeVariant === 'icon' ? 'text' : 'primary'}"${activeVariant === 'destructive' ? ' danger' : ''}${activeState === 'disabled' ? ' disabled' : ''}${activeState === 'loading' ? ' loading' : ''}${activeVariant === 'icon' ? ' icon={<SearchOutlined />}' : ''}>${activeVariant === 'icon' ? '' : tText("Основное действие")}</Button>`,
      logicTitle: "Основная логика",
      logicDescription: "Оптимизировано для корпоративных приложений с радиусом 6px. Фокус на ясности и визуальном отклике.",
      accessibilityText: "Динамические эффекты наведения и активации улучшают обратную связь для пользователя.",
      bestPractices: [
        "Используйте единый корпоративный стиль.",
        "Для вторичных действий используйте default type.",
        "Группируйте связанные действия."
      ]
    }
  ];

  const inputCards: CardData[] = [
    {
      title: "Material Design 3",
      icon: logos.material,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] flex flex-col gap-1 text-left group">
          <div className={getInputStateClasses(activeState, "px-4 py-3 rounded-t-[4px] transition-all border-b border-[#49454F] bg-[#E7E0EC]", "bg-[#EBE4EF] border-[#1D1B20]", "", "bg-[#E7E0EC] border-[#6750A4] border-b-2", "opacity-50 border-[#1D1B20]/12 bg-[#E7E0EC] cursor-not-allowed", "border-[#B3261E] bg-[var(--md-sys-color-error-container)]")}>
            <span className="text-[12px] block transition-colors text-[#49454F] group-focus-within:text-[#6750A4]">Метка</span>
            <input className="bg-transparent border-none outline-none w-full text-[#1D1B20] placeholder:text-[#49454F]" defaultValue="Введите текст" disabled={activeState === "disabled"} />
          </div>
        </div>
      ),
      codeContent: `<TextField label="Метка" variant="filled" />`,
      logicTitle: "Filled-вариант",
      logicDescription: "Использует заливку фона с акцентной нижней границей. Текст метки перемещается вверх при фокусе.",
      accessibilityText: "Минимальная контрастность текста 4.5:1. Поддержка Screen Reader для озвучивания ошибок.",
      bestPractices: [
        "Используйте вспомогательный текст для подсказок.",
        "Группируйте связанные поля.",
        "Показывайте ошибки в реальном времени."
      ]
    },
    {
      title: "Fluent UI",
      icon: logos.fluent,
      previewType: "button",
      previewContent: (
        <div className="relative w-full max-w-[240px] text-left">
          <input 
            className="w-full px-3 py-1.5 rounded-[2px] outline-none transition-all border border-[#605E5C] hover:border-[#323130] focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4]"
            defaultValue="Введите текст"
          />
        </div>
      ),
      codeContent: `<Input placeholder={tText('Введите текст')} />`,
      logicTitle: "Outline-стиль",
      logicDescription: "Тонкая рамка 1px с небольшим скруглением. В состоянии фокуса рамка становится толще.",
      accessibilityText: "Индикатор фокуса должен соответствовать системным настройкам контрастности.",
      bestPractices: [
        "Избегайте плейсхолдеров вместо меток.",
        "Соблюдайте отступы между полями ввода.",
        "Используйте подходящие типы ввода."
      ]
    },
    {
      title: "Atlassian",
      icon: logos.atlassian,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <input className={getInputStateClasses(activeState, "w-full px-3 py-2 rounded-[3px] transition-all outline-none bg-[#F4F5F7] border-2 border-transparent", "bg-[#EBECF0]", "", "bg-white border-[#4C90FF]", "opacity-50 cursor-not-allowed bg-[#F4F5F7]", "border-[#DE350B] bg-white")} defaultValue="Введите текст" disabled={activeState === "disabled"}/>
        </div>
      ),
      codeContent: `<Textfield placeholder={tText('Введите текст')} />`,
      logicTitle: "Грей-фон",
      logicDescription: "По умолчанию фон серый без границ. При фокусе фон меняется на белый и появляется обводка.",
      accessibilityText: "Свяжите метку с полем через ID для корректной работы скринридеров.",
      bestPractices: [
        "Не скрывайте метку.",
        "Используйте короткие сообщения об ошибках.",
        "Выделяйте обязательные поля."
      ]
    },
    {
      title: "IBM Carbon",
      icon: logos.carbon,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <input className={getInputStateClasses(activeState, "w-full px-4 py-3 rounded-none transition-all outline-none bg-[#f4f4f4] border-b border-[#8D8D8D]", "bg-[#E5E5E5]", "", "outline outline-2 outline-[#0F62FE] outline-offset-[-2px] border-b-[#0F62FE]", "opacity-50 cursor-not-allowed border-transparent text-[#c6c6c6]", "outline outline-2 outline-[#da1e28] outline-offset-[-2px] border-b-[#da1e28]")} defaultValue="Введите текст" disabled={activeState === "disabled"}/>
        </div>
      ),
      codeContent: `<TextInput labelText="Метка" />`,
      logicTitle: "Индустриальный вид",
      logicDescription: "Отсутствие скруглений, серый фон и четкая нижняя граница.",
      accessibilityText: "Высокий контраст и четкая индикация ошибок.",
      bestPractices: [
        "Используйте одинаковые отступы.",
        "Всегда указывайте метку.",
        "Избегайте лишних декораций."
      ]
    },
    {
      title: "Shopify Polaris",
      icon: logos.polaris,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <input className={getInputStateClasses(activeState, "w-full px-3 py-2 rounded-[8px] shadow-sm transition-all outline-none border border-[#8C9196]", "border-[#5C5F62]", "", "border-[#008060] ring-2 ring-[#008060]/[0.2]", "opacity-50 cursor-not-allowed bg-[#f4f6f8]", "border-[#d82c0d] ring-2 ring-[#d82c0d]/20 bg-[#fff4f4]")} defaultValue="Введите текст" disabled={activeState === "disabled"}/>
        </div>
      ),
      codeContent: `<TextField label="Метка" />`,
      logicTitle: "Дружелюбный радиус",
      logicDescription: "Крупные скругления (12px) и мягкие тени создают ощущение надежности.",
      accessibilityText: "Оптимизировано для сенсорных экранов и клавиатурного ввода.",
      bestPractices: [
        "Используйте глаголы в метках действий.",
        "Будьте лаконичны в сообщениях.",
        "Соблюдайте иерархию."
      ]
    },
    {
      title: "Ant Design",
      icon: logos.ant,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <input className={getInputStateClasses(activeState, "w-full px-3 py-2 rounded-[6px] transition-all outline-none border border-[#D9D9D9]", "border-[#4096FF]", "", "border-[#1677FF] ring-4 ring-[#1677FF]/[0.1]", "opacity-50 cursor-not-allowed bg-[#f5f5f5] text-[#00000040]", "border-[#ff4d4f] ring-4 ring-[#ff4d4f]/10")} defaultValue="Введите текст" disabled={activeState === "disabled"}/>
        </div>
      ),
      codeContent: `<Input placeholder={tText('Введите текст')} />`,
      logicTitle: "Корпоративный баланс",
      logicDescription: "Классический сбалансированный дизайн с радиусом 6px.",
      accessibilityText: "Визуальный отклик через смену теней и границ.",
      bestPractices: [
        "Используйте префиксы для контекста.",
        "Группируйте связанные поля.",
        "Выделяйте фокус цветом."
      ]
    }
  ];

  const switchCards: CardData[] = [
    {
      title: "Material Design 3",
      icon: logos.material,
      previewType: "button",
      previewContent: (
        <div className={getInputStateClasses(activeState, "w-[52px] h-[32px] rounded-full p-1 transition-all flex items-center cursor-pointer bg-accent-blue", "brightness-110", "", "ring-2 ring-accent-blue ring-offset-2", "bg-gray-200 opacity-50 cursor-not-allowed", "")}>
          <div className="w-[24px] h-[24px] bg-white rounded-full transition-all shadow-sm translate-x-[20px]" />
        </div>
      ),
      codeContent: `<Switch\n  selected\n  ${activeState === 'disabled' ? 'disabled' : ''}\n/>`,
      logicTitle: "M3 Switch",
      logicDescription: "Высокий трек (32px) with заметным ползунком. В активном состоянии ползунок может содержать иконку галочки.",
      accessibilityText: "Минимальный размер 48x48dp для области нажатия.",
      bestPractices: [
        "Используйте для мгновенных настроек.",
        "Всегда сопровождайте меткой.",
        "Не используйте вместо чекбоксов в формах."
      ]
    },
    {
      title: "Fluent UI",
      icon: logos.fluent,
      previewType: "button",
      previewContent: (
        <div className={getInputStateClasses(activeState, "w-[40px] h-[20px] rounded-full p-[2px] transition-all flex items-center cursor-pointer border bg-[#0078D4] border-[#0078D4]", "brightness-125", "", "outline outline-2 outline-[#0078D4] outline-offset-1", "bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed", "")}>
          <div className="w-[14px] h-[14px] bg-white rounded-full translate-x-[20px]" />
        </div>
      ),
      codeContent: `<Toggle\n  checked\n  ${activeState === 'disabled' ? 'disabled' : ''}\n/>`,
      logicTitle: "Fluent Toggle",
      logicDescription: "Более тонкий и компактный вид. Четкие состояния без лишних теней.",
      accessibilityText: "Обеспечьте текстовый эквивалент состояния (Вкл/Выкл).",
      bestPractices: [
        "Располагайте метку справа или сверху.",
        "Используйте для бинарных опций.",
        "Избегайте неоднозначности."
      ]
    },
    {
      title: "Atlassian",
      icon: logos.atlassian,
      previewType: "button",
      previewContent: (
        <div className={getInputStateClasses(activeState, "w-[40px] h-[20px] rounded-full p-[2px] transition-all flex items-center cursor-pointer bg-[#0052CC]", "bg-[#0065FF]", "", "ring-2 ring-[#4C90FF] ring-offset-2", "bg-[#F4F5F7] opacity-50 cursor-not-allowed", "")}>
          <div className="w-[16px] h-[16px] bg-white rounded-full translate-x-[20px] shadow-sm" />
        </div>
      ),
      codeContent: `<Toggle\n  isChecked\n  ${activeState === 'disabled' ? 'isDisabled' : ''}\n/>`,
      logicTitle: "ADG Toggle",
      logicDescription: "Минималистичный дизайн, ползунок почти заполняет высоту трека.",
      accessibilityText: "Поддержка клавиатурного управления (Space/Enter).",
      bestPractices: [
        "Используйте в настройках профиля.",
        "Не используйте для действий, требующих подтверждения.",
        "Группируйте связанные переключатели."
      ]
    },
    {
      title: "IBM Carbon",
      icon: logos.carbon,
      previewType: "button",
      previewContent: (
        <div className={getInputStateClasses(activeState, "w-[48px] h-[24px] transition-all flex items-center cursor-pointer p-[3px] rounded-full bg-[#24a148]", "bg-[#1d823a]", "", "ring-2 ring-offset-1 ring-[#24a148]", "bg-[#e0e0e0] opacity-50 cursor-not-allowed", "")}>
          <div className="w-[18px] h-[18px] bg-white rounded-full translate-x-[24px]" />
        </div>
      ),
      codeContent: `<Toggle\n  toggled\n  ${activeState === 'disabled' ? 'disabled' : ''}\n/>`,
      logicTitle: "Carbon Toggle",
      logicDescription: "Использует зеленый цвет для активного состояния по умолчанию. Строгие формы.",
      accessibilityText: "Четкая визуальная граница между треком и ползунком.",
      bestPractices: [
        "Добавляйте текст 'On'/'Off'.",
        "Соблюдайте иерархию Carbon.",
        "Используйте для системных настроек."
      ]
    },
    {
      title: "Shopify Polaris",
      icon: logos.polaris,
      previewType: "button",
      previewContent: (
        <div className={getInputStateClasses(activeState, "w-[44px] h-[24px] rounded-full p-1 transition-all flex items-center cursor-pointer border bg-[#008060] border-[#008060]", "bg-[#006e52]", "", "ring-2 ring-offset-2 ring-[#008060]", "bg-gray-100 border-gray-200 cursor-not-allowed", "")}>
          <div className={`w-[16px] h-[16px] bg-white rounded-full translate-x-[20px] shadow-sm`} />
        </div>
      ),
      codeContent: `<SettingToggle\n  enabled\n  ${activeState === 'disabled' ? 'disabled' : ''}\n/>`,
      logicTitle: "Polaris Switch",
      logicDescription: "Мягкие формы, акцент на доступности в контексте e-commerce.",
      accessibilityText: "Высокий контраст активного состояния.",
      bestPractices: [
        "Используйте для управления функциями магазина.",
        "Понятно описывайте последствия переключения.",
        "Избегайте перегрузки интерфейса."
      ]
    },
    {
      title: "Ant Design",
      icon: logos.ant,
      previewType: "button",
      previewContent: (
        <div className={getInputStateClasses(activeState, "w-[44px] h-[22px] rounded-full p-[2px] transition-all flex items-center cursor-pointer bg-[#1677ff]", "bg-[#4096ff]", "", "ring-4 ring-[#1677ff]/30", "bg-gray-200 cursor-not-allowed opacity-50", "")}>
          <div className="w-[18px] h-[18px] bg-white rounded-full translate-x-[22px] shadow-sm" />
        </div>
      ),
      codeContent: `<Switch\n  defaultChecked\n  ${activeState === 'disabled' ? 'disabled' : ''}\n/>`,
      logicTitle: "Ant Switch",
      logicDescription: "Компактный и функциональный. Поддерживает текст или иконки внутри трека.",
      accessibilityText: "Анимация перемещения ползунка для визуального подтверждения.",
      bestPractices: [
        "Используйте в таблицах и списках.",
        "Может содержать иконки check/close.",
        "Стандартизируйте размер (small/default)."
      ]
    }
  ];

  const selectCards: CardData[] = [
    {
      title: "Material Design 3",
      icon: logos.material,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <div 
            onClick={(e) => handleToggle("Material Design 3", e)}
            className={getInputStateClasses(
              openSystem === "Material Design 3" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "px-4 py-3 rounded-t-[4px] border-b border-[#49454F] bg-[#E7E0EC] flex items-center justify-between cursor-pointer",
              "",
              "bg-[#EBE4EF] border-[#1D1B20]",
              "border-[#6750A4] border-b-2",
              "opacity-50 cursor-not-allowed",
              "border-[#B3261E] border-b-2"
            )}
          >
            <div className="flex flex-wrap gap-1">
              <span className="bg-[#6750A4] text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                Выбор 1 <X className="w-2 h-2" />
              </span>
              <span className="text-[#1D1B20] text-sm italic">...еще 5</span>
            </div>
            <ChevronDown className="w-4 h-4 text-[#49454F]" />
          </div>
          {(openSystem === "Material Design 3" || activeState === 'open') && (
            <div className="absolute z-10 w-[240px] mt-1 bg-white shadow-xl rounded-md border border-[#cfc4c5] overflow-hidden" onClick={e => e.stopPropagation()}>
               <div className="p-2 border-b border-[#cfc4c5] flex items-center gap-2">
                 <Search className="w-3 h-3 text-gray-400" />
                 <input className="text-xs outline-none w-full" placeholder={tText('Поиск в 500+ элементах...')} />
               </div>
               <div className="max-h-[120px] overflow-y-auto">
                 {[1,2,3,4,5,6,7,8].map(i => (
                   <div key={i} className="px-4 py-2 text-xs hover:bg-gray-100 flex items-center justify-between">
                     Элемент {i}
                     {i === 1 && <Check className="w-3 h-3 text-accent-blue" />}
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>
      ),
      codeContent: `<Select\n  multiple\n  label="Выбор"\n  ${activeState === 'error' ? 'error' : ''}\n>\n  {largeList.map(item => (\n    <Option key={item.id}>{item.label}</Option>\n  ))}\n</Select>`,
      logicTitle: "Multi-select с чипсами",
      logicDescription: "M3 использует 'Assist Chips' внутри поля. При большом количестве элементов (500+) рекомендуется виртуализация списка и встроенный поиск.",
      accessibilityText: "Роль listbox и aria-multiselectable. Каждое изменение озвучивается через aria-live.",
      bestPractices: [
        "Используйте чипсы для удаления.",
        "Добавляйте поиск при списках > 10 элементов.",
        "Группируйте элементы по категориям."
      ]
    },
    {
      title: "Fluent UI",
      icon: logos.fluent,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <div 
            onClick={(e) => handleToggle("Fluent UI", e)}
            className={getInputStateClasses(
              openSystem === "Fluent UI" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "w-full px-3 py-1.5 rounded-[2px] border border-[#605E5C] flex items-center justify-between cursor-pointer",
              "",
              "border-[#323130]",
              "border-[#0078D4] ring-1 ring-[#0078D4]",
              "bg-[#F3F2F1] opacity-50",
              "border-[#A4262C] ring-1 ring-[#A4262C]"
            )}
          >
            <span className="text-sm truncate">Выбор 1, Выбор 2, Выбор 3...</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          {(openSystem === "Fluent UI" || activeState === 'open') && (
             <div className="absolute z-10 w-[240px] mt-1 bg-white border border-[#cfc4c5] shadow-lg" onClick={e => e.stopPropagation()}>
                <div className="max-h-[150px] overflow-y-auto scrollbar-thin">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50">
                        <div className="w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center">
                          {i < 3 && <div className="w-2 h-2 bg-[#0078D4]" />}
                        </div>
                        Вариант {i}
                     </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      ),
      codeContent: `<Dropdown\n  placeholder={tText('Выберите системы')}\n  multiselect\n  ${activeState === 'error' ? 'state="error"' : ''}\n/>`,
      logicTitle: "Список с запятыми",
      logicDescription: "В Fluent UI multi-select часто отображает выбранное текстом через запятую. Большие списки управляются через комбобокс с фильтрацией.",
      accessibilityText: "Поддержка High Contrast mode. Фокус на чекбоксы внутри выпадающего меню.",
      bestPractices: [
        "Текстовое отображение экономит место.",
        "Используйте 'Select All' для больших наборов.",
        "Обеспечьте визуальное разделение групп."
      ]
    },
    {
      title: "Atlassian",
      icon: logos.atlassian,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <div 
            onClick={(e) => handleToggle("Atlassian", e)}
            className={getInputStateClasses(
              openSystem === "Atlassian" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "w-full px-3 py-2 rounded-[3px] bg-[#F4F5F7] border-2 border-transparent flex items-center justify-between cursor-pointer",
              "",
              "bg-[#EBECF0]",
              "bg-white border-[#4C90FF]",
              "bg-[#FAFBFC] opacity-50",
              "bg-white border-[#DE350B]"
            )}
          >
            <div className="flex gap-1 overflow-hidden">
               <span className="bg-[#DFE1E6] text-[#42526E] text-[10px] px-2 py-0.5 rounded sm">Tag 1</span>
               <span className="bg-[#DFE1E6] text-[#42526E] text-[10px] px-2 py-0.5 rounded sm">Tag 2</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>
          {(openSystem === "Atlassian" || activeState === 'open') && (
             <div className="absolute z-10 w-[240px] mt-1 bg-white shadow-2xl border border-[#cfc4c5] rounded sm overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-2 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Всего 528 элементов
                </div>
                <div className="max-h-[140px] overflow-y-auto">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className="px-3 py-2 text-sm flex items-center justify-between hover:bg-blue-50">
                        Пользователь {i}
                        <Check className="w-3 h-3 text-[#0052CC]" />
                     </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      ),
      codeContent: `<Select\n  isMulti\n  options={pagedOptions}\n  onInputChange={handleSearch}\n  ${activeState === 'error' ? 'validationState="error"' : ''}\n/>`,
      logicTitle: "Async & Tags",
      logicDescription: "Atlassian фокусируется на 'Select2'-подобном поведении: теги (lozenge) внутри поля. Для 500+ элементов используется пагинация (Async Select).",
      accessibilityText: "Анонсирование количества найденных результатов при поиске.",
      bestPractices: [
        "Используйте Async для внешних данных.",
        "Не перегружайте поле более чем 5-7 тегами.",
        "Добавляйте аватары если список - это люди."
      ]
    },
    {
      title: "IBM Carbon",
      icon: logos.carbon,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
           <div 
            onClick={(e) => handleToggle("IBM Carbon", e)}
            className={getInputStateClasses(
              openSystem === "IBM Carbon" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "w-full px-4 py-3 bg-[#f4f4f4] border-b border-[#8D8D8D] flex items-center justify-between cursor-pointer",
              "",
              "bg-[#E5E5E5]",
              "outline outline-2 outline-[#0F62FE] outline-offset-[-2px] border-b-[#0F62FE]",
              "opacity-50",
              "outline outline-2 outline-[#DA1E28] outline-offset-[-2px] border-b-[#DA1E28]"
            )}
           >
            <span className="text-sm">3 выбрано</span>
            <div className="flex gap-2">
               <span className="w-5 h-5 bg-[#0F62FE] text-white text-[10px] flex items-center justify-center rounded-full">3</span>
               <ChevronDown className="w-4 h-4 ml-2" />
            </div>
          </div>
          {(openSystem === "IBM Carbon" || activeState === 'open') && (
             <div className="absolute z-10 w-[240px] mt-px bg-[#f4f4f4] border-t border-gray-200" onClick={e => e.stopPropagation()}>
                <div className="max-h-[140px] overflow-y-auto">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className="px-4 py-3 text-sm flex items-center gap-3 border-b border-gray-100 hover:bg-[#e5e5e5]">
                        <input type="checkbox" checked={i<4} className="accent-[#0F62FE]" />
                        Опция {i}
                     </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      ),
      codeContent: `<MultiSelect\n  label="Выбор элементов"\n  items={items}\n  ${activeState === 'error' ? 'invalid' : ''}\n/>`,
      logicTitle: "Счетчик и чекбоксы",
      logicDescription: "Carbon часто использует числовой счетчик в поле вместо перечисления всех тегов. Меню содержит чекбоксы для мульти-выбора.",
      accessibilityText: "Клавиатурная навигация стрелками. Esc закрывает меню без потери выбора.",
      bestPractices: [
        "Счетчик идеален для мобильных версий.",
        "Используйте 'Clear all' внутри меню.",
        "Соблюдайте строгую сетку IBM."
      ]
    },
    {
      title: "Shopify Polaris",
      icon: logos.polaris,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <div 
            onClick={(e) => handleToggle("Shopify Polaris", e)}
            className={getInputStateClasses(
              openSystem === "Shopify Polaris" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "w-full px-3 py-2 rounded-[8px] border border-[#8C9196] shadow-sm flex items-center justify-between cursor-pointer transition-all",
              "",
              "border-[#5C5F52]",
              "border-[#008060] ring-2 ring-[#008060]/[0.2]",
              "bg-[#F1F2F3] opacity-50",
              "border-[#D82C0D] bg-[#FFF4F4]"
            )}
          >
            <div className="flex flex-wrap gap-1">
               <span className="bg-gray-100 border border-gray-300 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                 Товар <X className="w-2 h-2 text-gray-500" />
               </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          {(openSystem === "Shopify Polaris" || activeState === 'open') && (
             <div className="absolute z-10 w-[240px] mt-2 bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden p-2" onClick={e => e.stopPropagation()}>
                <div className="relative mb-2">
                   <Search className="absolute left-2 top-2 w-3 h-3 text-gray-400" />
                   <input className="w-full pl-7 pr-2 py-1 text-xs border border-gray-200 rounded-md outline-none" placeholder={tText('Поиск товаров...')} />
                </div>
                <div className="max-h-[120px] overflow-y-auto">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className="px-2 py-1.5 text-xs rounded-md hover:bg-emerald-50 flex items-center gap-2">
                        <div className="w-3 h-3 border rounded border-gray-300" />
                        Вариант товара {i}
                     </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      ),
      codeContent: `<Autocomplete\n  allowMultiple\n  options={options}\n  textField={<Autocomplete.TextField label="Поиск" />}\n/>`,
      logicTitle: "Removable Tags",
      logicDescription: "Polaris использует теги с 'X' для явного удаления. Большие списки обрабатываются через Autocomplete с фильтрацией на лету.",
      accessibilityText: "Голосовой помощник уведомляет о добавлении/удалении тега.",
      bestPractices: [
        "Теги должны быть контрастными.",
        "Используйте поиск как основной режим ввода.",
        "Группируйте результаты по типу данных."
      ]
    },
    {
      title: "Ant Design",
      icon: logos.ant,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
           <div 
            onClick={(e) => handleToggle("Ant Design", e)}
            className={getInputStateClasses(
              openSystem === "Ant Design" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "w-full px-3 py-2 rounded-[6px] border border-[#D9D9D9] flex items-center justify-between cursor-pointer transition-all",
              "",
              "border-[#4096FF]",
              "border-[#1677FF] ring-4 ring-[#1677FF]/[0.1]",
              "bg-[#F5F5F5] opacity-50",
              "border-[#FF4D4F] ring-4 ring-[#FF4D4F]/[0.1]"
            )}
           >
            <div className="flex gap-1">
               <span className="bg-gray-100 border border-gray-200 text-[10px] px-2 py-0.5 rounded flex items-center gap-1">Выбор <X className="w-2 h-2" /></span>
               <span className="bg-gray-100 border border-gray-200 text-[10px] px-2 py-0.5 rounded">+2</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-300" />
          </div>
          {(openSystem === "Ant Design" || activeState === 'open') && (
             <div className="absolute z-10 w-[240px] mt-1 bg-white border border-[#D9D9D9] shadow-xl rounded-md overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-2">
                   <div className="flex items-center gap-2 border-b border-gray-100 px-2 py-1 mb-1">
                      <Search className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-500 underline">Поиск</span>
                   </div>
                   <div className="max-h-[120px] overflow-y-auto">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className={`px-2 py-1.5 text-xs flex items-center justify-between hover:bg-gray-50 ${i<3 ? 'bg-blue-50 font-semibold' : ''}`}>
                           Элемент {i}
                           {i<3 && <Check className="w-3 h-3 text-blue-600" />}
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          )}
        </div>
      ),
      codeContent: `<Select\n  mode="multiple"\n  showSearch\n  maxTagCount="responsive"\n  ${activeState === 'error' ? 'status="error"' : ''}\n/>`,
      logicTitle: "Responsive Tags",
      logicDescription: "Ant Design имеет мощный режим 'responsive', который скрывает лишние теги под счетчик '+N'. Идеально для списков любой длины.",
      accessibilityText: "Сложные сценарии фокуса: переключение между полем поиска и списком.",
      bestPractices: [
        "Используйте 'maxTagCount' для чистоты.",
        "Включайте поиск по умолчанию для списков.",
        "Подсвечивайте совпадения в результатах."
      ]
    }
  ];

  const datepickerCards: CardData[] = [
    {
      title: "Material Design 3",
      icon: logos.material,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <div 
            onClick={(e) => handleToggle("Material Design 3 DP", e)}
            className={getInputStateClasses(
              openSystem === "Material Design 3 DP" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "px-4 py-2 border border-[#49454F] rounded-[4px] flex items-center justify-between cursor-pointer",
              "",
              "border-[#1D1B20]",
              "border-[#6750A4] ring-1 ring-[#6750A4]",
              "opacity-50 grayscale",
              "border-[#B3261E] ring-1 ring-[#B3261E]"
            )}
          >
            <span className="text-sm">{selectedDay} мая 2026</span>
            <Calendar className="w-4 h-4 text-[#49454F]" />
          </div>
          {(openSystem === "Material Design 3 DP" || activeState === 'focus') && (
            <div className="absolute z-10 w-[280px] mt-2 bg-[#F7F2FA] shadow-xl rounded-2xl p-4 border border-[#cfc4c5]" onClick={e => e.stopPropagation()}>
               <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-sm">Май 2026</span>
                  <div className="flex gap-2 text-[#49454F]">
                    <ChevronLeft className="w-5 h-5 cursor-pointer hover:bg-gray-200 rounded-full p-0.5" />
                    <ChevronRight className="w-5 h-5 cursor-pointer hover:bg-gray-200 rounded-full p-0.5" />
                  </div>
               </div>
               <div className="grid grid-cols-7 gap-1 text-center">
                  {['П', 'В', 'С', 'Ч', 'П', 'С', 'В'].map(d => <span key={d} className="text-[10px] text-gray-500 font-medium">{d}</span>)}
                  {Array.from({length: 31}).map((_, i) => {
                    const day = i + 1;
                    const isSelected = selectedDay === day;
                    return (
                      <div 
                        key={i} 
                        onClick={() => setSelectedDay(day)}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-8 h-8 flex items-center justify-center text-xs rounded-full cursor-pointer transition-all ${
                          isSelected ? 'bg-[#6750A4] text-white shadow-md' : 
                          hoveredDay === day ? 'bg-[#EADDFF] text-[#21005D]' : 'hover:bg-[#EBE4EF]'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
               </div>
            </div>
          )}
        </div>
      ),
      codeContent: `<DatePicker\n  label="Дата"\n  defaultValue={new Date()}\n/>`,
      logicTitle: "Календарь (Dialog/Modal)",
      logicDescription: "M3 предпочитает модальные окна для выбора даты на мобильных и выпадающие списки (popovers) на десктопах. Высокий акцент на 'Selection State'.",
      accessibilityText: "Полная поддержка клавиатуры (стрелки для навигации по дням).",
      bestPractices: [
        "Используйте модальный режим для мобильных.",
        "Выделяйте текущую дату.",
        "Показывайте сокращенные дни недели."
      ]
    },
    {
      title: "Fluent UI",
      icon: logos.fluent,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <div 
            onClick={(e) => handleToggle("Fluent UI DP", e)}
            className={getInputStateClasses(
              openSystem === "Fluent UI DP" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "w-full px-3 py-1.5 rounded-[2px] border border-[#605E5C] flex items-center justify-between cursor-pointer",
              "",
              "border-[#323130]",
              "border-[#0078D4] ring-1 ring-[#0078D4]",
              "bg-[#F3F2F1] opacity-50",
              "border-[#A4262C] ring-1 ring-[#A4262C]"
            )}
          >
            <span className="text-sm">{rangeStart}.05 - {rangeEnd}.05.2026</span>
            <Calendar className="w-4 h-4" />
          </div>
          {(openSystem === "Fluent UI DP" || activeState === 'focus') && (
             <div className="absolute z-10 w-[300px] mt-1 bg-white border border-[#cfc4c5] shadow-lg p-3" onClick={e => e.stopPropagation()}>
                <div className="flex gap-4">
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-xs font-bold">Май 2026</div>
                        <div className="flex gap-1">
                           <ChevronLeft className="w-4 h-4 cursor-pointer hover:bg-gray-100 p-0.5" />
                           <ChevronRight className="w-4 h-4 cursor-pointer hover:bg-gray-100 p-0.5" />
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-0.5 text-center text-[10px]">
                         {['П','В','С','Ч','П','С','В'].map(d => <div key={d} className="text-gray-400 p-1">{d}</div>)}
                         {Array.from({length: 31}).map((_, i) => {
                           const d = i + 1;
                           const isInRange = d >= Math.min(rangeStart, rangeEnd) && d <= Math.max(rangeStart, rangeEnd);
                           const isStart = d === rangeStart;
                           const isEnd = d === rangeEnd;
                           return (
                             <div 
                               key={i} 
                               onClick={() => {
                                 if (rangeStart !== rangeEnd) {
                                   setRangeStart(d);
                                   setRangeEnd(d);
                                 } else {
                                   setRangeEnd(d);
                                 }
                               }}
                               className={`p-1.5 cursor-pointer transition-colors ${
                                 isStart || isEnd ? 'bg-[#0078D4] text-white font-bold' : 
                                 isInRange ? 'bg-[#DFF6DD] text-[#107C10]' : 'hover:bg-gray-100'
                               }`}
                             >
                               {d}
                             </div>
                           );
                         })}
                      </div>
                   </div>
                </div>
             </div>
          )}
        </div>
      ),
      codeContent: `<Calendar\n  selectionMode="range"\n  values={[start, end]}\n/>`,
      logicTitle: "Периоды и сетка",
      logicDescription: "Fluent UI отлично справляется с выбором периодов. Сетка строгая, без лишних теней, с четким выделением диапазона (Range Selection).",
      accessibilityText: "Анонсирование выбранного диапазона через aria-live.",
      bestPractices: [
        "Используйте два календаря для выбора больших периодов.",
        "Позволяйте вводить дату вручную.",
        "Добавляйте быстрые пресеты (Сегодня, Неделя)."
      ]
    },
    {
      title: "Atlassian",
      icon: logos.atlassian,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <div 
            onClick={(e) => handleToggle("Atlassian DP", e)}
            className={getInputStateClasses(
              openSystem === "Atlassian DP" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "w-full px-3 py-2 rounded-[3px] bg-[#F4F5F7] border-2 border-transparent flex items-center justify-between cursor-pointer",
              "",
              "bg-[#EBECF0]",
              "bg-white border-[#4C90FF]",
              "bg-[#FAFBFC] opacity-50",
              "bg-white border-[#DE350B]"
            )}
          >
            <span className="text-sm">May {selectedDay}, 2026</span>
            <Calendar className="w-4 h-4 text-gray-500" />
          </div>
          {(openSystem === "Atlassian DP" || activeState === 'focus') && (
             <div className="absolute z-10 w-[280px] mt-1 bg-white shadow-2xl border border-[#cfc4c5] rounded-sm overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-4">
                   <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="text-gray-400 font-bold mb-1">{d}</div>)}
                      {Array.from({length: 31}).map((_, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedDay(i + 1)}
                          className={`p-2 rounded-sm cursor-pointer transition-colors ${i + 1 === selectedDay ? 'bg-[#0052CC] text-white' : 'hover:bg-blue-50 text-[#42526E]'}`}
                        >
                          {i + 1}
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          )}
        </div>
      ),
      codeContent: `<DatePicker\n  defaultValue="2026-05-18"\n/>`,
      logicTitle: "Inline Calendar",
      logicDescription: "Atlassian использует компактные календари с фокусом на контент. Дизайн лоялен к плотному расположению элементов в Jira/Confluence.",
      accessibilityText: "Роль grid для календаря, описание текущего дня.",
      bestPractices: [
        "Не загромождайте календарь лишними иконками.",
        "Используйте Locales для локализации дат.",
        "Добавляйте возможность очистки (Clear button)."
      ]
    },
    {
      title: "IBM Carbon",
      icon: logos.carbon,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
           <div 
            onClick={(e) => handleToggle("IBM Carbon DP", e)}
            className={getInputStateClasses(
              openSystem === "IBM Carbon DP" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "w-full px-4 py-3 bg-[#f4f4f4] border-b border-[#8D8D8D] flex items-center justify-between cursor-pointer",
              "",
              "bg-[#E5E5E5]",
              "outline outline-2 outline-[#0F62FE] outline-offset-[-2px] border-b-[#0F62FE]",
              "opacity-50",
              "outline outline-2 outline-[#DA1E28] outline-offset-[-2px] border-b-[#DA1E28]"
            )}
           >
            <span className="text-sm">{selectedDay}/05/2026</span>
            <Calendar className="w-4 h-4" />
          </div>
          {(openSystem === "IBM Carbon DP" || activeState === 'focus') && (
             <div className="absolute z-10 w-[240px] mt-px bg-[#f4f4f4] shadow-md border-t border-gray-200" onClick={e => e.stopPropagation()}>
                <div className="grid grid-cols-7 gap-0 text-center">
                   {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="p-2 text-[10px] font-bold border-b border-gray-200">{d}</div>)}
                   {Array.from({length: 28}).map((_, i) => (
                     <div 
                        key={i} 
                        onClick={() => setSelectedDay(i + 1)}
                        className={`p-2 text-xs border border-transparent cursor-pointer transition-all hover:border-[#0F62FE] ${i + 1 === selectedDay ? 'bg-[#0F62FE] text-white' : ''}`}
                     >
                       {i + 1}
                     </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      ),
      codeContent: `<DatePicker\n  datePickerType="single"\n>\n  <DatePickerInput labelText="Дата" />\n</DatePicker>`,
      logicTitle: "Четкость и сетка",
      logicDescription: "Carbon делает упор на табличные данные. Календарь часто имеет фиксированную ширину и строгую сетку с границами 1px.",
      accessibilityText: "Соблюдение параметров контрастности IBM для всех состояний.",
      bestPractices: [
        "Используйте формат даты, принятый в организации.",
        "Добавляйте иконку календаря всегда.",
        "Поддерживайте ручной ввод в формате ISO."
      ]
    },
    {
      title: "Shopify Polaris",
      icon: logos.polaris,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
          <div 
            onClick={(e) => handleToggle("Shopify Polaris DP", e)}
            className={getInputStateClasses(
              openSystem === "Shopify Polaris DP" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "w-full px-3 py-2 rounded-[8px] border border-[#8C9196] shadow-sm flex items-center justify-between cursor-pointer",
              "",
              "border-[#5C5F62]",
              "border-[#008060] ring-2 ring-[#008060]/[0.2]",
              "bg-[#F1F2F3] opacity-50",
              "border-[#D82C0D] bg-[#FFF4F4]"
            )}
          >
            <span className="text-sm">May {selectedDay}, 2026</span>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          {(openSystem === "Shopify Polaris DP" || activeState === 'focus') && (
             <div className="absolute z-10 w-[260px] mt-2 bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden p-4" onClick={e => e.stopPropagation()}>
                <div className="flex flex-col gap-4">
                   <div className="flex justify-between items-center">
                      <div className="text-sm font-semibold">Май 2026</div>
                      <div className="flex gap-1">
                        <ChevronLeft className="w-4 h-4 cursor-pointer text-gray-500 hover:bg-gray-100 rounded" />
                        <ChevronRight className="w-4 h-4 cursor-pointer text-gray-500 hover:bg-gray-100 rounded" />
                      </div>
                   </div>
                   <div className="grid grid-cols-7 gap-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-center text-[10px] text-gray-400">{d}</div>)}
                      {Array.from({length: 31}).map((_, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedDay(i + 1)}
                          className={`w-7 h-7 flex items-center justify-center text-xs rounded-md cursor-pointer transition-colors ${i + 1 === selectedDay ? 'bg-[#008060] text-white scale-110' : 'hover:bg-emerald-50'}`}
                        >
                          {i + 1}
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          )}
        </div>
      ),
      codeContent: `<DatePicker\n  month={4}\n  year={2026}\n  selected={selectedDate}\n/>`,
      logicTitle: "Merchant Friendly",
      logicDescription: "Polaris использует мягкие формы и понятное выделение. Акцент на быстром выборе для управления заказами.",
      accessibilityText: "Описание даты словами (например, 'Monday, May 18').",
      bestPractices: [
        "Используйте для отчетных периодов.",
        "Добавляйте 'Year picker' при необходимости.",
        "Соблюдайте отступы Polaris."
      ]
    },
    {
      title: "Ant Design",
      icon: logos.ant,
      previewType: "button",
      previewContent: (
        <div className="w-full max-w-[240px] text-left">
           <div 
            onClick={(e) => handleToggle("Ant Design DP", e)}
            className={getInputStateClasses(
              openSystem === "Ant Design DP" || activeState === 'open' || activeState === 'focus' ? 'focus' : activeState,
              "w-full px-3 py-2 rounded-[6px] border border-[#D9D9D9] flex items-center justify-between cursor-pointer transition-all",
              "",
              "border-[#4096FF]",
              "border-[#1677FF] ring-4 ring-[#1677FF]/[0.1]",
              "bg-[#F5F5F5] opacity-50",
              "border-[#FF4D4F] ring-4 ring-[#FF4D4F]/[0.1]"
            )}
           >
            <span className="text-sm">2026-05-{selectedDay.toString().padStart(2, '0')}</span>
            <Calendar className="w-4 h-4 text-gray-300" />
          </div>
          {(openSystem === "Ant Design DP" || activeState === 'focus') && (
             <div className="absolute z-10 min-w-[280px] mt-1 bg-white border border-[#D9D9D9] shadow-xl rounded-md overflow-hidden p-2" onClick={e => e.stopPropagation()}>
                <div className="flex border-b border-gray-100 pb-2 mb-2 justify-between items-center px-2">
                   <ChevronLeft className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500" />
                   <span className="text-xs font-bold">2026-05</span>
                   <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500" />
                </div>
                <div className="grid grid-cols-7 gap-0 text-center">
                   {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <div key={d} className="p-1 text-[10px] text-gray-400">{d}</div>)}
                   {Array.from({length: 31}).map((_, i) => (
                     <div 
                        key={i} 
                        onClick={() => setSelectedDay(i + 1)}
                        className={`p-2 text-xs cursor-pointer transition-all hover:bg-blue-50 ${i + 1 === selectedDay ? 'bg-[#1677ff] text-white rounded-sm ring-2 ring-[#1677ff]/[0.2]' : ''}`}
                     >
                       {i + 1}
                     </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      ),
      codeContent: `<DatePicker\n/>`,
      logicTitle: "Мощный выбор",
      logicDescription: "Один из самых мощных DatePicker: поддерживает выбор недель, месяцев, кварталов и лет. Очень высокая плотность информации.",
      accessibilityText: "Сложные сценарии фокуса: переключение между заголовком и сеткой.",
      bestPractices: [
        "Используйте 'RangePicker' для выбора периодов.",
        "Настраивайте форматы отображения.",
        "Включайте 'showTime' если нужно время."
      ]
    }
  ];

  const modalCards: CardData[] = [
    {
      title: "Material Design 3",
      icon: logos.material,
      previewType: "button",
      previewContent: (
        <div className={`bg-[#ECE6F0] rounded-[28px] p-6 w-full max-w-[280px] shadow-sm transform transition-all translate-y-0 `}>
          {activeVariant === 'transactional' ? (
            <>
               <div className="text-xl mb-4 text-[#1D1B20]">Новый проект</div>
               <input className="w-full bg-[#E7E0EC] border-b border-[#49454F] p-3 rounded-t-md mb-6 outline-none text-sm" placeholder={tText('Название проекта')} />
               <div className="flex justify-end gap-2 text-sm font-medium">
                   <button className="text-[#6750A4] px-3 py-2 cursor-pointer transition-colors hover:bg-black/5 rounded-full">Отмена</button>
                   <button className="bg-[#6750A4] text-white px-4 py-2 cursor-pointer transition-colors hover:bg-opacity-90 rounded-full">Создать</button>
               </div>
            </>
          ) : activeVariant === 'acknowledgment' ? (
            <>
               <div className="text-xl mb-4 text-[#1D1B20]">Обновление завершено</div>
               <div className="text-sm text-[#49454F] mb-6">Ваша система успешно обновлена до последней версии.</div>
               <div className="flex justify-end text-sm font-medium">
                   <button className="text-[#6750A4] px-3 py-2 cursor-pointer transition-colors hover:bg-black/5 rounded-full">Понятно</button>
               </div>
            </>
          ) : (
            <>
               <div className="text-xl mb-4 text-[#1D1B20]">Удалить данные?</div>
               <div className="text-sm text-[#49454F] mb-6">Это действие нельзя отменить. Вы уверены, что хотите продолжить?</div>
               <div className="flex justify-end gap-2 text-sm font-medium">
                   <button className="text-[#6750A4] px-3 py-2 cursor-pointer transition-colors hover:bg-black/5 rounded-full">Отмена</button>
                   <button className="text-[#B3261E] px-3 py-2 cursor-pointer transition-colors hover:bg-black/5 rounded-full">Удалить</button>
               </div>
            </>
          )}
        </div>
      ),
      codeContent: `<AlertDialog>\n  <AlertDialogTitle>Удалить данные?</AlertDialogTitle>\n  <AlertDialogContent>...</AlertDialogContent>\n</AlertDialog>`,
      logicTitle: "Basic Dialog",
      logicDescription: "Кнопки действий (Primary и Secondary) выровнены по правому краю. В деструктивных действиях кнопка удаления часто окрашивается в цвет ошибки, но остается Ghost-кнопкой (Text Button).",
      accessibilityText: "Жесткий фокус-треп (focus trap). Закрытие по клику на фон (backdrop click) обычно недоступно для Alert Dialogs (предотвращает случайное закрытие).",
      bestPractices: [
        "Не скрывайте фон (backdrop) без необходимости.",
        "Используйте глаголы действия в кнопках.",
        "Критичные диалоги не должны закрываться по клику вне области."
      ]
    },
    {
      title: "Fluent UI",
      icon: logos.fluent,
      previewType: "button",
      previewContent: (
        <div className={`bg-white border rounded-[8px] p-5 w-full max-w-[280px] shadow-lg transform transition-all `}>
          {activeVariant === 'transactional' ? (
            <>
               <div className="text-lg font-semibold mb-4">Настройки доступа</div>
               <select className="w-full border border-gray-300 p-2 rounded-[4px] text-sm mb-6 outline-none">
                 <option>Только чтение</option>
                 <option>Редактирование</option>
               </select>
               <div className="flex justify-end gap-2">
                   <button className="bg-[#0078D4] text-white px-4 py-1.5 rounded-[4px] text-sm font-medium cursor-pointer transition-all hover:bg-[#005A9E]">Сохранить</button>
                   <button className="border border-gray-300 px-4 py-1.5 rounded-[4px] text-sm font-medium cursor-pointer transition-all hover:bg-gray-50">Отмена</button>
               </div>
            </>
          ) : activeVariant === 'acknowledgment' ? (
            <>
               <div className="text-lg font-semibold mb-2">Настройки сохранены</div>
               <div className="text-sm text-gray-600 mb-6">Все изменения были успешно применены к вашему профилю.</div>
               <div className="flex justify-end">
                   <button className="bg-[#0078D4] text-white px-4 py-1.5 rounded-[4px] text-sm font-medium cursor-pointer transition-all hover:bg-[#005A9E]">ОК</button>
               </div>
            </>
          ) : (
            <>
               <div className="text-lg font-semibold mb-2">Удалить файл?</div>
               <div className="text-sm text-gray-600 mb-6">Действительно удалить этот файл навсегда?</div>
               <div className="flex justify-end gap-2">
                   <button className="bg-[#A4262C] text-white px-4 py-1.5 rounded-[4px] text-sm font-medium cursor-pointer transition-all hover:bg-[#8E1F24]">Удалить</button>
                   <button className="border border-gray-300 px-4 py-1.5 rounded-[4px] text-sm font-medium cursor-pointer transition-all hover:bg-gray-50">Отмена</button>
               </div>
            </>
          )}
        </div>
      ),
      codeContent: `<Dialog>\n  <DialogTitle>Удалить файл?</DialogTitle>\n  <DialogSurface>...</DialogSurface>\n</Dialog>`,
      logicTitle: "Primary Action First",
      logicDescription: "Основное действие часто располагается первым (выравнивание по правому краю, кнопка Confirm слева от Cancel или наоборот, в зависимости от платформы). Fluent часто делает акцент на Primary action.",
      accessibilityText: "Специальный trap фокуса. Escape key закрывает некритичные окна, но для Confirm/Delete может требовать явного действия.",
      bestPractices: [
        "Primary action должно быть самым заметным.",
        "Используйте короткие и понятные заголовки.",
        "Задавайте четкий фокус при открытии."
      ]
    },
    {
      title: "Atlassian",
      icon: logos.atlassian,
      previewType: "button",
      previewContent: (
        <div className={`bg-white rounded-[3px] p-6 w-full max-w-[280px] shadow-2xl transform transition-all `}>
          {activeVariant === 'transactional' ? (
            <>
               <div className="text-xl font-medium text-[#172B4D] mb-4">Создать задачу</div>
               <input className="w-full border-2 border-[#DFE1E6] hover:bg-[#EBECF0] focus:border-[#4C90FF] focus:bg-white p-2 rounded-[3px] mb-6 outline-none text-sm transition-colors" placeholder={tText('Краткое описание')} />
               <div className="flex justify-end gap-2">
                   <button className="text-[#5e6c84] hover:bg-gray-100 px-3 py-1.5 rounded-[3px] text-sm font-medium transition-all">Отмена</button>
                   <button className="bg-[#0052CC] text-white px-4 py-1.5 rounded-[3px] text-sm font-medium transition-all hover:bg-[#0065FF]">Создать</button>
               </div>
            </>
          ) : activeVariant === 'acknowledgment' ? (
            <>
               <div className="flex items-center gap-2 mb-4 text-[#36B37E]">
                 <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                 <div className="text-xl font-medium text-[#172B4D]">Успешно опубликовано</div>
               </div>
               <div className="text-sm text-[#5E6C84] mb-6">Ваша страница теперь доступна всем пользователям рабочего пространства.</div>
               <div className="flex justify-end">
                   <button className="text-[#5e6c84] hover:bg-gray-100 px-3 py-1.5 rounded-[3px] text-sm font-medium transition-all">Закрыть</button>
               </div>
            </>
          ) : (
            <>
               <div className="flex items-center gap-2 mb-4 text-[#DE350B]">
                 <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                 <div className="text-xl font-medium text-[#172B4D]">Удалить репозиторий?</div>
               </div>
               <div className="text-sm text-[#5E6C84] mb-6">Безвозвратное удаление. Все данные будут потеряны.</div>
               <div className="flex justify-end gap-2">
                   <button className="text-[#5e6c84] hover:bg-gray-100 px-3 py-1.5 rounded-[3px] text-sm font-medium transition-all">Отмена</button>
                   <button className="bg-[#DE350B] text-white px-4 py-1.5 rounded-[3px] text-sm font-medium transition-all hover:bg-[#BF2600]">Удалить</button>
               </div>
            </>
          )}
        </div>
      ),
      codeContent: `<ModalTransition>\n  <Modal>\n    ... \n  </Modal>\n</ModalTransition>`,
      logicTitle: "Деструктивное диалоговое окно",
      logicDescription: "Предупреждающая иконка слева от заголовка. Кнопка отмены слева, удаления справа (Primary Right). Цвета строго передают суть действия.",
      accessibilityText: "Атрибут role='alertdialog'. Закрытие по клику на фон (blanket) по умолчанию для Alert запрещено.",
      bestPractices: [
        "Не используйте диалоги для длинных форм.",
        "Четко объясните последствия перед удалением.",
        "Сохраняйте кнопки действий по правому краю."
      ]
    },
    {
      title: "IBM Carbon",
      icon: logos.carbon,
      previewType: "button",
      previewContent: (
        <div className={`bg-white border-t-4 ${activeVariant === 'alert' || activeState === 'default' ? 'border-[#da1e28]' : 'border-[#0f62fe]'} w-full max-w-[280px] shadow-lg flex flex-col transform transition-all `}>
          {activeVariant === 'transactional' ? (
            <>
               <div className="p-4 flex-1">
                 <div className="text-xl mb-4 text-[#161616]">Новый ресурс</div>
                 <div className="mb-2">
                    <label className="text-[12px] text-[#525252] mb-1 block">Имя ресурса</label>
                    <input className="w-full bg-[#f4f4f4] border-b border-[#8D8D8D] hover:bg-[#e5e5e5] focus:outline focus:outline-2 focus:outline-[#0f62fe] focus:outline-offset-[-2px] p-2 text-sm outline-none" placeholder={tText('Введите имя')} />
                 </div>
               </div>
               <div className="flex w-full mt-4 border-t border-gray-100">
                   <button className="flex-1 bg-[#393939] text-white py-3 text-sm font-medium hover:bg-[#4c4c4c] transition-all cursor-pointer">Отмена</button>
                   <button className="flex-1 bg-[#0f62fe] text-white py-3 text-sm font-medium hover:bg-[#0353e9] transition-all cursor-pointer">Добавить</button>
               </div>
            </>
          ) : activeVariant === 'acknowledgment' ? (
            <>
               <div className="p-4 flex-1">
                 <div className="text-xl mb-2 text-[#161616]">Сервис добавлен</div>
                 <div className="text-sm text-[#525252]">Сервис аналитики успешно подключен к вашему аккаунту и готов к использованию.</div>
               </div>
               <div className="flex w-full mt-4 border-t border-gray-100">
                   <button className="w-full bg-[#0f62fe] text-white py-3 text-sm font-medium hover:bg-[#0353e9] transition-all cursor-pointer">Закрыть</button>
               </div>
            </>
          ) : (
            <>
               <div className="p-4 flex-1">
                 <div className="text-xl mb-2 text-[#161616]">Удаление сервиса</div>
                 <div className="text-sm text-[#525252]">Вы точно хотите удалить этот сервис? Это повлияет на зависимые базы данных.</div>
               </div>
               <div className="flex w-full mt-4 border-t border-gray-100">
                   <button className="flex-1 bg-white text-[#161616] py-3 text-sm font-medium hover:bg-[#e5e5e5] transition-all cursor-pointer">Отмена</button>
                   <button className="flex-1 bg-[#da1e28] text-white py-3 text-sm font-medium hover:bg-[#ba1b23] transition-all cursor-pointer">Удалить</button>
               </div>
            </>
          )}
        </div>
      ),
      codeContent: `<Modal ${activeVariant === 'alert' || activeState === 'default' ? 'danger' : ''}>\n  <p>${activeVariant === 'transactional' ? 'Новый ресурс' : activeVariant === 'acknowledgment' ? 'Сервис добавлен' : 'Удаление сервиса'}</p>\n</Modal>`,
      logicTitle: "Четкая сетка и 50% Actions",
      logicDescription: "Использует полную ширину для кнопок в нижней части окна. В Carbon кнопки действий занимают по 50% ширины, Primary всегда справа. Деструктивный модал имеет красную рамку или цвет.",
      accessibilityText: "Автоматически ловит фокус (Focus trap active).",
      bestPractices: [
        "Кнопки на 100% ширины в мобильной версии.",
        "Отмена всегда Primary-Secondary структура.",
        "Всегда требуйте подтверждения удалений."
      ]
    },
    {
      title: "Shopify Polaris",
      icon: logos.polaris,
      previewType: "button",
      previewContent: (
        <div className={`bg-white rounded-xl overflow-hidden w-full max-w-[280px] shadow-2xl transform transition-all `}>
          {activeVariant === 'transactional' ? (
            <>
               <div className="px-4 py-3 border-b border-gray-200 text-[#202223] font-semibold">Добавить теги</div>
               <div className="p-4">
                 <input className="w-full border border-gray-300 p-2 rounded-[4px] text-sm outline-none hover:border-gray-400 focus:border-[#008060] focus:ring-1 focus:ring-[#008060]" placeholder="Например, 'летняя_коллекция'" />
               </div>
               <div className="px-4 py-3 border-t border-gray-200 flex justify-end gap-2 bg-gray-50">
                   <button className="border border-gray-300 bg-white text-[#202223] px-4 py-1.5 rounded-[4px] text-sm font-medium hover:bg-gray-50 transition-all shadow-sm cursor-pointer">Отмена</button>
                   <button className="bg-[#008060] text-white px-4 py-1.5 rounded-[4px] text-sm font-medium hover:bg-[#006e52] transition-all shadow-sm cursor-pointer">Сохранить</button>
               </div>
            </>
          ) : activeVariant === 'acknowledgment' ? (
            <>
               <div className="px-4 py-3 border-b border-gray-200 text-[#202223] font-semibold">Экспорт запущен</div>
               <div className="p-4 text-sm text-[#6D7175]">
                 Мы отправим файл с экспортом ваших заказов на email администратора в течение 5 минут.
               </div>
               <div className="px-4 py-3 border-t border-gray-200 flex justify-end gap-2 bg-gray-50">
                   <button className="bg-white border border-gray-300 text-[#202223] px-4 py-1.5 rounded-[4px] text-sm font-medium hover:bg-gray-50 transition-all shadow-sm cursor-pointer">Закрыть</button>
               </div>
            </>
          ) : (
            <>
               <div className="px-4 py-3 border-b border-gray-200 text-[#202223] font-semibold">Удалить товар?</div>
               <div className="p-4 text-sm text-[#6D7175]">
                 Товар "Кофейник" будет навсегда удален из вашего магазина.
               </div>
               <div className="px-4 py-3 border-t border-gray-200 flex justify-end gap-2 bg-gray-50">
                   <button className="border border-gray-300 bg-white text-[#202223] px-4 py-1.5 rounded-[4px] text-sm font-medium hover:bg-gray-50 transition-all shadow-sm cursor-pointer">Отмена</button>
                   <button className="bg-[#D82C0D] text-white px-4 py-1.5 rounded-[4px] text-sm font-medium hover:bg-[#B3240A] transition-all shadow-sm cursor-pointer">Удалить</button>
               </div>
            </>
          )}
        </div>
      ),
      codeContent: `<Modal title="${activeVariant === 'transactional' ? 'Добавить теги' : activeVariant === 'acknowledgment' ? 'Экспорт запущен' : 'Удалить товар?'}">\n  <Modal.Section>...</Modal.Section>\n</Modal>`,
      logicTitle: "Секционная структура",
      logicDescription: "Разделен на четкие секции: заголовок, контент и футер. Primary кнопка всегда выровнена вправо. Действие удаления выделено критическим цветом.",
      accessibilityText: "Управление фокусом гарантирует, что пользователь не взаимодействует с фоном. Закрытие по фону отключено в Destructive Modal.",
      bestPractices: [
        "Используйте короткие заголовки.",
        "Уточните, что именно удаляется в тексте.",
        "Четкое разграничение подвала (футера)."
      ]
    },
    {
      title: "Ant Design",
      icon: logos.ant,
      previewType: "button",
      previewContent: (
        <div className={`bg-white rounded-[8px] p-5 w-full max-w-[280px] shadow-lg transform transition-all `}>
          {activeVariant === 'transactional' ? (
            <>
               <div className="text-[16px] font-semibold text-[#000000a6] mb-4 leading-tight">Отправить приглашение</div>
               <input className="w-full border border-[#d9d9d9] hover:border-[#4096ff] focus:border-[#4096ff] p-2 rounded-[6px] text-sm outline-none mb-6 transition-all" placeholder={tText('Email адрес')} />
               <div className="flex justify-end gap-2">
                   <button className="border border-[#d9d9d9] text-[#000000a6] hover:text-[#1677ff] hover:border-[#1677ff] px-4 py-1 rounded-[6px] text-sm transition-all cursor-pointer">Отмена</button>
                   <button className="bg-[#1677ff] text-white px-4 py-1 rounded-[6px] text-sm hover:bg-[#4096ff] transition-all cursor-pointer shadow-sm">Отправить</button>
               </div>
            </>
          ) : activeVariant === 'acknowledgment' ? (
            <>
               <div className="flex gap-3 mb-2">
                 <div className="mt-0.5 text-[#52c41a]">
                   <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                 </div>
                 <div>
                   <div className="text-[16px] font-semibold text-[#000000a6] mb-2 leading-tight">Операция успешна</div>
                   <div className="text-[14px] text-[#00000073]">Все настройки были применены.</div>
                 </div>
               </div>
               <div className="flex justify-end mt-4">
                   <button className="bg-[#1677ff] text-white px-4 py-1 rounded-[6px] text-sm hover:bg-[#4096ff] transition-all cursor-pointer shadow-sm">OK</button>
               </div>
            </>
          ) : (
            <>
               <div className="flex gap-3 mb-2">
                 <div className="mt-0.5 text-[#FAAD14]">
                   <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                 </div>
                 <div>
                   <div className="text-[16px] font-semibold text-[#000000a6] mb-2 leading-tight">Удалить эту задачу?</div>
                   <div className="text-[14px] text-[#00000073]">Некоторые данные могут быть утеряны навсегда.</div>
                 </div>
               </div>
               <div className="flex justify-end gap-2 mt-4">
                   <button className="border border-[#d9d9d9] text-[#000000a6] hover:text-[#1677ff] hover:border-[#1677ff] px-4 py-1 rounded-[6px] text-sm transition-all cursor-pointer">Отмена</button>
                   <button className="bg-[#ff4d4f] text-white px-4 py-1 rounded-[6px] text-sm hover:bg-[#ff7875] transition-all cursor-pointer shadow-sm">OK</button>
               </div>
            </>
          )}
        </div>
      ),
      codeContent: `Modal.${activeVariant === 'alert' || activeState === 'default' ? 'confirm' : activeVariant === 'acknowledgment' ? 'success' : 'info'}({\n  title: '${activeVariant === 'transactional' ? 'Отправить приглашение' : activeVariant === 'acknowledgment' ? 'Операция успешна' : 'Удалить эту задачу?'}'\n});`,
      logicTitle: "Быстрые диалоги Modal.confirm",
      logicDescription: "Часто используется функция подтверждения с иконкой вопроса или предупреждения. Кнопки находятся справа, OK (или Удалить) — primary aктивная.",
      accessibilityText: "Анти-scrolling на body. Backdrop click можно конфигурировать (маскировка). В destructive - часто maskClosable: false.",
      bestPractices: [
        "Используйте Modal.confirm для быстрых действий.",
        "Для кастомных сложных форм используйте компонент Modal.",
        "У диалогов предупреждения всегда должна быть иконка."
      ]
    }
  ];

  const radioCards: CardData[] = [
    {
      title: "Material Design 3",
      icon: logos.material,
      previewType: "button",
      previewContent: renderRadio("Material Design 3", activeState, tText),
      codeContent: `<Radio \n  checked={true} \n  value="option1" \n/>`,
      logicTitle: "Основная логика",
      logicDescription: "Круглый переключатель. При выборе отображается внутренний закрашенный круг, который масштабируется от 0 до 100%.",
      accessibilityText: "Должен быть сгруппирован с помощью role=\"radiogroup\". Перемещение фокуса между элементами с помощью стрелок.",
      bestPractices: [
        "Используйте для взаимоисключающего выбора.",
        "Выбирайте опцию по умолчанию, когда это возможно.",
        "Располагайте элементы списка вертикально для лучшего чтения."
      ]
    },
    {
      title: "Fluent UI",
      icon: logos.fluent,
      previewType: "button",
      previewContent: renderRadio("Fluent UI", activeState, tText),
      codeContent: `<Radio \n  checked \n  value="apple" \n/>`,
      logicTitle: "Основная логика",
      logicDescription: "Круг с тонкой границей по умолчанию. В активном состоянии граница окрашивается в акцентный цвет, и появляется внутренний круг.",
      accessibilityText: "Атрибут aria-checked обеспечивает передачу состояния программы чтения с экрана.",
      bestPractices: [
        "Текстовые метки должны быть краткими.",
        "Допускается только один активный элемент.",
        "Группировка с четким заголовком Field."
      ]
    },
    {
      title: "Atlassian",
      icon: logos.atlassian,
      previewType: "button",
      previewContent: renderRadio("Atlassian", activeState, tText),
      codeContent: `<Radio \n  isChecked \n  value="option" \n/>`,
      logicTitle: "Основная логика",
      logicDescription: "Компактный размер. По умолчанию белый фон с тонкой границей. При выборе фон меняется, или заполняется внутренний цветной маркер.",
      accessibilityText: "Привязка <label> с htmlFor к идентификатору radio button обязательна для клика по тексту.",
      bestPractices: [
        "Используйте, когда есть менее 5 вариантов выбора.",
        "Всегда предоставляйте метку.",
        "Если варианов больше, рассмотрите select."
      ]
    },
    {
      title: "IBM Carbon",
      icon: logos.carbon,
      previewType: "button",
      previewContent: renderRadio("IBM Carbon", activeState, tText),
      codeContent: `<RadioButton \n  checked \n  value="standard" \n/>`,
      logicTitle: "Основная логика",
      logicDescription: "Строгие формы и четкий контраст. Размер маркера и границы обеспечивает высокую читаемость состояния.",
      accessibilityText: "Фокус-индикатор отрисовывается в виде квадратного outline вокруг метки и переключателя.",
      bestPractices: [
        "Выравнивание кнопок по вертикали предпочтительнее.",
        "Группируйте элементы под понятным заголовком (Legend).",
        "Для двух дочерних вариантов используйте Toggle, а не Radio."
      ]
    },
    {
      title: "Shopify Polaris",
      icon: logos.polaris,
      previewType: "button",
      previewContent: renderRadio("Shopify Polaris", activeState, tText),
      codeContent: `<RadioButton \n  checked \n  id="radio1" \n/>`,
      logicTitle: "Основная логика",
      logicDescription: "Уверенный размер для легкого касания пальцем. Содержит небольшую тень в неактивном состоянии.",
      accessibilityText: "При выборе срабатывает событие onChange. Поддержка aria-describedby для пояснительного текста.",
      bestPractices: [
        "Обеспечьте ясное описание последствий выбора.",
        "Всегда делайте один элемент выбранным заранее, если это не навредит форме.",
        "Выбор из 2-6 опций."
      ]
    },
    {
      title: "Ant Design",
      icon: logos.ant,
      previewType: "button",
      previewContent: renderRadio("Ant Design", activeState, tText),
      codeContent: `<Radio \n  checked \n  value={1} \n/>`,
      logicTitle: "Основная логика",
      logicDescription: "Минималистичный дизайн с плавными анимациями включения и изменения цвета границы при наведении.",
      accessibilityText: "Keyboard navigation поддерживается из коробки (Space для выбора, Tab для фокуса).",
      bestPractices: [
        "Используйте Radio.Group для управления состоянием.",
        "Можно стилизовать как кнопки для компактности.",
        "Рекомендуется использовать для статических и легко сравниваемых опций."
      ]
    }
  ];

  const tagCards: CardData[] = [
    {
      title: "Material Design 3",
      icon: logos.material,
      previewType: "button",
      previewContent: renderTag("Material Design 3", activeState, tText),
      codeContent: `<Chip \n  label="Новый" \n/>`,
      logicTitle: "Основная логика",
      logicDescription: "Крупные закругленные чипы (8px радиус) для фильтров, выбора или ввода. Высота 32px обеспечивает удобство на сенсорных экранах.",
      accessibilityText: "Должны иметь role=\"button\" или role=\"option\" в зависимости от контекста использования.",
      bestPractices: [
        "Используйте для компактного отображения атрибутов.",
        "Для списков фильтров используйте горизонтальную прокрутку.",
        "Избегайте слишком длинных текстов внутри чипа."
      ]
    },
    {
      title: "Fluent UI",
      icon: logos.fluent,
      previewType: "button",
      previewContent: renderTag("Fluent UI", activeState, tText),
      codeContent: `<Tag>Новый</Tag>`,
      logicTitle: "Основная логика",
      logicDescription: "Компактные теги с легким серым фоном и небольшим скруглением. Отлично подходят для метаданных.",
      accessibilityText: "Убедитесь, что цвета фона тега контрастируют с общим фоном страницы.",
      bestPractices: [
        "Держите метки короткими (обычно 1-2 слова).",
        "Используйте разные цвета для обозначения статусов.",
        "Не используйте как замену кнопкам."
      ]
    },
    {
      title: "Atlassian",
      icon: logos.atlassian,
      previewType: "button",
      previewContent: renderTag("Atlassian", activeState, tText),
      codeContent: `<Lozenge>Новый</Lozenge>`,
      logicTitle: "Основная логика",
      logicDescription: "Lozenges (Ромбы) используются для выделения состояний или свойств. Имеют жирный uppercase текст для яркости.",
      accessibilityText: "Из-за небольшого размера, лозенжи должны иметь четкий и читаемый текст.",
      bestPractices: [
        "Отлично подходят для статусов задач (To Do, In Progress).",
        "Избегайте использования в качестве кликабельных элементов.",
        "Держите длину текста до минимума."
      ]
    },
    {
      title: "IBM Carbon",
      icon: logos.carbon,
      previewType: "button",
      previewContent: renderTag("IBM Carbon", activeState, tText),
      codeContent: `<Tag type="gray">Новый</Tag>`,
      logicTitle: "Основная логика",
      logicDescription: "Полностью закругленные края (pill shape) для отличия от обычных кнопок. Четкий контур фокуса.",
      accessibilityText: "Теги могут быть интерактивными. В этом случае они должны получать фокус с клавиатуры.",
      bestPractices: [
        "Используйте для ключевых слов, категорий или выделения данных.",
        "Не используйте для отображения больших фрагментов текста.",
        "Предоставьте крестик для закрытия, если тег можно удалить."
      ]
    },
    {
      title: "Shopify Polaris",
      icon: logos.polaris,
      previewType: "button",
      previewContent: renderTag("Shopify Polaris", activeState, tText),
      codeContent: `<Badge>Новый</Badge>`,
      logicTitle: "Основная логика",
      logicDescription: "Бейджи (Badges) используются для маркировки или классификации элементов. Слегка скругленные углы и спокойные цвета.",
      accessibilityText: "Используйте aria-label для уточнения контекста, если цвет несет смысловую нагрузку.",
      bestPractices: [
        "Располагайте бейджи рядом с релевантным текстом.",
        "Используйте цветовое кодирование логично (зеленый - успех, красный - ошибка).",
        "Не перегружайте интерфейс большим количеством бейджей."
      ]
    },
    {
      title: "Ant Design",
      icon: logos.ant,
      previewType: "button",
      previewContent: renderTag("Ant Design", activeState, tText),
      codeContent: `<Tag>Новый</Tag>`,
      logicTitle: "Основная логика",
      logicDescription: "Цветная рамка и светлый фон. Компактный дизайн (высота 22px), который легко вписывается в плотные таблицы данных.",
      accessibilityText: "Закрываемые теги должны иметь aria-label на кнопке закрытия.",
      bestPractices: [
        "Широко используются в таблицах для отображения статусов.",
        "Позволяют пользователю быстро визуально классифицировать данные.",
        "Поддерживают разнообразную палитру цветов из коробки."
      ]
    }
  ];

  const allCards = 
    activeComponent === 'button' ? buttonCards : 
    activeComponent === 'input' ? inputCards : 
    activeComponent === 'switch' ? switchCards : 
    activeComponent === 'select' ? selectCards : 
    activeComponent === 'radio' ? radioCards : 
    activeComponent === 'tag' ? tagCards : 
    activeComponent === 'datepicker' ? datepickerCards : 
    activeComponent === 'modal' ? modalCards : [];

  const filteredCards = allCards.filter(card => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-8">
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCards.map((card, index) => (
            <ComparisonCard 
              key={index}
              title={card.title}
              icon={card.icon}
              previewType={card.previewType}
              previewContent={card.previewContent}
              codeContent={card.codeContent}
              logicTitle={card.logicTitle}
              logicDescription={card.logicDescription}
              accessibilityText={card.accessibilityText}
              bestPractices={card.bestPractices}
              designTokens={getDesignTokens(card.title, activeComponent as ComponentType, activeVariant as ComponentVariant, activeState as ComponentState)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
          Дизайн-система "{searchQuery}" не найдена
        </div>
      )}
    </section>
  );
}
