import mongoose from "mongoose";
const generateFields = (inputFields) => {
  const newDataCheck = {};
  if (Object.keys(inputFields)) {
    Object.keys(inputFields).map((item, index) => {
      if (inputFields[item] && inputFields[item].type === "string") {
        if (inputFields[item].required) {
          newDataCheck[item] = {
            type: String,
            required: true,
          };
          if (inputFields[item].default) {
            newDataCheck[item]["default"] = inputFields[item].default;
          }
        } else {
          newDataCheck[item] = {
            type: String,
            required: false,
          };
          if (inputFields[item].default) {
            newDataCheck[item]["default"] = inputFields[item].default;
          }
        }
      }

      if (inputFields[item] && inputFields[item].type === "number") {
        if (inputFields[item].required) {
          newDataCheck[item] = {
            type: Number,
            required: true,
            default: inputFields[item].default ? inputFields[item].default : 0,
          };
        } else {
          newDataCheck[item] = {
            type: Number,
            required: false,
            default: inputFields[item].default ? inputFields[item].default : 0,
          };
        }
      }
      if (inputFields[item] && inputFields[item].type === "select") {
        if (inputFields[item].required) {
          newDataCheck[item] = {
            type: String,
            required: true,
            options: inputFields[item].options,
            default: inputFields[item].default ? inputFields[item].default : "",
          };
        } else {
          newDataCheck[item] = {
            type: String,
            required: false,
            options: inputFields[item].options,
            default: inputFields[item].default ? inputFields[item].default : "",
          };
        }
      }
      if (inputFields[item] && inputFields[item].type === "related") {
        if (inputFields[item].required) {
          newDataCheck[item] = {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: inputFields[item].model,
          };
        } else {
          newDataCheck[item] = {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: inputFields[item].model,
          };
        }
      }
    });
  }
  newDataCheck["created_by"] = {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  };
  newDataCheck["updated_by"] = {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  };
  newDataCheck["published_status"] = {
    type: String,
    required: false,
    enum: ["PUBLISHED", "DRAFT"],
    default: "PUBLISHED",
  };
  return newDataCheck;
};

export default generateFields;
