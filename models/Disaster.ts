import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IDisaster extends Document {
  title: string;
  slug: string;
  description: string;
  image: string;
  severity: "Low" | "Medium" | "High";
  dos: string[];
  donts: string[];
  emergencyNumbers: string[];
  isActive: boolean;
}

const DisasterSchema = new Schema<IDisaster>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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

    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    dos: [
      {
        type: String,
        trim: true,
      },
    ],

    donts: [
      {
        type: String,
        trim: true,
      },
    ],

    emergencyNumbers: [
      {
        type: String,
        trim: true,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Disaster =
  models.Disaster || model<IDisaster>("Disaster", DisasterSchema);

export default Disaster;