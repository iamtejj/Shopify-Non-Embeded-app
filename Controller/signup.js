import MerchantModal from "../utils/modals/Merchant.js";

const signup = async function(req,res){
    const {email,password,shop } = req.body;
    if(email && password && shop){
         const merchant = await MerchantModal.create({
            email,
            password, 
            shop
        });
     return  res.json({
        shop:shop,
        message:"Signup Successfully"
     }); 
    }else{
        return res.status(403).json({
            message:"Please Provide Credential"
        })
    } 
 
}

export {signup} 