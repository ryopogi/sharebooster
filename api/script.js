export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello from the backend!' });
  } else if (req.method === 'POST') {
    const data = req.body;
    res.status(200).json({ received: data });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
