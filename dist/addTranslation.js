import chalk from 'chalk';
import readline from 'readline';
import fs from 'fs';
// Import de translations JSON
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const translationsJSON = require('../assets/translations.json');
import { getTranslation } from './translate.js';
const translationsPath = './assets/translations.json';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askTranslationKey() {
    rl.question(chalk.blue('Enter your translation key: '), (answer) => {
        if (translationsJSON.hasOwnProperty(answer)) {
            console.log(chalk.red('Translation key already exists'));
            askTranslationKey(); // Call the function recursively 
        }
        else {
            console.log(chalk.green('Translation key correct'));
            rl.question(chalk.blue('Enter the text value in English: '), async (englishText) => {
                translationsJSON[answer] = { 'en': englishText };
                for (let lang in translationsJSON.languages) {
                    if (lang !== 'en') {
                        const translation = await getTranslation('en', englishText, lang);
                        translationsJSON[answer][lang] = translation;
                    }
                }
                fs.writeFile(translationsPath, JSON.stringify(translationsJSON, null, 2), (err) => {
                    if (err) {
                        console.error(chalk.red(`Error writing translations file: ${err.message}`));
                    }
                    else {
                        console.log(chalk.green('Translation added successfully!'));
                    }
                    rl.close();
                });
            });
        }
    });
}
askTranslationKey();
//# sourceMappingURL=addTranslation.js.map