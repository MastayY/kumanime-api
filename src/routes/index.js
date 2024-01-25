import { Router } from "express";
import { animeDetail, latestRelease,episodeDetail, popularSeries, schedule, ongoingAnime, completedAnime, searchAnime } from "../controllers/index.js";

const router = Router();

router.get('/latest', latestRelease);
router.get('/schedule', schedule);
router.get('/popular', popularSeries);
router.get('/ongoing', ongoingAnime);
router.get('/completed', completedAnime);
router.get('/completed/page/:page', completedAnime);
router.get('/anime/:slug', animeDetail);
router.get('/episode/:slug', episodeDetail);
router.get('/search/:query', searchAnime);

export default router;
