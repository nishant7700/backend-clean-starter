import mongoose from "mongoose";
import AutoIncrementField from "mongoose-sequence";
import bcrypt from "bcryptjs";
const AutoIncrement = AutoIncrementField(mongoose);
const bikesSchema = mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Bike",
    },
    year: { type: String, required: false },
    bike_no: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const addressSchema = mongoose.Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: false },
    pin: { type: String, required: false },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    address_driver: {
      type: String,
    },
    emergency_contact_no: {
      type: String,
    },
    bikes: [bikesSchema],
    address: [addressSchema],
    role: {
      type: String,
      required: true,
      enum: ["CUSTOMER", "SUPER_ADMIN", "MECHANIC"],
      default: "CUSTOMER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 100000 });

const User = mongoose.model("User", userSchema);

export default User;
