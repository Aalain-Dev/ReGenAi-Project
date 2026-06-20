import React from "react";
import { useForm } from "react-hook-form";
import InterviewHook from "../../../features/interview/hooks/interview.hooks";

const GenerateReportModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();
 const {GenerateReporthook} = InterviewHook()

  const onSubmit = async(data) => {
    const formData = new FormData();

    formData.append("resume", data.resume[0]);
    formData.append("jobDescription", data.jobDescription);
    formData.append("selfDescription", data.selfDescription);
    
    const response = await GenerateReporthook({
      resume:data.resume,
      jobdescription:data.jobDescription,
      selfdescription:data.selfDescription
    }) 
    console.log(response)
    // return 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold">Analyze Resume</h2>

          <button
            onClick={onClose}
            className="text-2xl font-semibold text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          {/* Resume Upload */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Upload Resume
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              {...register("resume", {
                required: true,
              })}
              className="w-full rounded-lg border border-gray-300 p-3 file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-white hover:file:bg-gray-800"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Job Description
            </label>

            <textarea
              rows={5}
              placeholder="Paste the job description here..."
              {...register("jobDescription", {
                required: true,
              })}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
            />
          </div>

          {/* Self Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Tell Us About Yourself
            </label>

            <textarea
              rows={4}
              placeholder="Describe your skills, experience, goals, achievements, etc."
              {...register("selfDescription")}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2 font-medium hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-black px-6 py-2 font-medium text-white hover:bg-gray-800"
            >
              Generate Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateReportModal;
