import { load } from "cheerio";
import { default as Axios } from "axios";
import { BASE_URL, requestFailed } from "../utils/index.js";

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip,deflate",
}

export const animeDetail = async (req, res) => {
    const slug = req.params.slug;
    const url = `${BASE_URL}/anime/${slug}/`;
    const domainUrl = "https://anime-indo.biz";
    
    try {
        const response = await Axios.get(url, {headers});
        const $ = load(response.data);
        const mainElement = $("div.detail");

        let animeData = {};

        animeData.title = mainElement.find("h2").text().replace(/^Nonton\s/, '');
        animeData.poster = domainUrl + mainElement.find("img").attr("src");
        animeData.synopsis = mainElement.find("p").text();

        let genreList = [];
        mainElement.find("li").each((i, el) => {
            const genreTitle = $(el).find("a").text();
            genreList.push(genreTitle);
        });

        let epsList = [];
        $("#content-wrap > div.ngirix > div:nth-child(4) > div > a").each((i, el) => {
                epsList.push({
                    eps_title: `Episode${$(el).text()}`,
                    eps_slug: $(el).attr("href").match(/\/([^/]+)\/$/)[1],
                });
            }
        );

        animeData.genres = genreList;
        animeData.episodes = epsList;

        res.status(200).json({
            status: "success",
            animeData,
        });

    } catch(err) {
        requestFailed(req, res, err);
    }

}