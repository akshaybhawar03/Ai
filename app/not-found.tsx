// app/not-found.tsx
"use client"; // only if you are using hooks like useState, useEffect

import React from "react";

export default function NotFound() {
  return (
    <html>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </body>
    </html>
  );
}
