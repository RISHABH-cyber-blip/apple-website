const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

console.log("Starting headless Chrome for screenshot...");
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1200,800',
  '--user-data-dir=c:\\Users\\bajra\\OneDrive\\Desktop\\iphone-claude\\.chrome-profile'
]);

chrome.stderr.on('data', (data) => {
  const msg = data.toString();
  if (msg.includes('DevTools listening on')) {
    setTimeout(capture, 1000);
  }
});

function getJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function sendCDP(ws, id, method, params = {}) {
  return new Promise((resolve) => {
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function capture() {
  try {
    const list = await getJSON('http://127.0.0.1:9222/json/list');
    const tab = list[0];
    console.log("Connecting to tab:", tab.webSocketDebuggerUrl);

    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    ws.onopen = async () => {
      console.log("Connected! Enabling Page & Runtime...");
      await sendCDP(ws, 1, 'Page.enable');
      await sendCDP(ws, 2, 'Runtime.enable');

      console.log("Navigating to http://localhost:3001...");
      await sendCDP(ws, 3, 'Page.navigate', { url: 'http://localhost:3001' });

      // Wait 5 seconds for page load & hydration
      console.log("Waiting for page load...");
      await new Promise(r => setTimeout(r, 5000));

      // Scroll to the WhyAppleSection (around 10200px)
      console.log("Scrolling to 10200px...");
      await sendCDP(ws, 4, 'Runtime.evaluate', {
        expression: 'window.scrollTo(0, 10200);'
      });

      // Wait 1.5 seconds for scroll and animation to settle
      await new Promise(r => setTimeout(r, 15000));

      // Capture screenshot
      console.log("Capturing screenshot...");
      const result = await sendCDP(ws, 5, 'Page.captureScreenshot', { format: 'png' });
      
      const buffer = Buffer.from(result.data, 'base64');
      fs.writeFileSync('c:\\Users\\bajra\\OneDrive\\Desktop\\iphone-claude\\screenshot.png', buffer);
      console.log("Screenshot saved to screenshot.png!");

      chrome.kill();
      process.exit(0);
    };

  } catch (err) {
    console.error("Screenshot script failed:", err);
    chrome.kill();
    process.exit(1);
  }
}
