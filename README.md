# Puppeteer Google Payment PDF Invoice Downloader

Basic puppeteer app that will download your Google Payment PDF invoices.
By default you have to log-in every month and manually download them. This
script can be run manually to free you having to click through the UI.

## Running

Make sure you have Google Chrome running and are logged in to your google
account. Make sure to enable remote debugging. For mac you can use the command
`make start_chrome`

Change the ID in the script matching your google payments profile ID.

Then run `make download_invoices`

Hopefully this becomes obsolete once
https://issuetracker.google.com/issues/180626058 is fixed.
