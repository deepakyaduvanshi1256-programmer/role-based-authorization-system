import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isAllowed: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);


// Password Hash
userSchema.pre("save", async function () {

  // Password change nahi hua to kuch mat karo
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

});


// Password Compare
userSchema.methods.matchPassword = async function (enteredPassword) {

  return await bcrypt.compare(
    enteredPassword,
    this.password
  );

};


const User = mongoose.model("User", userSchema);

export default User;