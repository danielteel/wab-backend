##1.## Git clone into folder that contains public/

##2.## Create .htaccess , set contents to
PassengerNodejs /home/kcdan/.nvm/versions/node/v12.16.3/bin/node

SetEnv APP_INDEX ./wab-backend/app.js

##3.## Create .env in same folder that contains public/, set contents to
NODE_ENV=production
WAB_HOST=<HostURL> (e.g. mysql.domain.com)
WAB_PORT=3306
WAB_DB=<database> (e.g. wabdatabase)
WAB_USER=<user> (e.g. wabuser)
WAB_PASS=<password> (e.g. s$gslYf)

##4.## Create app.js in same folder that contains public/, set contents to
  require(process.env.APP_INDEX)
  
##5.## cd into wab-backend
##6.## npm run initialize (migrates down, and then to latest, and then runs seed file)
##7.## cd ..
##8.## mkdir tmp
##9.## touch tmp/restart.txt
