"use client";

import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [emails, setEmails] = useState([""]);
  const [emailErrors, setEmailErrors] = useState([""]);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const addEmailField = () => {
    if (emails.length >= 5) return;
    setEmails([...emails, ""]);
    setEmailErrors([...emailErrors, ""]);
  };

  const handleChange = (index, value) => {
    const newEmails = [...emails];
    const newErrors = [...emailErrors];
    newEmails[index] = value;
    newErrors[index] =
      value && !validateEmail(value) ? "Invalid email format" : "";
    setEmails(newEmails);
    setEmailErrors(newErrors);
  };

  const removeEmailField = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    const newErrors = emailErrors.filter((_, i) => i !== index);
    setEmails(newEmails);
    setEmailErrors(newErrors);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast.warn("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    emails.forEach((email) => formData.append("emails", email));

    try {
      const res = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Response from backend:", data);

      if (data.status == 200) {
        toast.success("File uploaded and emails sent!");
      }else{
        toast.error("Sharing failed. Please try again.")
      }

      setEmails([""]);
      setSelectedFileName("");
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center px-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="flex flex-col gap-2">
        <form
          onSubmit={handleSubmit}
          className="form w-full max-w-md p-6 border border-gray-600 rounded-sm flex flex-col gap-4 shadow-lg"
        >
          <span className="text-2xl font-bold">AWS File Sharing</span>
          {/* File Input */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-white text-black rounded-sm px-4 py-2 text-center font-semibold hover:bg-gray-300 transition select-none"
            >
              Choose File
            </label>
            <span
              className="text-gray-300 truncate max-w-xs"
              title={selectedFileName}
            >
              {selectedFileName || "No file chosen"}
            </span>
          </div>

          {/* Email Inputs */}
          {emails.map((email, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="px-3 py-2  flex items-center justify-center rounded-sm bg-white text-black font-bold">
                  {index + 1}
                </span>
                <input
                  type="email"
                  className={`flex-grow bg-black border ${
                    emailErrors[index] ? "border-red-500" : "border-gray-600"
                  } rounded-sm p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition`}
                  placeholder={`johndoe${index + 1}@email.com`}
                  value={email}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeEmailField(index)}
                  className="bg-white text-black rounded-sm px-3 py-2 font-semibold hover:bg-gray-300 transition cursor-pointer"
                >
                  Remove
                </button>
              </div>
              {emailErrors[index] && (
                <p className="text-red-500 text-sm">{emailErrors[index]}</p>
              )}
            </div>
          ))}

          {/* Add Button */}
          <div>
            <button
              type="button"
              onClick={addEmailField}
              disabled={emails.length >= 5}
              className="self-start bg-white text-black rounded-sm px-4 py-2 font-semibold cursor-pointer hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Add email
            </button>
            {emails.length >= 5 && (
              <p className="mt-1 text-sm text-red-500 font-medium">
                Only 5 emails are allowed
              </p>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            id="fileInput"
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {/* Submit */}
          <button
            id="submit"
            type="submit"
            className="bg-white text-black rounded-sm px-4 py-2 font-semibold cursor-pointer hover:bg-gray-300 transition"
          >
            Share File
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
