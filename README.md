###twitter live streaming###
> get a stream from twitter by using a certain hashtag (or from a user or your stream or whatever you want). options for twitter are from [twit package](https://github.com/ttezel/twit)  
> graphic (jade + stylus files) by [@emanbrivio](https://github.com/emanuelebrivio)


#####how to use#####
1. make a twitter app from [developers portal](https://apps.twitter.com/)
2. make an env file like this
```bash
export CONSUMER_KEY=xxx  
export CONSUMER_SECRET=xxx  
export ACCESS_TOKEN=xxx  
export ACCESS_TOKEN_SECRET=xxx  
export PORT=xxx  
export HASHTAG=xxx
```
3. clone repo, `npm install`, `source .env`, `npm run dev` (make sure you got `nodemon` module installed globally! if not using `npm install -g nodemon`)
4. open browser!