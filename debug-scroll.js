const { spawn } = require('child_process');
const http = require('http');

console.log("Starting headless Chrome...");
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  '--user-data-dir=c:\\Users\\bajra\\OneDrive\\Desktop\\iphone-claude\\.chrome-profile'
]);

chrome.stderr.on('data', (data) => {
  const msg = data.toString();
  if (msg.includes('DevTools listening on')) {
    setTimeout(startDebugging, 1000);
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

async function startDebugging() {
  try {
    const list = await getJSON('http://127.0.0.1:9222/json/list');
    const tab = list[0];
    console.log("Connecting to tab:", tab.webSocketDebuggerUrl);

    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    ws.onopen = () => {
      console.log("Connected to Chrome DevTools!");
      ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
      
      // Navigate to localhost:3001
      console.log("Navigating to http://localhost:3001...");
      ws.send(JSON.stringify({
        id: 4,
        method: 'Page.navigate',
        params: { url: 'http://localhost:3001' }
      }));

      // Scroll to trigger WhyAppleSection scroll listeners
      setTimeout(() => {
        console.log("Triggering scroll event in browser...");
        ws.send(JSON.stringify({
          id: 5,
          method: 'Runtime.evaluate',
          params: {
            expression: 'window.scrollTo(0, 11000); console.log("BROWSER: Scrolled page to 11000px");'
          }
        }));
      }, 5000);
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Console.messageAdded') {
        const text = msg.params.message.text;
        const level = msg.params.message.level;
        console.log(`[BROWSER CONSOLE - ${level.toUpperCase()}] ${text}`);
      } else if (msg.method === 'Runtime.exceptionThrown') {
        const details = msg.params.exceptionDetails;
        console.error(`[BROWSER RUNTIME ERROR]`, details.exception?.description || details.text);
      }
    };

    ws.onerror = (err) => {
      console.error("WS Error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    setTimeout(() => {
      console.log("Closing Chrome...");
      chrome.kill();
      process.exit(0);
    }, 9000);

  } catch (err) {
    console.error("Failed to connect:", err);
    chrome.kill();
    process.exit(1);
  }
}

setTimeout(() => {
  console.log("Timeout reached. Closing Chrome...");
  chrome.kill();
  process.exit(1);
}, 14000);
