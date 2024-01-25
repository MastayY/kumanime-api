import { load } from "cheerio";
import { default as Axios } from "axios";
import { BASE_URL, filterSpan, requestFailed } from "../utils/index.js";

export const popularSeries = (req, res) => {
    let data = [];

    Axios.get(BASE_URL)
    .then((response) => {
        const $ = load(response.data);
        const element = $("div.kotakbatas")

        let title, poster, slug;

        element
        .find(".bor")
        .each(function (i, el) {
            title = $(el).find("img").attr("alt");
            poster = $(el).find("img").attr("src");
            slug = $(el).find("a").attr("href").match(/\anime\/([^\/]+)\/$/)[1];

            data.push({
                title,
                poster,
                slug
            });
        });

        res.status(200).json({
            status: "success",
            data,
        });
    })
    .catch((e) => {
        console.log(e.message);
    })
}