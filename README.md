# json-i18n

_Node.js library for efficiently handling JSON translations. Use Puppeteer with Google Translate for accurate and up-to-date translations. Ideal for projects with automated i18n needs."_

## Starting 🚀

_This instructions will able you to install this translations package on your proyect_

### Prerequisites

What things you need to install the software and how to install them:
- Node.js (version >= 12.0.0)
- npm (Node Package Manager)

## Installation

You can install `json-i18n-gt` using npm:

```bash
npm install json-i18n-gt
```

Install all the dependencies:

```bash
npm install
```

## Usage ⌨️

You can use `json-i18n-gt` to translate JSON keys from English to any other language available on Google Translator. It works directly from cli commands, adding the translation key and the english text, it will translate it to de languages selected. It starts with spanish, the JSON structure is this:
```json
{
  "languages": {
    "en": "en",
    "es": ""
  },
  "translation_key": {
  "en": "english_text_input",
  "es": "spanish_translation"
  }
}
```

### Add a new Tanslation

```bash
npm run add-translation
```
First you will have to write the translation key that you want, then the text in english. This text will be translated into the languages that you have inside "languages".

### Add a new Language

```bash
npm run add-language
```
This will show a list of the available languages (133). Next you will have to write the language prefix (it is shown in the language list).


## Note 📝

By default, `json-i18n-gt` stores translations in a JSON file (`translations.json`) located within the `node_modules/json-i18n-gt/assets` directory. Since `node_modules` is typically ignored by Git via `.gitignore`, it's important to include the translations file in version control manually.

### Adding translations.json to .gitignore

To ensure that `translations.json` is included in version control, add the following line to your project's `.gitignore` file:

```plaintext
!node_modules/json-i18n-gt/assets/translations.json
```
This problem will be solved in future updates.