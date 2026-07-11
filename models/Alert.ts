import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IAlert extends Document {
  title: string;
  description: string;
  disaster: mongoose.Types.ObjectId;
  report: mongoose.Types.ObjectId;
  severity: "Low" | "Medium" | "High";
  location: string;
  isActive: boolean;
}

const AlertSchema = new Schema<IAlert>(
  {
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

    disaster: {
      type: Schema.Types.ObjectId,
      ref: "Disaster",
      required: true,
    },

    report: {
      type: Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Alert =
  models.Alert || model<IAlert>("Alert", AlertSchema);

export default Alert;