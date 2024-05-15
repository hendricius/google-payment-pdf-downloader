const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.connect({
        browserURL: 'http://127.0.0.1:9222',
        defaultViewport: null
    });

    const pages = await browser.pages();
    const page = pages.length ? pages[0] : await browser.newPage();

    await downloadGoogle(page, browser);

    await browser.disconnect();
})();

async function downloadGoogle(page, browser) {
    const paymentsUrl = 'https://payments.google.com/gp/w/u/0/home/activity?sctid=XXXXXXXXXXXXXXX';
    await page.goto(paymentsUrl);
    await page.reload();

    await page.waitForSelector('iframe');
    const elementHandle = await page.$('iframe');
    const initialFrame = await elementHandle.contentFrame();
    const invoicesTableSelector = 'table.b3id-widget-table.b3-widget-table';
    await initialFrame.waitForSelector(invoicesTableSelector);
    const invoiceEntriesSelector = '.b3id-widget-table.b3-widget-table tr > td:first-of-type > div';
    const invoiceCount = (await initialFrame.$$(invoiceEntriesSelector)).length;

    for (let i = 0; i < invoiceCount; i++) {
        await page.waitForSelector('iframe');
        const elementHandle = await page.$('iframe');
        const frame = await elementHandle.contentFrame();
        await frame.waitForSelector(invoicesTableSelector);
        const invoices = await frame.$$(invoiceEntriesSelector);
        await frame.$$(invoiceEntriesSelector);
        const firstInvoice = invoices[i];
        await firstInvoice.click();

        const downloadButtonSelector = '.b3id-timeline-view-section.expanded div[role=button]'
        await frame.waitForSelector(downloadButtonSelector);
        const invoiceDownloadButton = await frame.$(downloadButtonSelector);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await invoiceDownloadButton.click();

        // Reload page to make sure the iFrame is reset
        await page.reload();
    }
    return true;
}
