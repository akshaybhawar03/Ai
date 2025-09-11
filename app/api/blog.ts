// pages/api/blogs.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    { slug: "finance-tips" },
    { slug: "crypto-trends" },
    { slug: "stock-analysis" },
  ]);
}
