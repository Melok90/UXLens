import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/contexts/LanguageContext.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/\"filters\.modal\": \"Modal\",/g, '\"filters.modal\": \"Modal\",\n    \"filters.radio\": \"Radio Button\",');

fs.writeFileSync(filePath, content, 'utf8');
