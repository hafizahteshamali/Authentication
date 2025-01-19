import mongoose from "mongoose";

const AuthSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      Required: true,
    },
    Email: {
      type: String,
      Required: true,
    },
    Password: {
      type: String,
      Required: true,
    },
    Role: {
      type: String,
      Required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    ResetPasswordToken: {
      type: String,
    },
    ExpireResetPasswordToken: {
      type: Date,
    }
},
{ timestamps: true }
);

const AllUser = mongoose.model("users", AuthSchema);

export default AllUser;
