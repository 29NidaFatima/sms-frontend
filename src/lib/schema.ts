You said:
import { z } from "zod";

export const studentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.preprocess(
    (val) => {
      if (!val) return null;
      if (typeof val === "string") return new Date(val);
      return val;
    },
    z.date({ required_error: "Date of birth is required" }).nullable().refine(
      (date) => date === null || (date instanceof Date && !isNaN(date.getTime())),
      { message: "Invalid date of birth" }
    )
  ),
  sectionId: z.string().min(1, "Section is required"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  adhaarNumber: z.string().length(12, "Aadhar must be 12 digits"),
  address: z.string().min(1, "Address is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  parentEmail: z.string().email("Invalid email").min(1, "Email is required"),
  parentPhone: z
    .string()
    .regex(/^\d{10}$/, "Enter valid 10-digit phone")
    .min(1, "Parent phone is required"),
  altParentPhone: z
    .string()
    .regex(/^\d{10}$/, "Enter valid 10-digit phone")
    .min(1, "Alternate phone is required"),
  academicYearId: z.string().min(1, "Academic year is required"),
  photoFile: z.array(z.any()).min(1, "Student photo is required").max(1, "Only one photo file allowed"),
  adhaarFile: z.array(z.any()).min(1, "Aadhar file is required").max(1, "Only one Aadhar file allowed"),
  dateOfBirthFile: z.array(z.any()).min(1, "DOB proof file is required").max(1, "Only one DOB file allowed"),
  admissionNumber: z.string().min(1, "Admission number is required"),
  guardianName: z.string().min(1, "Guardian name is required"),
  guardianPhoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Enter valid 10-digit phone")
    .min(1, "Guardian phone is required"),
  admissionDate: z.preprocess(
    (val) => {
      if (!val) return null;
      if (typeof val === "string") return new Date(val);
      return val;
    },
    z.date({ required_error: "Admission date is required" }).nullable().refine(
      (date) => date === null || (date instanceof Date && !isNaN(date.getTime())),
      { message: "Invalid admission date" }
    )
  ),
  udiceSynced: z.boolean().default(true),
  penNumber: z.string().optional(),
  admissionFee: z.number().min(0, "Admission fee must be >= 0"),
});