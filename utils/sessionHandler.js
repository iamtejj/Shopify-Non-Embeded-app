import SessionModel from "./modals/SessionModel.js";
import Cryptr from "cryptr";
import { Session } from "@shopify/shopify-api";

const cryption = new Cryptr(process.env.ENCRYPTION_STRING);
const storeSession = async (session) => {
    await SessionModel.findOneAndUpdate({ id: session.id },
        {
            content: cryption.encrypt(JSON.stringify(session)),
            shop: session.shop
        },
        { upsert: true }
    );

    return true;
}

const loadSession = async (id)=>{
    const sessionResult = await SessionModel.findOne({id});
    if(!sessionResult){
        return undefined
    }
    if(sessionResult.content.length > 0){
        const sessionObject = JSON.parse(cryption.decrypt(sessionResult.content));
        const returnsession = new Session(sessionObject);
        return returnsession
    }
    return undefined;
}

const deleteSession = async ()=>{
    await SessionModel.deleteMany({id});
    return true
}

const sessionHandler = {storeSession,loadSession,deleteSession}

export default sessionHandler