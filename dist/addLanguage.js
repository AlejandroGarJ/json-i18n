import { getLanguages } from './getAvailableLanguages.js';
import readline from 'readline';
import chalk from 'chalk';
import { createRequire } from 'module';
import fs from 'fs';
import { getTranslation } from './translate.js';
const require = createRequire(import.meta.url);
const translationsJSON = require('../assets/translations.json');
const languages = await getLanguages();
// Parse languages into an array of objetcs 
const languagesArray = Object.entries(languages).map(([prefix, language]) => ({ prefix, language }));
// Delete auto-detect language
languagesArray.shift();
console.log(chalk.blue("This are the available languages:"));
languagesArray.forEach(language => {
    console.log(language);
});
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askLanguagePrefix() {
    return new Promise((resolve) => {
        rl.question(chalk.blue('Enter the prefix of the language you want to add: '), (answer) => {
            if (languagesArray.some(language => language.prefix === answer)) {
                let languageRepeats = false;
                // Check if user already has the language
                for (let key in translationsJSON.languages) {
                    if (answer == key)
                        languageRepeats = true;
                }
                if (languageRepeats) {
                    console.log(chalk.red('You already have that language'));
                    askLanguagePrefix().then(resolve);
                }
                else {
                    resolve(answer);
                }
            }
            else {
                console.log(chalk.red('Invalid prefix. Please enter a valid prefix.'));
                askLanguagePrefix().then(resolve);
            }
        });
    });
}
const answer = await askLanguagePrefix();
console.log(chalk.yellow('Selected prefix:', answer));
rl.close();
// Add the prefix to every translation key:
for (let key in translationsJSON) {
    translationsJSON[key][answer] = "";
}
const keys = Object.keys(translationsJSON).filter(key => key !== 'languages');
const englishWords = keys.map(key => ({ clave: key, valor: translationsJSON[key]["en"] }));
for (const item of englishWords) {
    const translation = await getTranslation('en', item.valor, answer);
    const translationKey = item.clave;
    translationsJSON[translationKey].answer = translation;
}
fs.writeFileSync('./assets/translations.json', JSON.stringify(translationsJSON, null, 2));
console.log(chalk.italic("Language added correctly"));
process.exit();
//# sourceMappingURL=addLanguage.js.map