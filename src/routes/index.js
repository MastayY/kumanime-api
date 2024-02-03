import { Router } from "express";
import { animeDetail, latestRelease,episodeDetail, popularSeries, searchAnime, animeMovie } from "../controllers/index.js";

const router = Router();

router.get('/latest/', latestRelease);
router.get('/latest/page/:page', latestRelease);
router.get('/popular', popularSeries);
router.get('/movie', animeMovie);
router.get('/movie/page/:page', animeMovie);
router.get('/anime/:slug', animeDetail);
router.get('/episode/:slug', episodeDetail);
router.get('/search/:query', searchAnime);

export default router;
