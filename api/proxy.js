export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("Missing url query parameter");
  }
  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType);
    const body = await response.arrayBuffer();
    res.send(Buffer.from(body));
  } catch (error) {
    res.status(500).send("Error fetching the target URL");
  }
}
