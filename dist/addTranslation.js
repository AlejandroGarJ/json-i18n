import chalk from 'chalk';
import readline from 'readline';
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const translationsJSON = require('../assets/translations.json');
import { getTranslation } from './translate.js';
// Definición del archivo JSON de traducciones
const translationsPath = './assets/translations.json';
// Crear interfaz readline para entrada/salida
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Función para preguntar por la clave de traducción
function askTranslationKey() {
    rl.question(chalk.blue('Enter your translation key: '), (answer) => {
        // Leer el archivo JSON de traducciones
        // Verificar si la clave de traducción ya existe
        if (translationsJSON.hasOwnProperty(answer)) {
            console.log(chalk.red('Translation key already exists'));
            askTranslationKey(); // Volver a preguntar recursivamente
        }
        else {
            console.log(chalk.green('Translation key correct'));
            // Preguntar por el texto en inglés
            rl.question(chalk.blue('Enter the text value in English: '), async (englishText) => {
                translationsJSON[answer] = { 'en': englishText };
                for (let lang in translationsJSON.languages) {
                    if (lang !== 'en') {
                        const translation = await getTranslation('en', englishText, lang);
                        translationsJSON[answer][lang] = translation;
                    }
                }
                // Escribir el archivo JSON actualizado
                fs.writeFile(translationsPath, JSON.stringify(translationsJSON, null, 2), (err) => {
                    if (err) {
                        console.error(chalk.red(`Error writing translations file: ${err.message}`));
                    }
                    else {
                        console.log(chalk.green('Translation added successfully!'));
                    }
                    rl.close(); // Cerrar la interfaz readline al finalizar
                });
            });
        }
    });
}
// Iniciar el proceso de pregunta de clave de traducción
askTranslationKey();
//# sourceMappingURL=addTranslation.js.map