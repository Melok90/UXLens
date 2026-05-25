import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/contexts/LanguageContext.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/\"filters\.radio\": \"Radio Button\",/g, '\"filters.radio\": \"Radio Button\",\n    \"filters.tag\": \"Tag\",');

content = content.replace(/\"filters\.radio\": \"Радиокнопка\",/g, '\"filters.radio\": \"Радиокнопка\",\n    \"filters.tag\": \"Тег\",');

// If previous step didn't add "Радиокнопка", let's handle that by using "Modal" anchor if needed
if (!content.includes('"filters.tag": "Tag"')) {
    content = content.replace(/\"filters\.modal\": \"Modal\",/g, '\"filters.modal\": \"Modal\",\n    \"filters.tag\": \"Tag\",');
}
if (!content.includes('"filters.tag": "Тег"')) {
    content = content.replace(/\"filters\.modal\": \"Модальное окно\",/g, '\"filters.modal\": \"Модальное окно\",\n    \"filters.tag\": \"Тег\",');
}

fs.writeFileSync(filePath, content, 'utf8');
