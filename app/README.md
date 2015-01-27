
DEPENDENCIES  
============  
Node.js v0.10.29+  
http://nodejs.org/download/  
mongodb v2.6.1+  
http://docs.mongodb.org/manual/installation/  
  
  
GET STARTED  
===========  
install dependencies  
open terminal and navigate to this directory's parent, then:
npm install -g grunt-cli  
npm install  
grunt reset  
grunt  

USING GRUNT  
===========  
To build for the browser client, from the top level (..), use:  
grunt  
  
This will allow you to make changes to the jade, stylus, and js files within /client, and they will be automatically compiled into a usable, minified form. You need only refresh the page to see changes.  

To initialize or reset the member database, use:  
grunt reset  
  
  
WEB APPLICATION  
===============  
The ktp web app browser client is implemented in /client

The web applications is accessible at kappathetapi.com/app, or http://localhost:3000/app in development.  

RESTFUL API  
===========  
Schemas in /model are exposed by a RESTful API, located at kappathetapi.com/api.  
  
To interface with the restful api, each request needs an 'x-access-token' header, with a value of 5af9a24515589a73d0fa687e69cbaaa15918f833  
  
Currently the only route worth any value is:  
  
GET /api/members  
GET /api/members/:id  
PUT /api/members/:id  
  
To authenticate users with the application, use:  
  
POST /api/login  
  
with post data of {account,password}, with the member accountId and password, respectively.  
The server will return one of {'account not found','invalid password','success'}, where 'success' indicates a valid authentication.  
  
For more information on the exact implementation of the API reference https://github.com/baugarten/node-restful  
