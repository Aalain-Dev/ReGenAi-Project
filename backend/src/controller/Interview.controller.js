const pdfParse = require("pdf-parse");
const generateInterviewReportGroq = require("../services/groq.service");
const interviewreportschema = require("../models/interview.model")
const generatereport = async(req,res) => {
     try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }
    const parsed = await new pdfParse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();
    const resume =
      typeof parsed === "string"
        ? parsed
        : (parsed?.text ??       
          (Array.isArray(parsed?.pages)
            ? parsed.pages.map((p) => p.text).join("\n\n")
            : ""));
    if (!resume.trim()) {
      return res
        .status(400)
        .json({ message: "Could not extract text from the provided resume" });
    }
    const { selfDescription, jobDescription } = req.body;
    const report = await generateInterviewReportGroq({
      resume,
      selfDescription,
      jobDescription,
    });
    const storedata = await interviewreportschema.create({
      resume,
      selfDescription,
      jobDescription,
      ...report,
      user: req.user.id,
    });
    return res.status(200).json({ message: "report created", storedata });
  } catch (err) {
    console.error("Error in generating interview report:", err);
    const status = err?.status === 503 ? 503 : 500;
    return res
      .status(status)
      .json({ message: err.message || "Failed to generate report" });
  }
};

const getsinglereport = async(req,res) => {
  const { id } = req.params
  const userid = req.user.id
 try{
   const interviewreport = await interviewreportschema.findOne({
       user: userid,
      _id: id,
  })
   return res
      .status(200)
      .json({ message: "report fetched", data: interviewreport });
 }
 catch(e){
  return res
      .status(500)
      .json({ message: `error in fetching report ${error.message}` });
  }
};
const getallreports = async(req,res) => {
     try {
    const userid = req.user.id;

    const interviewreports = await interviewreportschema
      .find({ user: userid })
      .sort({ createdAt: -1 })
      .select("-resume -selfDescription");

    res.status(200).json({
      success: true,
      data: interviewreports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generatereport,
  getsinglereport
  ,
  getallreports
};
