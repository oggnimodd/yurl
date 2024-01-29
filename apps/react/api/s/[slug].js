import axios from "axios";
import superjson from "superjson";

export default async function (req, res) {
  const api = axios.create({
    baseURL: process.env.VITE_APP_TRPC_URL || "http://localhost:8080/trpc",
  });

  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({
      error: "Error: Missing slug? Remember that urls start like this: /s/slug",
    });
  }

  const input = JSON.stringify({ 0: { json: { linkId: slug } } });

  const singleLinkResponse = await api.get(
    `/link.singleLink?batch=1&input=${input}`,
    {
      params: {
        slug: slug,
      },
    },
  );

  const details = await singleLinkResponse.data;

  if (!details || !details[0]) {
    return res.status(404).json({
      error: "Error: Link not found or removed",
    });
  }

  const url = superjson.deserialize(details[0].result.data).url;

  return res.status(302).redirect(url);
}
