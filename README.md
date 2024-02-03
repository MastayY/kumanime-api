# Kumanime API
<p align="center">
  <a href="https://github.com/LuckyIndraEfendi">
    <img src="https://avatars.githubusercontent.com/u/93984625?v=4" alt="Mastay" width="120" >
  </a>
  
  <h3 align="center">Kumanime API</h3>
  <p align="center">
    <samp>Rest API gratis untuk mendapatkan data anime serta link streaming anime dari website <a href="https://anime-indo.biz">AnimeIndo</a></samp>
  </p>
</p>

# Instalasi

- Jalankan perintah di terminal

```sh
# clone repo
git clone https://github.com/MastayY/kumanime-api.git

# masuk folder
cd kumanime-api

# install dependensi
npm install

# jalankan server
npm run dev
```

- Server akan berjalan di http://localhost:3000

# Routes
Endpoint : http://localhost:3000/api

| Endpoint              | Params          | Description                |
| --------------------- | --------------- | -------------------------- |
| /latest               | -               | Latest Release             |
| /popular              | -               | Popular Series             |
| /movie/page/:page     | :page           | Anime Movie                |
| /search/:query        | :query          | Search Anime               |
| /anime/:slug          | :slug           | Anime details              |
| /episode/:slug        | :slug           | Detail Episode             |

# Support Me
[Saweria](https://saweria.co/Mastay)
