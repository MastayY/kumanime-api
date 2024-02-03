import { load } from "cheerio";
import { BASE_URL, headers, requestFailed } from "../utils/index.js";
import { default as Axios } from "axios";

export const ongoingAnime = async (req, res) => {
    const url = `${BASE_URL}/ongoing-list`;
    let animeData = [];

    try {
        const response = await Axios.get(url, headers);
        const $ = load(response.data);
        const mainElement = $("main.content");

        mainElement
        .find(".contentpost .animeseries")
        .each((i, el) => {
            const title = $(el).find(".title span").text();
            const poster = $(el).find("img").attr("src");
            const rating = $(el).find(".kotakscore").text();
            const slug = $(el).find("a").attr("href").match(/\anime\/([^\/]+)\/$/)[1]
            
            animeData.push({
                title,
                poster,
                rating,
                slug
            })
        });

        res.status(200).json({
            status: "success",
            animeData
        });
    } catch (err) {
        requestFailed(req, res, err);
    }
}