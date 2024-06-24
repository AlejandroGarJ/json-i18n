import puppeteer from 'puppeteer';
async function translate() {
    const browser = await puppeteer.launch({
        headless: false, // Cambiar a true si deseas que sea headless
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com');
    // Aquí puedes continuar con el resto de tu lógica usando Puppeteer
}
console.log("Hola");
console.log("Hola");
//# sourceMappingURL=translate.js.map