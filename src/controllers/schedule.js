import { load } from "cheerio";
import { default as Axios } from "axios";
import { BASE_URL, headers } from "../utils/index.js";

export const schedule = (req, res) => {
    const url = `${BASE_URL}/jadwal-rilis`;

    Axios.get(url, headers)
    .then((response) => {
        const $ = load(response.data);
        const container = $("div.container");

        let schedules = [];

        container.find(".tab-link").each(function (i, el) {
            const day = $(el).text();
            const dataTab = $(el).attr("data-tab");

            const dataList = [];

            $(`div#${dataTab}`).find("ul li").each(function (i, li) {
                const title = $(li).find(".top h2").text();
                const poster = $(li).find(".top img").attr("src");
                const slug = $(li).find("a").attr("href").match(/\anime\/([^\/]+)\/$/)[1];

                const parts = $(li).find("p.tagpst1").text().split('\n').map(part => part.trim())
                const total_episode = parts[1].split(': ')[1];
                const update_every = parts[2].split(': ')[1];
                const rating = $(li).find("span.nilaiseries").text();
                const type = $(li).find("span.typeseries").text();

                dataList.push({
                    title,
                    poster,
                    slug,
                    rating,
                    type,
                    total_episode,
                    update_every,
                })

            });
            schedules.push({ day, animeData: dataList });
        });

        res.status(200).json({
            status: "success",
            schedules,
        });
    })
    .catch((e) => {
        console.log(e.message);
    });
}
