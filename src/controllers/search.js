import { default as Axios } from "axios";
import { BASE_URL, headers, requestFailed } from "../utils/index.js";
import { load } from "cheerio";

export const searchAnime = async (req, res) => {
    const params = req.params.query;
    const url = `${BASE_URL}/?s=${params}`;

    try {
        const response = await Axios.get(url, headers);
        const $ = load(response.data);
        const mainElement = $("main.content");

        let animeData = [];

        mainElement
        .find(".result ul li")
        .each((i, el) => {
            const title = $(el).find("h2").text();
            const poster = $(el).find("img").attr("src");
            const slug = $(el).find("a").attr("href").match(/\anime\/([^\/]+)\/$/)[1];
            const rating = $(el).find(".nilaiseries").text();
            const type = $(el).find(".typeseries").text();
            const season = $(el).find(".rsrated").text();

            animeData.push({
                title,
                poster,
                slug,
                rating,
                type,
                season
            });
        });

        res.status(200).json({
            status: "success",
            query: params,
            animeData
        });
    } catch (err) {
        requestFailed(req, res, err);
    }
}