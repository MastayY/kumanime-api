import { load } from "cheerio";
import { default as Axios } from "axios";
import { BASE_URL, filterSpan, headers, requestFailed } from "../utils/index.js";

export const animeDetail = async (req, res) => {
    const slug = req.params.slug;
    const url = `${BASE_URL}/anime/${slug}`;

    try{
        const response = await Axios.get(url, headers);
        const $ = load(response.data);
        const mainElement = $("main.content");
        const bottomTitle = mainElement.find(".kotakseries .bottomtitle");

        let animeData = {};

        animeData.title = mainElement.find("h1.entry-title").text().replace(/^Nonton\s/, '');
        animeData.alias = filterSpan(bottomTitle, "Synonyms:");
        animeData.poster = mainElement.find(".poster > img").attr("src");
        animeData.synopsis = mainElement.find(".entry-content > p").text();
        animeData.status = mainElement.find(".extra > .statusseries").text();
        animeData.total_episode = mainElement.find(".extra > .durasiseries").text();
        animeData.season = mainElement.find(".extra > .dateseries > a").text();
        animeData.rating = mainElement.find(".scoreseries > .nilaiseries").text();
        animeData.type = mainElement.find(".scoreseries > .typeseries").text();
        animeData.studios = filterSpan(bottomTitle, "Studios:");
        animeData.duration = filterSpan(bottomTitle, "Duration:");
        animeData.aired = filterSpan(bottomTitle, "Aired:");
        animeData.trailer = mainElement.find(".rt > a.trailerbutton").attr("href");

        let genreList = [];
        mainElement.find(".tagline > a").each((i, el) => {
            const genre_title = $(el).text();
            const genre_slug = $(el).attr("href").match(/\/genres\/([^\/]+)/)[1]

            genreList.push({
                genre_title,
                genre_slug
            });
        });

        let epsList = [];
        mainElement.find("ul.misha_posts_wrap2 > li").each((i, el) => {
            const eps_title = $(el).find("span.t1 > a").text();
            const eps_slug = $(el).find("span.t1 > a").attr("href").match(/\/([^\/]+)\/$/)[1];
            const eps_date = $(el).find("span.t3").text();

            epsList.push({
                eps_title,
                eps_slug,
                eps_date
            });
        });

        animeData.genre_list = genreList;
        animeData.eps_list = epsList;

        res.json(animeData);

    } catch(err) {
        requestFailed(req, res, err);
    }

}