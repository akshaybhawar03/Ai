"use client";

import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ResumeBuilder() {
  // ✅ Personal Info
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    address: "",
  });

  // ✅ Education Info
  const [education, setEducation] = useState<
    { degree: string; school: string; year: string; marks: string }[]
  >([]);

  // ✅ Skills
  const [skills, setSkills] = useState<string>("");

  // ✅ Experience
  const [experience, setExperience] = useState<string>("");

  // ✅ Projects
  const [projects, setProjects] = useState<string>("");

  // ✅ Certifications
  const [certifications, setCertifications] = useState<string>("");

  // ✅ Ref for PDF
  const resumeRef = useRef<HTMLDivElement>(null);

  // ✅ Fix for TS error (content return type set to HTMLElement | null)
  const handlePrint = useReactToPrint({
  // @ts-ignore
  content: () => resumeRef.current,
  documentTitle: "My_Resume",
});


  // Handlers
  const handlePersonalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { degree: "", school: "", year: "", marks: "" },
    ]);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEdu = [...education];
    (newEdu[index] as any)[field] = value;
    setEducation(newEdu);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📝 Resume Builder</h1>

      {/* -------- Form Section -------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border p-2 rounded"
          value={personal.name}
          onChange={handlePersonalChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={personal.email}
          onChange={handlePersonalChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-2 rounded"
          value={personal.phone}
          onChange={handlePersonalChange}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          className="border p-2 rounded col-span-2"
          value={personal.linkedin}
          onChange={handlePersonalChange}
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub Profile"
          className="border p-2 rounded col-span-2"
          value={personal.github}
          onChange={handlePersonalChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border p-2 rounded col-span-2"
          value={personal.address}
          onChange={handlePersonalChange}
        />
      </div>

      {/* Skills */}
      <textarea
        placeholder="Skills (comma separated)"
        className="border p-2 rounded w-full mb-6"
        rows={2}
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      {/* Education */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Education</h2>
        {education.map((edu, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-2 mb-2">
            <input
              type="text"
              placeholder="Degree"
              className="border p-2 rounded"
              value={edu.degree}
              onChange={(e) =>
                updateEducation(idx, "degree", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="School"
              className="border p-2 rounded"
              value={edu.school}
              onChange={(e) =>
                updateEducation(idx, "school", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Year"
              className="border p-2 rounded"
              value={edu.year}
              onChange={(e) => updateEducation(idx, "year", e.target.value)}
            />
            <input
              type="text"
              placeholder="Marks/CGPA"
              className="border p-2 rounded"
              value={edu.marks}
              onChange={(e) => updateEducation(idx, "marks", e.target.value)}
            />
          </div>
        ))}
        <button
          onClick={addEducation}
          className="px-4 py-1 bg-gray-700 text-white rounded"
        >
          ➕ Add Education
        </button>
      </div>

      {/* Experience */}
      <textarea
        placeholder="Experience"
        className="border p-2 rounded w-full mb-6"
        rows={3}
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      {/* Projects */}
      <textarea
        placeholder="Projects"
        className="border p-2 rounded w-full mb-6"
        rows={3}
        value={projects}
        onChange={(e) => setProjects(e.target.value)}
      />

      {/* Certifications */}
      <textarea
        placeholder="Certifications"
        className="border p-2 rounded w-full mb-6"
        rows={2}
        value={certifications}
        onChange={(e) => setCertifications(e.target.value)}
      />

      {/* ✅ Download Button */}
      <button
        onClick={handlePrint}
        className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        📄 Download Resume
      </button>

      {/* -------- Resume Preview -------- */}
      <div
        ref={resumeRef}
        className="mt-10 p-6 border rounded-lg shadow bg-white"
      >
        <h2 className="text-3xl font-bold">{personal.name}</h2>
        <p className="text-gray-600">
          {personal.email} | {personal.phone}
        </p>
        <p className="text-gray-500">{personal.linkedin} | {personal.github}</p>
        <p className="text-gray-500">{personal.address}</p>

        <h3 className="text-xl font-semibold mt-4">Skills</h3>
        <ul className="list-disc ml-5">
          {skills.split(",").map(
            (s, idx) => s.trim() && <li key={idx}>{s.trim()}</li>
          )}
        </ul>

        <h3 className="text-xl font-semibold mt-4">Education</h3>
        <ul>
          {education.map((edu, idx) => (
            <li key={idx}>
              <strong>{edu.degree}</strong> — {edu.school} ({edu.year}) | {edu.marks}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-4">Experience</h3>
        <p>{experience}</p>

        <h3 className="text-xl font-semibold mt-4">Projects</h3>
        <p>{projects}</p>

        <h3 className="text-xl font-semibold mt-4">Certifications</h3>
        <p>{certifications}</p>
      </div>
    </div>
  );
}
