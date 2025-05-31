const response = await fetch('/api/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token, url, amount, cookie, interval, server: serverValue })
});
