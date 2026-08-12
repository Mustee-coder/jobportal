import { Job } from "../models/job.model.js";
import mongoose from "mongoose";
import { Company } from "../models/company.model.js";
import { Application } from "../models/application.model.js";

 //ADMIN: Post a new job
 
export const postJob = async (req, res) => {

  try {
  
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    // Validate text fields
    if (
      !title?.trim() ||
      !description?.trim() ||
      !requirements?.trim() ||
      !location?.trim() ||
      !jobType?.trim() ||
      !companyId?.trim()
    ) {
      return res.status(400).json({
        message: "All text fields are required.",
        success: false,
      });
    }

    // Convert numeric fields
    const parsedSalary = Number(salary);
    const parsedExperience = Number(experience);
    const parsedPosition = Number(position);

    // Validate salary
    if (Number.isNaN(parsedSalary) || parsedSalary <= 0) {
      return res.status(400).json({
        message: "Salary must be greater than 0.",
        success: false,
      });
    }

    // Validate experience
    if (Number.isNaN(parsedExperience) || parsedExperience < 0) {
      return res.status(400).json({
        message: "Invalid experience.",
        success: false,
      });
    }

    // Validate position
    if (Number.isNaN(parsedPosition) || parsedPosition <= 0) {
      return res.status(400).json({
        message: "Number of positions must be greater than 0.",
        success: false,
      });
    }

    // Check company
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // Create job
    const job = await Job.create({
      title: title.trim(),
      description: description.trim(),

      requirements: requirements
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      salary: parsedSalary,
      location: location.trim(),
      jobType: jobType.trim(),
      experienceLevel: parsedExperience,
      position: parsedPosition,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job created successfully.",
      job,
      success: true,
    });

  } catch (error) {

  return res.status(500).json({
    message: error.message || "Internal server error.",
    success: false,
  });

  }
};
// STUDENTS: Get all jobs (with search)
 
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim() || "";

    const query = {
      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.error("Get All Jobs Error:", error);

    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// STUDENTS: Get single job

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // validate ObjectId safely
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid Job ID",
                success: false
            });
        }

        const job = await Job.findById(jobId)
            .populate("company")
            .populate("applications");

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.error("getJobById Error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// ADMIN: Get jobs created by admin

export const getAdminJobs = async (req, res) => {
  try {
    const userId = req.id;

    const jobs = await Job.find({
      created_by: userId,
    })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.error("Get Admin Jobs Error:", error);

    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};



// ADMIN: Update an existing job


export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: "Invalid Job ID",
        success: false,
      });
    }

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    // Find existing job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Optional: verify the logged-in admin owns this job
    const userId = req.id;
    if (job.created_by.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to update this job.",
        success: false,
      });
    }

    // Validate + convert numeric fields if provided
    if (salary !== undefined) {
      const parsedSalary = Number(salary);
      if (Number.isNaN(parsedSalary) || parsedSalary <= 0) {
        return res.status(400).json({
          message: "Salary must be greater than 0.",
          success: false,
        });
      }
      job.salary = parsedSalary;
    }

    if (experience !== undefined) {
      const parsedExperience = Number(experience);
      if (Number.isNaN(parsedExperience) || parsedExperience < 0) {
        return res.status(400).json({
          message: "Invalid experience.",
          success: false,
        });
      }
      job.experienceLevel = parsedExperience;
    }

    if (position !== undefined) {
      const parsedPosition = Number(position);
      if (Number.isNaN(parsedPosition) || parsedPosition <= 0) {
        return res.status(400).json({
          message: "Number of positions must be greater than 0.",
          success: false,
        });
      }
      job.position = parsedPosition;
    }

    // Update text fields if provided
    if (title?.trim()) job.title = title.trim();
    if (description?.trim()) job.description = description.trim();
    if (location?.trim()) job.location = location.trim();
    if (jobType?.trim()) job.jobType = jobType.trim();

    if (requirements) {
      job.requirements = Array.isArray(requirements)
        ? requirements.map((item) => item.trim()).filter(Boolean)
        : requirements
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    // Update company if changed
    if (companyId?.trim()) {
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(404).json({
          message: "Company not found.",
          success: false,
        });
      }
      job.company = companyId;
    }

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully.",
      job,
      success: true,
    });

  } catch (error) {
    console.error("Update Job Error:", error);

    return res.status(500).json({
      message: error.message || "Internal server error.",
      success: false,
    });
  }
};
