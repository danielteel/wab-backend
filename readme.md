1. git clone
2. create .env file with
export NODE_ENV = production
export WAB_HOST = host here e.g.   sql.website.com
export WAB_PORT = port here e.g.   3306
export WAB_DB = database name
export WAB_USER = user name
export WAB_PASS = user password

3. npm run prod-init
4. modify tmp/restart.txt to restart passenger