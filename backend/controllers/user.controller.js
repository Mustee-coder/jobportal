import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (
      !fullname?.trim() ||
      !email?.trim() ||
      !phoneNumber?.trim() ||
      !password?.trim() ||
      !role?.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });
    }

    const allowedRoles = ["student", "recruiter"];

    if (!allowedRoles.includes(role.trim())) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Profile image is required",
        success: false,
      });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    if (!cloudResponse?.secure_url) {
      return res.status(500).json({
        message: "Image upload failed",
        success: false,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname: fullname.trim(),
      email: normalizedEmail,
      phoneNumber: phoneNumber.trim(),
      password: hashedPassword,
      role: role.trim(),
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
  console.log("🔥 LOGIN REQUEST HIT");
    const { email, password, role } = req.body;

    if (
      !email?.trim() ||
      !password?.trim() ||
      !role?.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const allowedRoles = ["student", "recruiter"];

    if (!allowedRoles.includes(role.trim())) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    let user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (role.trim() !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
      })
      .status(200)
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    return res
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
      })
      .status(200)
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phoneNumber,
      bio,
      skills
    } = req.body;

    const file = req.file;

    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Upload new profile image
    let cloudResponse;

    if (file) {
      const fileUri = getDataUri(file);

      cloudResponse = await cloudinary.uploader.upload(
        fileUri.content
      );

      if (!cloudResponse?.secure_url) {
        return res.status(500).json({
          message: "Image upload failed",
          success: false,
        });
      }
    }

    // Check email already exists
    if (email && email.trim().toLowerCase() !== user.email) {
      const existingUser = await User.findOne({
        email: email.trim().toLowerCase(),
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already in use.",
          success: false,
        });
      }

      user.email = email.trim().toLowerCase();
    }

    if (fullname) {
      user.fullname = fullname.trim();
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber.trim();
    }

    if (bio) {
      user.profile.bio = bio.trim();
    }

    if (skills) {
      user.profile.skills = skills
        .split(",")
        .map(skill => skill.trim());
    }

    if (cloudResponse) {
      user.profile.profilePhoto = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      success: true,
      user,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
