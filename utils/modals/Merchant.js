import mongoose from "mongoose";

const MerchantSchema  = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password:{type:String,required:true},
  shop:{type:String,required:true}
});

const MerchantModal = mongoose.model("Merchant", MerchantSchema);

export default MerchantModal;
