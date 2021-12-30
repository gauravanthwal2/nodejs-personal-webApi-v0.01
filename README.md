# How to Setup a node project with Heroku

1. Create a node project, and Deploy that on Github
```bash
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M master
    git remote add origin git@github.com:gauravanthwal/nodejs-my-personal-web-api.git
    git push -u origin master
```
2. Login on Heroku
```bash
   heroku login
```
3. Create Herolu app
```bash
   heroku create your-app-name
```
4. Push code on Heroku cli after deploying on github
```bash
   git remote heroku
```