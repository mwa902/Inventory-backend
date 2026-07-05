import mongoose from "mongoose";

const suppilerSchema = new mongoose.Schema({
   Name = {type: String, required: true},
   company = {type: String, required: true},
   phone_number = {type: String, required: true},
   status = {type: String, required: true},
},
{timestamp: true}
);

export default mongoose.model("supplier",supplierSchema);