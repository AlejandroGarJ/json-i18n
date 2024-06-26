import puppeteer from 'puppeteer';
export async function getTranslation(inputLanguage, textToTranslate, language) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
        textToTranslate = textToTranslate.replace(/ /g, '+');
        const url = `https://translate.google.com/?hl=es&sl=${inputLanguage}&tl=${language}&text=${textToTranslate}`;
        await page.goto(url);
        await page.waitForSelector('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.XWZjwc');
        await page.click('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.XWZjwc');
        try {
            await page.waitForSelector('.ryNqvb', { timeout: 5000 });
            const text = await page.evaluate(() => {
                const textContainers = document.querySelectorAll('.ryNqvb');
                let concatenatedText = '';
                textContainers.forEach(container => {
                    concatenatedText += (container.textContent?.trim() ?? '') + ' ';
                });
                return concatenatedText.trim();
            });
            return text;
        }
        catch (error) {
            /*If the translations has two gender types, it will do this, for example 'You are good' in spanish has to translations:
            'Eres bueno' and 'Eres buena' we take the masculine one*/
            await page.waitForSelector('.HwtZe');
            const text = await page.evaluate(() => {
                const textContainers = document.querySelectorAll('.HwtZe');
                const lastContainer = textContainers[textContainers.length - 1];
                return lastContainer.textContent?.trim() ?? '';
            });
            return text;
        }
    }
    catch (error) {
        console.error('Error while obtaining the translations', error);
        return '';
    }
    finally {
        await browser.close();
    }
}
//# sourceMappingURL=translate.js.map