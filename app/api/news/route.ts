import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "finance";
  const q = (searchParams.get("q") || "").trim();

  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing NEWS_API_KEY" },
      { status: 500 }
    );
  }

  const query = q || category;
  const url = `https://newsapi.org/v2/everything?` +
              new URLSearchParams({
                q: query,
                language: "en",
                sortBy: "publishedAt",
                pageSize: "9",
                apiKey,
              });

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "NewsAPI request failed", details: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    if (data?.status !== "ok" || !Array.isArray(data?.articles)) {
      return NextResponse.json({ articles: [] }, { status: 200 });
    }

    return NextResponse.json({ articles: data.articles }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected error", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
