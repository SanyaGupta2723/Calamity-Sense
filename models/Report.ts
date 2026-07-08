import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IReport extends Document {
  user: mongoose.Types.ObjectId;
  disaster: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  address: string;
  severity: "Low" | "Medium" | "High";
  status: "Pending" | "Approved" | "Rejected";
}

const ReportSchema = new Schema<IReport>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    disaster: {
      type: Schema.Types.ObjectId,
      ref: "Disaster",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Report =
  models.Report || model<IReport>("Report", ReportSchema);

export default Report;