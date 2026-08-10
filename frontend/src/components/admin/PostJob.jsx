import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { companies = [] } = useSelector(
    (store) => store.company
  );

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectChangeHandler = (value) => {
    setInput((prev) => ({
      ...prev,
      companyId: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.title.trim()) {
      toast.error("Job title is required");
      return;
    }

    if (!input.description.trim()) {
      toast.error("Job description is required");
      return;
    }

    if (!input.requirements.trim()) {
      toast.error("Requirements are required");
      return;
    }

    if (!input.salary || Number(input.salary) <= 0) {
      toast.error("Enter a valid salary");
      return;
    }

    if (!input.location.trim()) {
      toast.error("Location is required");
      return;
    }

    if (!input.jobType.trim()) {
      toast.error("Job type is required");
      return;
    }

    if (
      input.experience === "" ||
      Number(input.experience) < 0
    ) {
      toast.error("Enter a valid experience");
      return;
    }

    if (!input.position || Number(input.position) <= 0) {
      toast.error("Enter a valid number of positions");
      return;
    }

    if (!input.companyId) {
      toast.error("Please select a company");
      return;
    }

    try {
      setLoading(true);

      console.log("CREATE JOB REQUEST:", input);

      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        {
          title: input.title.trim(),
          description: input.description.trim(),
          requirements: input.requirements.trim(),
          salary: input.salary,
          location: input.location.trim(),
          jobType: input.jobType.trim(),
          experience: input.experience,
          position: input.position,
          companyId: input.companyId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("CREATE JOB RESPONSE:", res.data);

      if (res.data.success) {
        toast.success(
          res.data.message || "Job created successfully"
        );

        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error("========== CREATE JOB ERROR ==========");
      console.error("STATUS:", error?.response?.status);
      console.error("DATA:", error?.response?.data);
      console.error("MESSAGE:", error?.message);
      console.error("======================================");

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10 sm:py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl rounded-md border border-gray-200 bg-white p-4 shadow-lg sm:p-6 md:p-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <Field
              label="Title"
              name="title"
              input={input}
              onChange={changeEventHandler}
              required
            />

            <Field
              label="Description"
              name="description"
              input={input}
              onChange={changeEventHandler}
              required
            />

            <Field
              label="Requirements"
              name="requirements"
              input={input}
              onChange={changeEventHandler}
              required
              placeholder="React, JavaScript, Git"
            />

            <Field
              label="Salary"
              name="salary"
              type="number"
              input={input}
              onChange={changeEventHandler}
              required
            />

            <Field
              label="Location"
              name="location"
              input={input}
              onChange={changeEventHandler}
              required
            />

            <Field
              label="Job Type"
              name="jobType"
              input={input}
              onChange={changeEventHandler}
              required
              placeholder="Full Time"
            />

            <Field
              label="Experience (years)"
              name="experience"
              type="number"
              input={input}
              onChange={changeEventHandler}
              required
            />

            <div>
              <Label>No of Position</Label>

              <Input
                type="number"
                name="position"
                min="1"
                value={input.position}
                onChange={changeEventHandler}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Label>Company</Label>

              {companies.length > 0 ? (
                <Select
                  value={input.companyId}
                  onValueChange={selectChangeHandler}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company._id}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-2 text-sm text-red-500">
                  Please register a company first.
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || companies.length === 0}
            className="my-6 w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Job...
              </>
            ) : (
              "Post New Job"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

const Field = ({
  label,
  name,
  input,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) => {
  return (
    <div>
      <Label>{label}</Label>

      <Input
        type={type}
        name={name}
        value={input[name]}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default PostJob;