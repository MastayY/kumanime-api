import { load } from "cheerio";
import { BASE_URL, requestFailed } from "../utils/index.js";
import { default as Axios } from "axios";

export const episodeDetail = async (req, res) => {
    const slug = req.params.slug;
    const url = `${BASE_URL}/${slug}`;

    try {
        const response = await Axios.get(url);
        const $ = load(response.data);
        const mainElement = $("main.content");

        let eps_detail = {};

        eps_detail.title = mainElement.find("h1.entry-title").text();
        eps_detail.thumb = mainElement.find(".featuredimgs > img").attr("src");
        eps_detail.updated = mainElement.find("time.updated").text();
        eps_detail.stream_url = mainElement.find("#videoku iframe").attr("src");
        eps_detail.prev_eps_slug = mainElement.find("#navigation-episode .nvs:first > a").attr("href")?.match(/\/([^\/]+)\/$/)?.[1] || "-";
        eps_detail.anime_slug = mainElement.find("#navigation-episode .nvs:nth-child(2) > a").attr("href")?.match(/\/anime\/([^\/]+)/)?.[1] || "-";
        eps_detail.next_eps_slug = mainElement.find("#navigation-episode .nvs:nth-child(3) > a").attr("href")?.match(/\/([^\/]+)\/$/)?.[1] || "-";

        let downloadLinks = [];
        mainElement.find(".listlink > a").each((i, el) => {
            const linkTitle = $(el).text();
            const link = $(el).attr("href");

            downloadLinks.push({
                linkTitle,
                link
            });
        });

        eps_detail.download_links = downloadLinks;


        res.json(eps_detail);
    } catch (e) {
        requestFailed(req, res, e);
    }
}