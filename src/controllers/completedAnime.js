import { default as Axios } from "axios";
import { BASE_URL, headers, requestFailed } from "../utils/index.js"
import { load } from "cheerio";


export const completedAnime = async (req, res) => {
    const params = req.params.page;
    const page = typeof params === "undefined" ? "" : params === "1" ? "" : `page/${params}`;
    const url = `${BASE_URL}/anime/${page}/?mode&sort=series_title&status=finished+airing&type`;

    let animeData = [];

    try {
        const response = await Axios.get(url, headers);
        const $ = load(response.data);
        const mainElement = $(".result");

        mainElement
        .find("#a-z ul li")
        .each((i, el) => {
            const title = $(el).find("h2").text();
            const poster = $(el).find("img").attr("src");
            const slug = $(el).find("a").attr("href").match(/\anime\/([^\/]+)\/$/)[1];
            const rating = $(el).find(".nilaiseries").text();
            const type = $(el).find(".typeseries").text();

            animeData.push({
                title,
                poster,
                slug,
                rating,
                type
            });
        });

        const currentPage = typeof params == "undefined" ? 1 : parseInt(params);
        const maxPage = parseInt(mainElement.find("span.pages").text().match(/\d+$/)[0]);

        res.status(200).json({
            status: "success",
            currentPage: currentPage,
            maxPage: parseInt(maxPage),
            animeData
        });
    } catch (err) {
        requestFailed(req, res, err);
    }
}