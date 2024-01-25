# Kumanime API

Streaming dan download Anime subtitle Indonesia

# Sumber:

https://nontonanimeid.org

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

| Endpoint              | Params          | Description                |
| --------------------- | --------------- | -------------------------- |
| /latest               | -               | Latest Release             |
| /popular              | -               | Popular Series             |
| /ongoing              | -               | Ongoing Anime              |
| /completed/page/:page | page            | default page: 1            |
| /schedule             | -               | Jadwal Tayang              |
| /search/:query        | query           | Search Anime               |
| /anime/:slug          | :slug           | Anime details              |
| /episode/:slug        | :slug           | Detail Episode             |

# Support Me
[Saweria](https://saweria.co/Mastay)