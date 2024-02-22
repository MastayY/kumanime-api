import { default as Axios } from "axios";
import { load } from "cheerio";

export const BASE_URL = 'https://anime-indo.biz';

export const requestFailed = (req,res,err)=>{
    res.status(502).send({
        'status':false,
        'message':err.message
    })
}

export const getData = async (url) => {
    try {
        const response = await Axios.get(url);
        const $ = load(response.data);

        const streamUrl = $("video > source").attr("src");

        return streamUrl;
    } catch (error) {
        return error.message;
    }
};