export default function handler(req, res) {
  res.status(200).json({ hello: 'centsaving', version: 1.1 });
}
