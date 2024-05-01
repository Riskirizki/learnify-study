import React from "react";

export default function Home() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome to the Home Page
      </h1>
      <p className="text-lg text-gray-600 text-center">
        Click below to navigate to the Learning List:
      </p>
      <div className="flex justify-center mt-4">
        <a href="/learning-list" className="text-blue-500 hover:underline">
          Go to Learning List
        </a>
      </div>
    </div>
  );
}
