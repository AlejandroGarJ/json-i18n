import chalk from 'chalk';
import readline from 'readline';
import translationsJSON from '../assets/translations.json' assert { type: "json" };
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question(chalk.blue('Enter your translation key: '), (answer) => {
    /* console.log(chalk.yellow(`Translation key entered: ${answer}`)); */
    console.log(translationsJSON.key1.es);
    rl.close();
});
//# sourceMappingURL=addTranslation.js.map