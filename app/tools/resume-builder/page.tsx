"use client";
import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ResumeBuilderPage() {
  const [template, setTemplate] = useState("template1");
  const [photo, setPhoto] = useState<string | null>(null);

  // Resume data
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState("");
  const [skills, setSkills] = useState("");
  const [certifications, setCertifications] = useState("");

  // Print Ref
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "My_Resume",
  });

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // ---------------- RESUME TEMPLATES ----------------
  const renderTemplate = () => {
    switch (template) {
      case "template2":
        return (
          <TemplateContainer ref={componentRef}>
            <div className="text-center border-b pb-4 mb-6">
              {photo && <img src={photo} alt="Profile" className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />}
              <h2 className="text-2xl font-bold">{fullName || "Your Name"}</h2>
              <p className="text-gray-600">{title || "Job Title"}</p>
              <p className="text-sm text-gray-500 mt-1">
                {email && `📧 ${email}`} {phone && ` | 📞 ${phone}`}  
                {linkedin && ` | 🔗 LinkedIn`} {github && ` | 💻 GitHub`}
              </p>
            </div>
            {summary && <Section title="Professional Summary" content={summary} />}
            {education && <Section title="Education" content={education} />}
            {experience && <Section title="Experience" content={experience} />}
            {projects && <Section title="Projects" content={projects} />}
            {skills && <Section title="Skills" content={skills} />}
            {certifications && <Section title="Certifications" content={certifications} />}
          </TemplateContainer>
        );

      case "template3":
        return (
          <div ref={componentRef} className="w-full max-w-5xl bg-white mt-10 rounded-xl shadow-lg border flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-blue-900 text-white p-6 flex flex-col items-center">
              {photo && <img src={photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white mb-4" />}
              <h2 className="text-lg font-bold">{fullName || "Your Name"}</h2>
              <p className="text-sm">{title || "Job Title"}</p>
              <div className="mt-6 text-xs text-gray-200">
                {email && <p>📧 {email}</p>}
                {phone && <p>📞 {phone}</p>}
                {linkedin && <p>🔗 LinkedIn</p>}
                {github && <p>💻 GitHub</p>}
              </div>
              {skills && <Section title="Skills" content={skills} sidebar />}
            </div>
            {/* Main */}
            <div className="w-3/4 p-6">
              {summary && <Section title="Summary" content={summary} />}
              {education && <Section title="Education" content={education} />}
              {experience && <Section title="Experience" content={experience} />}
              {projects && <Section title="Projects" content={projects} />}
              {certifications && <Section title="Certifications" content={certifications} />}
            </div>
          </div>
        );

      case "template4":
        return (
          <div ref={componentRef} className="w-full max-w-5xl bg-white mt-10 rounded-lg shadow-lg border flex">
            {/* Left Sidebar */}
            <div className="w-1/3 bg-gray-900 text-white p-6 flex flex-col items-center">
              {photo && <img src={photo} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-gray-700 mb-4" />}
              <h2 className="text-xl font-bold">{fullName || "Your Name"}</h2>
              <p className="text-gray-300">{title || "Job Title"}</p>
              <div className="mt-6 text-sm space-y-2">
                {email && <p>📧 {email}</p>}
                {phone && <p>📞 {phone}</p>}
                {linkedin && <p>🔗 LinkedIn</p>}
                {github && <p>💻 GitHub</p>}
              </div>
              {skills && <Section title="Skills" content={skills} sidebar />}
              {certifications && <Section title="Certifications" content={certifications} sidebar />}
            </div>

            {/* Right Main Content */}
            <div className="w-2/3 p-8">
              {summary && <Section title="Professional Summary" content={summary} />}
              {experience && <Section title="Work Experience" content={experience} />}
              {projects && <Section title="Projects" content={projects} />}
              {education && <Section title="Education" content={education} />}
            </div>
          </div>
        );

      default: // Template 1
        return (
          <div ref={componentRef} className="w-full max-w-5xl bg-white mt-10 rounded-xl shadow-lg border flex">
            {/* Left Column */}
            <div className="w-1/3 bg-gray-100 p-6">
              {photo && <img src={photo} alt="Profile" className="w-28 h-28 rounded-full object-cover mx-auto mb-4" />}
              <h2 className="text-xl font-bold text-center">{fullName || "Your Name"}</h2>
              <p className="text-gray-600 text-center">{title || "Job Title"}</p>
              <div className="mt-6 space-y-2 text-sm">
                {email && <p>📧 {email}</p>}
                {phone && <p>📞 {phone}</p>}
                {linkedin && <p>🔗 LinkedIn</p>}
                {github && <p>💻 GitHub</p>}
              </div>
              {skills && <Section title="Skills" content={skills} />}
              {certifications && <Section title="Certifications" content={certifications} />}
            </div>
            {/* Right Column */}
            <div className="w-2/3 p-6">
              {summary && <Section title="Summary" content={summary} />}
              {education && <Section title="Education" content={education} />}
              {experience && <Section title="Experience" content={experience} />}
              {projects && <Section title="Projects" content={projects} />}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex gap-6">
      {/* Left: Form */}
      <div className="w-1/3 bg-white p-6 rounded-xl shadow-md overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Resume Builder</h2>

        {/* Photo Upload */}
        <label className="block mb-3">
          <span className="font-semibold">Upload Photo</span>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="mt-2 w-full" />
        </label>

        {/* Form Fields */}
        <Input label="Full Name" value={fullName} setValue={setFullName} placeholder="Enter your full name" />
        <Input label="Job Title" value={title} setValue={setTitle} placeholder="e.g. Software Engineer" />
        <Input label="Email" value={email} setValue={setEmail} placeholder="e.g. you@example.com" />
        <Input label="Phone" value={phone} setValue={setPhone} placeholder="+91 9876543210" />
        <Input label="LinkedIn" value={linkedin} setValue={setLinkedin} placeholder="linkedin.com/in/username" />
        <Input label="GitHub" value={github} setValue={setGithub} placeholder="github.com/username" />
        <Textarea label="Summary" value={summary} setValue={setSummary} placeholder="Write a short professional summary..." />
        <Textarea label="Education" value={education} setValue={setEducation} placeholder="Your education details..." />
        <Textarea label="Experience" value={experience} setValue={setExperience} placeholder="Work experience..." />
        <Textarea label="Projects" value={projects} setValue={setProjects} placeholder="Project details..." />
        <Textarea label="Skills" value={skills} setValue={setSkills} placeholder="List your skills..." />
        <Textarea label="Certifications" value={certifications} setValue={setCertifications} placeholder="Certifications..." />

        {/* Template Selector */}
        <label className="block mt-4">
          <span className="font-semibold">Choose Template</span>
          <select
            className="w-full border rounded-lg p-2 mt-2"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="template1">Template 1 - Modern Two Column</option>
            <option value="template2">Template 2 - Minimalist</option>
            <option value="template3">Template 3 - Creative Sidebar</option>
            <option value="template4">Template 4 - Premium Corporate</option>
          </select>
        </label>

        {/* Download Button */}
        <button
          onClick={handlePrint}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Download Resume
        </button>
      </div>

      {/* Right: Resume Preview */}
      <div className="w-2/3">{renderTemplate()}</div>
    </div>
  );
}

// ---------------- REUSABLE COMPONENTS ----------------
const Input = ({ label, value, setValue, placeholder }: any) => (
  <label className="block mb-3">
    <span className="font-semibold">{label}</span>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="mt-1 w-full border rounded-lg p-2"
    />
  </label>
);

const Textarea = ({ label, value, setValue, placeholder }: any) => (
  <label className="block mb-3">
    <span className="font-semibold">{label}</span>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="mt-1 w-full border rounded-lg p-2"
    />
  </label>
);

const Section = ({ title, content, sidebar = false }: any) => (
  <div className={`mb-6 ${sidebar ? "text-white" : ""}`}>
    <h3 className={`font-bold mb-2 ${sidebar ? "border-b border-gray-400 pb-1" : "text-lg border-b pb-1"}`}>
      {title}
    </h3>
    <p className="text-sm whitespace-pre-line">{content}</p>
  </div>
);

const TemplateContainer = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <div ref={ref} className="w-full max-w-4xl bg-white mt-10 rounded-xl shadow-lg border p-8">
      {children}
    </div>
  )
);
