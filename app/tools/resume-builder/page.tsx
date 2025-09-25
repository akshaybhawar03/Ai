"use client";
import { useState } from "react";
import { jsPDF } from "jspdf";

export default function Home() {
  const [details, setDetails] = useState({ name: "", email: "", phone: "", location: "", skills: "" });
  const [resume, setResume] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState("classic"); // default template

  const generateResume = async () => {
    setLoading(true);
    setResume(null);

    try {
      const res = await fetch("/api/ai/generateResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details }),
      });

      const data = await res.json();
      if (data.resume) {
        setResume(data.resume);
      } else {
        alert(data.error || "Failed to generate resume");
      }
    } catch (err) {
      alert("Error generating resume");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Export to PDF
  const downloadPDF = () => {
    if (!resume) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(resume.name, 10, 20);
    doc.setFontSize(12);
    doc.text(`${resume.contact.email} | ${resume.contact.phone} | ${resume.contact.location}`, 10, 30);
    doc.text(resume.summary, 10, 40);

    let y = 50;
    doc.text("Education:", 10, y);
    y += 10;
    resume.education.forEach((edu: any) => {
      doc.text(`- ${edu.degree}, ${edu.institution} (${edu.year})`, 10, y);
      y += 10;
    });

    doc.text("Experience:", 10, y);
    y += 10;
    resume.experience.forEach((exp: any) => {
      doc.text(`${exp.role} - ${exp.company} (${exp.duration})`, 10, y);
      y += 10;
      exp.responsibilities.forEach((r: string) => {
        doc.text(`   • ${r}`, 10, y);
        y += 10;
      });
    });

    doc.text("Skills:", 10, y);
    y += 10;
    doc.text(resume.skills.join(", "), 10, y);

    y += 20;
    doc.text("Projects:", 10, y);
    y += 10;
    resume.projects.forEach((proj: any) => {
      doc.text(`${proj.title} - ${proj.description}`, 10, y);
      y += 10;
    });

    doc.save("resume.pdf");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">AI Resume Builder</h1>

      {/* Input Form */}
      <div className="w-full max-w-md space-y-2 mb-6">
        <input type="text" placeholder="Name" className="w-full border p-2 rounded"
          value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
        <input type="email" placeholder="Email" className="w-full border p-2 rounded"
          value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
        <input type="text" placeholder="Phone" className="w-full border p-2 rounded"
          value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
        <input type="text" placeholder="Location" className="w-full border p-2 rounded"
          value={details.location} onChange={(e) => setDetails({ ...details, location: e.target.value })} />
        <input type="text" placeholder="Skills (comma separated)" className="w-full border p-2 rounded"
          value={details.skills} onChange={(e) => setDetails({ ...details, skills: e.target.value })} />

        {/* Template Selector */}
        <select
          className="w-full border p-2 rounded"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        >
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="minimal">Minimal</option>
        </select>

        <button
          onClick={generateResume}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </div>

      {/* Resume Output */}
      {resume && (
        <div className="mt-8 w-full max-w-2xl">
          {/* ✅ Different Templates */}
          {template === "classic" && (
            <div className="border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-bold">{resume.name}</h2>
              <p>{resume.contact.email} | {resume.contact.phone} | {resume.contact.location}</p>
              <p className="mt-2 italic">{resume.summary}</p>
            </div>
          )}

          {template === "modern" && (
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">{resume.name}</h2>
              <p className="text-sm opacity-80">{resume.contact.email} • {resume.contact.phone} • {resume.contact.location}</p>
              <p className="mt-4">{resume.summary}</p>
            </div>
          )}

          {template === "minimal" && (
            <div className="border-l-4 border-blue-600 p-4 bg-gray-50">
              <h2 className="font-bold">{resume.name}</h2>
              <p className="text-gray-600">{resume.contact.email}, {resume.contact.phone}, {resume.contact.location}</p>
              <p className="mt-2">{resume.summary}</p>
            </div>
          )}

          {/* PDF Download Button */}
          <button
            onClick={downloadPDF}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download as PDF
          </button>
        </div>
      )}
    </main>
  );
}
