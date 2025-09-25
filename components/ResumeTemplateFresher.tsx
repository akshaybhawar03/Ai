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
    projects: string[];
    certifications: string[];
  };
}

export default function ResumeTemplateFresher({ data }: ResumeProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold text-indigo-700">{data.name}</h1>
      <p className="text-gray-600">{data.title}</p>
      <p className="text-sm text-gray-500">{data.email} | {data.phone}</p>

      <hr className="my-4" />

      <section>
        <h2 className="text-xl font-semibold text-indigo-600">Education</h2>
        <ul className="list-disc list-inside text-gray-700">
          {data.education.map((edu, i) => <li key={i}>{edu}</li>)}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold text-indigo-600">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-1">
          {data.skills.map((skill, i) => (
            <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold text-indigo-600">Projects</h2>
        <ul className="list-disc list-inside text-gray-700">
          {data.projects.map((proj, i) => <li key={i}>{proj}</li>)}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold text-indigo-600">Certifications</h2>
        <ul className="list-disc list-inside text-gray-700">
          {data.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
        </ul>
      </section>
    </div>
  );
}
