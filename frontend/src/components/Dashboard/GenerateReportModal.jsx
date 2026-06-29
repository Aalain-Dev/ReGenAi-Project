import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UploadCloud, FileText, X, Loader2 } from "lucide-react";
import InterviewHook from "../../../features/interview/hooks/interview.hooks";

const GenerateReportModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { GenerateReporthook, GetallReporthook } = InterviewHook();

  // Show the picked file name in the custom upload area.
  const resumeFile = watch("resume");
  const fileName = resumeFile?.[0]?.name;

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      await GenerateReporthook({
        resume: data.resume,
        jobdescription: data.jobDescription,
        selfdescription: data.selfDescription,
      });
      await GetallReporthook(); // refresh the list shown on Home / Reports
      toast.success("Report generated successfully");
      reset();
      onClose();
    } catch (e) {
      // Keep the modal open so the user can fix the input and retry.
      toast.error(
        e?.response?.data?.message ||
          "Failed to generate report. Please try again.",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="my-4 sm:my-8 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (fixed) */}
        <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl sm:text-2xl font-bold">Analyze Resume</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-black cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form: scrollable body + fixed footer */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="space-y-5 overflow-y-auto p-6">
            {/* Resume Upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Upload Resume <span className="text-gray-400">(PDF)</span>
              </label>

              <label
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition ${
                  errors.resume
                    ? "border-red-400 bg-red-50"
                    : fileName
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-gray-300 hover:border-black hover:bg-gray-50"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  {...register("resume", { required: "Resume is required" })}
                  className="hidden"
                />
                {fileName ? (
                  <>
                    <FileText className="h-6 w-6 text-emerald-600" />
                    <span className="text-sm font-medium text-gray-800 break-all">
                      {fileName}
                    </span>
                    <span className="text-xs text-gray-500">
                      Click to choose a different file
                    </span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-6 w-6 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Click to upload your resume
                    </span>
                    <span className="text-xs text-gray-500">PDF up to ~10MB</span>
                  </>
                )}
              </label>
              {errors.resume && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">
                  {errors.resume.message}
                </p>
              )}
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
                  required: "Job description is required",
                })}
                className={`w-full rounded-lg border p-3 outline-none transition focus:border-black ${
                  errors.jobDescription ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.jobDescription && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            {/* Self Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Tell Us About Yourself{" "}
                <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                rows={4}
                placeholder="Describe your skills, experience, goals, achievements, etc."
                {...register("selfDescription")}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-black"
              />
            </div>
          </div>

          {/* Footer (fixed) */}
          <div className="flex shrink-0 justify-end gap-3 border-t px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-lg border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                "Generate Report"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateReportModal;
