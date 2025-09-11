"use client";

import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ResumeBuilder() {
  // ✅ Form data state
  const [formData, setFormData] = useState({
    photo: "",
    name: "",
    title: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
    certifications: "",
  });

  // ✅ Ref for resume content
  const resumeRef = useRef<HTMLDivElement>(null);

  // ✅ Print / Download PDF
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "My_Resume",
  });

  // ✅ Handle form input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () =>
        setFormData({ ...formData, photo: reader.result as string });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📝 Resume Builder</h1>

      {/* ✅ Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-2 rounded"
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          name="education"
          placeholder="Education"
          className="border p-2 rounded col-span-2"
          rows={3}
          value={formData.education}
          onChange={handleChange}
        />
        <textarea
          name="skills"
          placeholder="Skills (comma separated)"
          className="border p-2 rounded col-span-2"
          rows={2}
          value={formData.skills}
          onChange={handleChange}
        />
        <textarea
          name="projects"
          placeholder="Projects"
          className="border p-2 rounded col-span-2"
          rows={2}
          value={formData.projects}
          onChange={handleChange}
        />
        <textarea
          name="experience"
          placeholder="Experience"
          className="border p-2 rounded col-span-2"
          rows={2}
          value={formData.experience}
          onChange={handleChange}
        />
        <textarea
          name="certifications"
          placeholder="Certifications"
          className="border p-2 rounded col-span-2"
          rows={2}
          value={formData.certifications}
          onChange={handleChange}
        />
      </div>

      {/* ✅ Print Button */}
      <button
        onClick={handlePrint}
        className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        📄 Download Resume
      </button>

      {/* ✅ Resume Preview Section */}
      <div
        ref={resumeRef}
        className="mt-10 bg-white border rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-6 border-b p-6">
          {formData.photo ? (
            <img
              src={formData.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full border object-cover"
            />
          ) : (
            <label
              htmlFor="photoUpload"
              className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-full text-gray-500 text-sm cursor-pointer hover:bg-gray-100 transition"
            >
              Upload your photo here
              <input
                type="file"
                id="photoUpload"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
          )}

          <div>
            <h2 className="text-3xl font-bold">
              {formData.name || "Your Name"}
            </h2>
            <p className="text-lg text-gray-700">
              {formData.title || "Your Job Title"}
            </p>
            <p className="text-gray-600">
              {(formData.email || "yourmail@example.com")} |{" "}
              {(formData.phone || "+91 9876543210")}
            </p>
          </div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-3 gap-6 p-6">
          {/* Left Column */}
          <div className="col-span-1 bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold border-b pb-1">Skills</h3>
            <ul className="list-disc ml-5 mt-2">
              {formData.skills.split(",").map(
                (skill, idx) =>
                  skill.trim() && <li key={idx}>{skill.trim()}</li>
              )}
            </ul>

            <h3 className="text-lg font-semibold border-b pb-1 mt-4">
              Certifications
            </h3>
            <p className="mt-2">
              {formData.certifications || "No certifications added"}
            </p>
          </div>

          {/* Right Column */}
          <div className="col-span-2">
            <h3 className="text-xl font-semibold border-b pb-1">Education</h3>
            <p className="mt-2">
              {formData.education || "Add your education details"}
            </p>

            <h3 className="text-xl font-semibold border-b pb-1 mt-4">
              Projects
            </h3>
            <p className="mt-2">
              {formData.projects || "List your projects here"}
            </p>

            <h3 className="text-xl font-semibold border-b pb-1 mt-4">
              Experience
            </h3>
            <p className="mt-2">
              {formData.experience || "Mention your experience"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
