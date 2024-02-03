import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3000;

const corsOptions = {
    origin: '*',
    credentials: true
}

app.use(cors());

app.use('/api', router)
app.use('/', (req, res) => {
    res.json({
        author: "MastayY",
        routes: {
            latestAnime: "/latest",
            popularAnime: "/popular",
            movieAnime: "/movie/page/:page",
            search: "/search/:query",
            detailAnime: "/anime/:slug",
            detailEpisode: "/episode/:slug",
        },
    });
});

app.use('*',(req,res) =>{
    res.json({
        'status':'not found path',
        message: 'read the docs here https://github.com/MastayY/kumanime-api'
    })
})
app.listen(port, () => {
    console.log('listening on port', port)
})