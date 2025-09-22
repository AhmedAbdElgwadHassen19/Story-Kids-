"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
function StoryForm() {
  const storyType = [
    { title: "Story Book", image: "/storybook.png" },
    { title: "Bed Story", image: "/bedstory.png" },
    { title: "Educational", image: "/educational.png" },
    { title: "History", image: "/history.png" },
  ];

  const [ageGroup, setAgeGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [storySubject, setStorySubject] = useState("");

  const [errors, setErrors] = useState({
    storySubject: "",
    selectedType: "",
    ageGroup: "",
  });

  const router = useRouter();

  const handleSubmit = async () => {
    let newErrors = { storySubject: "", selectedType: "", ageGroup: "" };

    if (!storySubject.trim()) newErrors.storySubject = "Please enter a subject.";
    if (!selectedType) newErrors.selectedType = "Please select a story type.";
    if (!ageGroup) newErrors.ageGroup = "Please select an age group.";

    setErrors(newErrors);

    if (newErrors.storySubject || newErrors.selectedType || newErrors.ageGroup) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storySubject,
          storyType: selectedType,
          ageGroup,
        }),
      });

      if (!res.ok) throw new Error("Failed to generate story");

      router.push("/dashboard/my-stories");
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        storySubject: "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-[#c9749d] mb-6">
        Create Your Magical Story
      </h1>

      <div className="mb-6">
        <label className="block text-lg mb-2">
          Write the subject of the story
        </label>
        <textarea
          value={storySubject}
          onChange={(e) => {
            setStorySubject(e.target.value);
            if (errors.storySubject) {
              setErrors((prev) => ({ ...prev, storySubject: "" }));
            }
          }}
          className="w-full p-2 border border-gray-300 rounded"
          
        />
        {errors.storySubject && (
          <p className="text-red-500 text-sm mt-1">{errors.storySubject}</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">1. Story Type</h2>
        <div className="grid md:grid-cols-4">
          {storyType.map((type) => (
            <div
              key={type.title}
              onClick={() => {
                setSelectedType(type.title);
                if (errors.selectedType) {
                  setErrors((prev) => ({ ...prev, selectedType: "" }));
                }
              }}
              className="p-4 flex flex-col items-center cursor-pointer rounded"
            >
              <img
                src={type.image}
                alt={type.title}
                className={`w-full h-48 object-cover rounded-t-lg ${
                  selectedType === type.title
                    ? "grayscale-0"
                    : "grayscale hover:grayscale-0"
                }`}
              />
              <span className="text-xl">{type.title}</span>
            </div>
          ))}
        </div>
        {errors.selectedType && (
          <p className="text-red-500 text-sm mt-2">{errors.selectedType}</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">2. Age Group</h2>
      <div className="grid grid-cols-3 gap-4">
        {["0-2 Years", "3-5 Years", "6-8 Years"].map((age) => (
          <div
            key={age}
            onClick={() => {
              setAgeGroup(age);
              if (errors.ageGroup) {
                setErrors((prev) => ({ ...prev, ageGroup: "" }));
              }
            }}
            className={`cursor-pointer p-4 rounded-lg border ${
              ageGroup === age
                ? "bg-[#c9749d] text-white border-[#c9749d]"
                : "bg-white text-[#c9749d] border-[#c9749d]"
            }`}
          >
            {age}
          </div>
        ))}
      </div>
      {errors.ageGroup && (
        <p className="text-red-500 text-sm mt-2">{errors.ageGroup}</p>
      )}

      <div className="flex items-center justify-center mt-8">
        <Button className="w-full" disabled={loading} onClick={handleSubmit}>
          {loading ? "Generating..." : "Generate Story"}
        </Button>
      </div>
    </div>
  );
}

export default StoryForm;
