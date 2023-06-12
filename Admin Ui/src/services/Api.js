import axios from 'axios';
export const getData = async (urlEndPoint) => {
    const baseURL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/";
    try{
        const res = await  axios.get(baseURL+urlEndPoint)
        return res;
    }
    catch(err){
        console.error("ERROR"+err);
        throw err;
    }
};