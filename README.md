Run the following in the command line under project root directory:
$ npm install
$ node index.js

Postgres command:
psql -U postgres -d americandream -h localhost

Then open index.html in a browser(testing only)

App should function from http://localhost:3000/*endpointname*

11/14 page folders were moved into public to reflect the localhost run condition

line 6 in index.js "app.use(express.static('public'));"(reccomended by Dean) is used to statically access the 
html file from the public folder, this should not affect the functionality of the code outside of direct file calls 
which will be addressed in the push following "file restructuring" 
