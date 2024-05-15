start_chrome:
	/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 &

download_invoices:
	npm run start

wait:
	sleep 5

run: start_chrome wait download_invoices
