import { load } from "cheerio";
import { default as Axios } from "axios";
import { BASE_URL, requestFailed } from "../utils/index.js";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip,deflate",
}

export const animeMovie = async (req, res) => {
    const params = req.params.page;
    const page = typeof params == "undefined" ? "1" : `${params}`;
    const url = `${BASE_URL}/movie/page/${page}/`;
    const domainUrl = "https://anime-indo.biz";
    let data = [];

    try {
        const response = await Axios.get(url, {headers});
        const $ = load(response.data);


        $("#content-wrap > div.menu > table").each((i, el) => {
            data.push({
                title: $(el).find(" tbody > tr > td.videsc > a").text(),
                poster: domainUrl + $(el).find("img").attr("src"),
                slug: $(el).find(" tbody > tr > td.vithumb > a").attr("href").match(/\/anime\/([^/]+)\//)?.[1],
                type: $(el).find(" tbody > tr > td.videsc > span:nth-child(3)").text(),
                synopsis: $(el).find(" tbody > tr > td.videsc > p").text(),
                release: $(el).find(" tbody > tr > td.videsc > span:nth-child(5)").text(),
                duration: $(el).find("tbody > tr > td.videsc > span:nth-child(4)").text(),
            });
        });

        res.status(200).json({
            status: "success",
            data,
        });
    } catch (err) {
        requestFailed(req, res, err);
    }
}