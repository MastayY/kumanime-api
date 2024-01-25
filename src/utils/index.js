import { default as Axios } from "axios";

export const BASE_URL = 'https://nontonanimeid.org';

export const requestFailed = (req,res,err)=>{
    res.status(502).send({
        'status':false,
        'message':err.message
    })
}

export const filterSpan = (parent, content) => {
    const res = parent
        .find(`span:contains(${content})`)
        .text()
        .replace(`${content} `, "");
    return res;
};

export const getData = async (url) => {
    try {
        const response = await Axios.get(url);
        const $ = load(response.data);

        // Use a single regex pattern to capture the file URL
        const regex = /'file'\s*:\s*'([^']*)'|"file"\s*:\s*"(.*?)"/;
        const match = $.html().match(regex);

        if (match && (match[1] || match[2])) {
            const fileUrl = match[1] || match[2];
    
            return fileUrl;
        }

        return "-";
    } catch (error) {
        return "-";
    }
};