"use client";

import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import jsPDF from "jspdf";

// Agar tumhare paas shadcn Button nahi hai to ye simple button use karo
function MyButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded font-medium transition ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      } text-white ${className}`}
    >
      {children}
    </button>
  );
}

export default function AiSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState("medium");
  const [style, setStyle] = useState("formal");
  const [language, setLanguage] = useState("auto");
  const [loading, setLoading] = useState(false);

  // Word count helper
  const wordCount = (str: string) =>
    str.trim().length > 0 ? str.trim().split(/\s+/).length : 0;

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, length, style, language }),
      });

      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
      } else {
        setSummary("⚠️ Failed to generate summary.");
      }
    } catch (err) {
      console.error("Error summarizing:", err);
      setSummary("❌ Error occurred while summarizing.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard
      .writeText(summary)
      .then(() => alert("✅ Summary copied!"))
      .catch((err) => {
        console.error("Clipboard error:", err);
        alert("❌ Failed to copy!");
      });
  };

  const handleDownload = () => {
    if (!summary) return;

    const doc = new jsPDF();

    const img = new Image();
    img.src = "/icons/ai-finance.png"; // Public folder path

    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const imgWidth = 40;
      const imgHeight = 40;
      const x = (pageWidth - imgWidth) / 2;
      const y = 10;

      // Add logo
      doc.addImage(img, "JPEG", x, y, imgWidth, imgHeight);

      // Add Title
      doc.setFontSize(16);
      doc.text("AI Summary", pageWidth / 2, y + imgHeight + 12, {
        align: "center",
      });

      // Add Summary Text
      doc.setFontSize(12);
      doc.text(summary, 10, y + imgHeight + 30, { maxWidth: 180 });

      // Save
      doc.save("summary.pdf");
    };

    img.onerror = () => {
      console.error("❌ Logo not found in /public folder.");
      alert("Logo not found! Make sure 'Ai Finance.jpg' is inside /public/");
    };
  };

  return (
    <div className="p-6 max-w-3xl mx-auto dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">📄 AI Summarizer</h1>

      <textarea
        className="w-full p-3 border rounded mb-4 dark:bg-gray-800 dark:border-gray-600"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="✍️ Enter your text here..."
      />

      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>

        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="auto">Auto Detect</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
        </select>
      </div>

      <MyButton
        onClick={handleSummarize}
        disabled={loading || !text.trim()}
        className="w-full mb-4"
      >
        {loading ? "⏳ Summarizing..." : "✨ Summarize"}
      </MyButton>

      {summary && (
        <div className="p-4 border rounded shadow dark:bg-gray-800 dark:border-gray-600">
          <h2 className="font-semibold mb-2 text-lg">✅ Summary</h2>
          <p className="mb-3">{summary}</p>

          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Original words: {wordCount(text)} | Summary words:{" "}
              {wordCount(summary)}
            </p>
            {wordCount(text) > 0 && (
              <div className="w-24 h-24 mt-2">
                <CircularProgressbar
                  value={
                    100 -
                    Math.round((wordCount(summary) / wordCount(text)) * 100)
                  }
                  text={`${100 -
                    Math.round((wordCount(summary) / wordCount(text)) * 100)}%`}
                  styles={buildStyles({
                    pathColor: "#4CAF50",
                    textColor: "#fff",
                  })}
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <MyButton onClick={handleCopy} className="bg-blue-500">
              📋 Copy
            </MyButton>
            <MyButton onClick={handleDownload} className="bg-green-600">
              📥 Download PDF
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
}
