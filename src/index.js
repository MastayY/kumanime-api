import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import axios from 'axios';

const userAgent = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
    'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
]

const app = express();
const port = 3000;

app.use(cors());
axios.defaults.validateStatus = () => true;
axios.defaults.headers.common['User-Agent'] = userAgent[Math.random() * userAgent.length | 0];

app.use('/api', router)
app.use('/', (req, res) => {
    res.json({
        author: "MastayY",
        routes: {
            latest: "/latest",
            popular: "/popular",
            schedule: "/schedule",
            ongoing: "/ongoing",
            completed: "/completed/page/:page",
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