import MerchantModal from "../utils/modals/Merchant.js";

const signin = async function(req, res) {
    const { email, password } = req.body;
    if (email, password) {
        const merchant = await MerchantModal.findOne({ email: email });
        if (!merchant) {
            return res.status(403).json({
                message: "Invalid Credential"
            });
        }
        let hour = 24 * 60 * 60 * 1000;
        return res.cookie(cookie_name, 'app_token', { maxAge: hour });
    }
}

export { signin }