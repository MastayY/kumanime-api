import { load } from "cheerio";
import { BASE_URL } from "../utils/index.js";
import { default as Axios } from "axios";

export const latestRelease = (req, res) => {
    let data = [];

    Axios.get(BASE_URL)
    .then((response) => {
        const $ = load(response.data);
        const element = $("#postbaru")

        let title, episode, poster, slug;

        element
        .children()
        .find(".misha_posts_wrap > article.animeseries")
        .each(function (i, el) {
            title = $(el).find("h3.title > span").text();
            poster = $(el).find("img").attr("src");
            slug = $(el).find("a").attr("href").match(/\/([^\/]+)\/$/)[1];
            episode = "Eps " + $(el).find("span.episodes").text();

            data.push({
                title,
                poster,
                slug,
                episode
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