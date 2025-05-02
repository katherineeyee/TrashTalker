import React from "react";
import ImageUploader from "../components/ImageUploader";

function GamePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Trash Sorting Game</h1>
      <ImageUploader/>
    </div>
  );
}

export default GamePage;
