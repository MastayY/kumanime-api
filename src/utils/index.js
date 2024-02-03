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

export const headers = {
    "Referer": BASE_URL,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip,deflate",
}