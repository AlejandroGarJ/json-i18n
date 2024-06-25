import { getLanguages } from './getAvailableLanguages.js';
import readline from 'readline';
import chalk from 'chalk';
import { createRequire } from 'module';
import fs from 'fs';
import { getTranslation } from './translate.js';
import cliSpinners from 'cli-spinners';
// Import the translations JSON
const require = createRequire(import.meta.url);
const translationsJSON = require('../assets/translations.json');
// Get the language list ({ prefix, value }) ---> { 'en' : 'English }
const spinner = cliSpinners.clock;
const interval = setInterval(() => {
    process.stdout.write(`\r${spinner.frames[Date.now() % spinner.frames.length]} Getting available languages...`);
}, spinner.interval);
const languages = await getLanguages();
// Parse languages into an array of objects 
const languagesArray = Object.entries(languages).map(([prefix, language]) => ({ prefix, language }));
// Delete auto-detect language
languagesArray.shift();
clearInterval(interval);
process.stdout.write(`\r${chalk.green('This are the available languages:')}\n`);
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
const interval2 = setInterval(() => {
    process.stdout.write(`\r${spinner.frames[Date.now() % spinner.frames.length]} Language selected: ${answer}`);
}, spinner.interval);
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
    translationsJSON[translationKey][answer] = translation;
}
fs.writeFileSync('./assets/translations.json', JSON.stringify(translationsJSON, null, 2));
clearInterval(interval2);
process.stdout.write(`\r${chalk.green.italic('Language added successfully!')}\n`);
process.exit();
//# sourceMappingURL=addLanguage.js.map