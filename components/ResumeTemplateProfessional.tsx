"use client";
import React from "react";

interface ResumeProps {
  data: {
    name: string;
    email: string;
    phone: string;
    title: string;
    education: string[];
    skills: string[];
    experience: string[];
    projects: string[];
    certifications: string[];
  };
}

export default function ResumeTemplateProfessional({ data }: ResumeProps) {
  return (
    <div className="max-w-3xl mx-auto bg-gray-50 shadow-xl rounded-2xl p-8">
      <div className="flex justify-between items-center border-b pb-3">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">{data.name}</h1>
          <p className="text-gray-600">{data.title}</p>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>{data.email}</p>
          <p>{data.phone}</p>
        </div>
      </div>

      <section className="mt-4">
        <h2 className="text-xl font-semibold text-blue-600">Experience</h2>
        <ul className="list-disc list-inside text-gray-700">
          {data.experience.map((exp, i) => <li key={i}>{exp}</li>)}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold text-blue-600">Projects</h2>
        <ul className="list-disc list-inside text-gray-700">
          {data.projects.map((proj, i) => <li key={i}>{proj}</li>)}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold text-blue-600">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-1">
          {data.skills.map((skill, i) => (
            <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold text-blue-600">Education</h2>
        <ul className="list-disc list-inside text-gray-700">
          {data.education.map((edu, i) => <li key={i}>{edu}</li>)}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold text-blue-600">Certifications</h2>
        <ul className="list-disc list-inside text-gray-700">
          {data.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
        </ul>
      </section>
    </div>
  );
}
