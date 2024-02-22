import { load } from "cheerio";
import { BASE_URL, requestFailed } from "../utils/index.js";
import { default as Axios } from "axios";

const headers = {
    Accept: "application/json, text/plain, */*",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, compress, deflate, br",
}

export const latestRelease = async (req, res) => {
    const params = req.params.page;
    const page = typeof params == "undefined" ? "1" : `${params}`;
    const url = `${BASE_URL}/page/${page}/`;

    let data = [];

    try{
        const response = await Axios.get(url, {
            headers
        });
        const $ = load(response.data);

        $("#content-wrap > div.ngiri > div.menu > a").each(function (i, el) {
            data.push({
                title: $(el).find("div > p").text(),
                slug: this.attribs.href.match(/\/([^/]+)\/$/)[1],
                poster: $(el).find("div > img").attr("data-original"),
                episode: $(el).find("span.eps").text(),
            });
        });

        res.status(200).json({
            status: "success",
            data,
        });

    } catch(err) {
        requestFailed(req, res, err);
    }
}