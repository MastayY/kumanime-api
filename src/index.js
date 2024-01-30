import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(cors());
axios.defaults.validateStatus = () => true;
axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36';

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