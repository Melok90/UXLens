import fs from 'fs';

let content = fs.readFileSync('src/components/ComparisonGrid.tsx', 'utf8');

const replacement = `  const modalCards: CardData[] = [
    {
      title: "Material Design 3",
      icon: logos.material,
      previewType: "button",
      previewContent: (
        <div className={\`bg-[#ECE6F0] rounded-[28px] p-6 w-full max-w-[280px] shadow-sm transform transition-all translate-y-0 \`}>
          {activeState === 'transactional' ? (
            <>
               <div className="text-xl mb-4 text-[#1D1B20]">Новый проект</div>
               <input className="w-full bg-[#E7E0EC] border-b border-[#49454F] p-3 rounded-t-md mb-6 outline-none text-sm" placeholder="Название проекта" />
               <div className="flex justify-end gap-2 text-sm font-medium">
                   <button className="text-[#6750A4] px-3 py-2 cursor-pointer transition-colors hover:bg-black/5 rounded-full">Отмена</button>
                   <button className="bg-[#6750A4] text-white px-4 py-2 cursor-pointer transition-colors hover:bg-opacity-90 rounded-full">Создать</button>
               </div>
            </>
          ) : activeState === 'acknowledgment' ? (
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
      codeContent: \`<AlertDialog>\\n  <AlertDialogTitle>Удалить данные?</AlertDialogTitle>\\n  <AlertDialogContent>...</AlertDialogContent>\\n</AlertDialog>\`,
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
        <div className={\`bg-white border rounded-[8px] p-5 w-full max-w-[280px] shadow-lg transform transition-all \`}>
          {activeState === 'transactional' ? (
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
          ) : activeState === 'acknowledgment' ? (
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
      codeContent: \`<Dialog>\\n  <DialogTitle>Удалить файл?</DialogTitle>\\n  <DialogSurface>...</DialogSurface>\\n</Dialog>\`,
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
        <div className={\`bg-white rounded-[3px] p-6 w-full max-w-[280px] shadow-2xl transform transition-all \`}>
          {activeState === 'transactional' ? (
            <>
               <div className="text-xl font-medium text-[#172B4D] mb-4">Создать задачу</div>
               <input className="w-full border-2 border-[#DFE1E6] hover:bg-[#EBECF0] focus:border-[#4C90FF] focus:bg-white p-2 rounded-[3px] mb-6 outline-none text-sm transition-colors" placeholder="Краткое описание" />
               <div className="flex justify-end gap-2">
                   <button className="text-[#5e6c84] hover:bg-gray-100 px-3 py-1.5 rounded-[3px] text-sm font-medium transition-all">Отмена</button>
                   <button className="bg-[#0052CC] text-white px-4 py-1.5 rounded-[3px] text-sm font-medium transition-all hover:bg-[#0065FF]">Создать</button>
               </div>
            </>
          ) : activeState === 'acknowledgment' ? (
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
      codeContent: \`<ModalTransition>\\n  <Modal>\\n    ... \\n  </Modal>\\n</ModalTransition>\`,
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
        <div className={\`bg-white border-t-4 \${activeState === 'alert' || activeState === 'default' ? 'border-[#da1e28]' : 'border-[#0f62fe]'} w-full max-w-[280px] shadow-lg flex flex-col transform transition-all \`}>
          {activeState === 'transactional' ? (
            <>
               <div className="p-4 flex-1">
                 <div className="text-xl mb-4 text-[#161616]">Новый ресурс</div>
                 <div className="mb-2">
                    <label className="text-[12px] text-[#525252] mb-1 block">Имя ресурса</label>
                    <input className="w-full bg-[#f4f4f4] border-b border-[#8D8D8D] hover:bg-[#e5e5e5] focus:outline focus:outline-2 focus:outline-[#0f62fe] focus:outline-offset-[-2px] p-2 text-sm outline-none" placeholder="Введите имя" />
                 </div>
               </div>
               <div className="flex w-full mt-4 border-t border-gray-100">
                   <button className="flex-1 bg-[#393939] text-white py-3 text-sm font-medium hover:bg-[#4c4c4c] transition-all cursor-pointer">Отмена</button>
                   <button className="flex-1 bg-[#0f62fe] text-white py-3 text-sm font-medium hover:bg-[#0353e9] transition-all cursor-pointer">Добавить</button>
               </div>
            </>
          ) : activeState === 'acknowledgment' ? (
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
      codeContent: \`<Modal \${activeState === 'alert' || activeState === 'default' ? 'danger' : ''}>\\n  <p>\${activeState === 'transactional' ? 'Новый ресурс' : activeState === 'acknowledgment' ? 'Сервис добавлен' : 'Удаление сервиса'}</p>\\n</Modal>\`,
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
        <div className={\`bg-white rounded-xl overflow-hidden w-full max-w-[280px] shadow-2xl transform transition-all \`}>
          {activeState === 'transactional' ? (
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
          ) : activeState === 'acknowledgment' ? (
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
      codeContent: \`<Modal title="\${activeState === 'transactional' ? 'Добавить теги' : activeState === 'acknowledgment' ? 'Экспорт запущен' : 'Удалить товар?'}">\\n  <Modal.Section>...</Modal.Section>\\n</Modal>\`,
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
        <div className={\`bg-white rounded-[8px] p-5 w-full max-w-[280px] shadow-lg transform transition-all \`}>
          {activeState === 'transactional' ? (
            <>
               <div className="text-[16px] font-semibold text-[#000000a6] mb-4 leading-tight">Отправить приглашение</div>
               <input className="w-full border border-[#d9d9d9] hover:border-[#4096ff] focus:border-[#4096ff] p-2 rounded-[6px] text-sm outline-none mb-6 transition-all" placeholder="Email адрес" />
               <div className="flex justify-end gap-2">
                   <button className="border border-[#d9d9d9] text-[#000000a6] hover:text-[#1677ff] hover:border-[#1677ff] px-4 py-1 rounded-[6px] text-sm transition-all cursor-pointer">Отмена</button>
                   <button className="bg-[#1677ff] text-white px-4 py-1 rounded-[6px] text-sm hover:bg-[#4096ff] transition-all cursor-pointer shadow-sm">Отправить</button>
               </div>
            </>
          ) : activeState === 'acknowledgment' ? (
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
      codeContent: \`Modal.\${activeState === 'alert' || activeState === 'default' ? 'confirm' : activeState === 'acknowledgment' ? 'success' : 'info'}({\\n  title: '\${activeState === 'transactional' ? 'Отправить приглашение' : activeState === 'acknowledgment' ? 'Операция успешна' : 'Удалить эту задачу?'}'\\n});\`,
      logicTitle: "Быстрые диалоги Modal.confirm",
      logicDescription: "Часто используется функция подтверждения с иконкой вопроса или предупреждения. Кнопки находятся справа, OK (или Удалить) — primary aктивная.",
      accessibilityText: "Анти-scrolling на body. Backdrop click можно конфигурировать (маскировка). В destructive - часто maskClosable: false.",
      bestPractices: [
        "Используйте Modal.confirm для быстрых действий.",
        "Для кастомных сложных форм используйте компонент Modal.",
        "У диалогов предупреждения всегда должна быть иконка."
      ]
    }
  ];`;

const startIndex = content.indexOf('  const modalCards: CardData[] = [');
const endIndexStr = '  const allCards = ';
const endIndex = content.indexOf(endIndexStr);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + replacement + '\n\n' + content.substring(endIndex);
  fs.writeFileSync('src/components/ComparisonGrid.tsx', content);
  console.log('Script ran successfully');
} else {
  console.log('Could not find boundaries', startIndex, endIndex);
}
