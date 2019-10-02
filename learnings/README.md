# Working with npm

- `npm install --save package-name`
	- Use this command to install and save a package managed using npm.

# Setting up Express Project

- `node --version`
- `npm --version`
- `express --version`
- `express --css=less --view=hbs --git` : To start the express project!(With css preprocessor as less and HTML template engine to Handlebars)
- `npm install` : Install all the packages installed in package.json file (dependencies).
- `DEBUG=loc8r:* npm start` : Starts the server.

# Working with Heroku!

- First create a dict called **engines** in the package.json file to tell heroku which platform our application is on and which version to use.

- `"engines": {"node": "">=10.4.1", "npm":">=6.4.1"}`

- Now,create a Procfile which is used to tell Heroku the process types our application uses and the commands used to start them. Add this line in the Procfile: `web: npm start`.

- The **Heroku CLI** comes with a utility called Heroku Local. With this utility we can verify our seup and run oour application locally before pushing the application up to Heroku. For this use the command: `heroku local`

- If all goes well, this will start the application on port number 5000.

- Also, dont forget to initialize it as a git repostitory. Heroku uses git as a deployment methood. So, if you have already used git, you'll love this approach! <3!

- Next step is to create an application on Heroku as a remote Git repository of our local repository. To do this, use this command: `heroku create`

- If you log in to your Heroku account in a browser, you’ll also see that the application exists there. Now that you have a place on Heroku for the application, the next step is pushing the application code up.

- Now, it's time to push our local repo to the heroku remote repository.To do this, use the command: `git push heroku master`

- Finally, everything is in place and the application is live on the internet!!!Hooray!
You see it by using the following command: `heroku open`

# Working with Mongo Shell

- `show dbs` : Shows a list of all the lcoal MongoDB databases.
- `use db_name` : This command allows us to use the database 'db_name'.
- `show collections` : List of the collections of the connected database.
- `db.collection_name.find()` : Querying through a collection.  
- `db.collection_name.find().pretty()`: To prettify the MongoDB output.
- `db.collection_name.save()`: This command directly creates the new collection along with adding data into the database when used for the first time.

# Connecting mLab with Heroku

### For manual connection

- Get the connection string from mLab.
- Run the command `heorku config:set MLAB)URL=mongodb://<dbuser>:<dbpassword>@ds229108.mlab.com:29108/locations` from root folder of you application. 
- Don't forget to replace the dbuser and dbpassword with your credentials.

# Working with Data

- `mongodump -h localhost:27017 -d Loc8r` : Use this command to dump the data in the Loc8r database in the current directory from the terminal. A new folder called *dump* would be created after this.

- `mongorestore -h <live_host_and_port> -d <live_database_name> -u <username_for_live_database> -p <user_password> <path_to_dump_directory>`: Use this command to push data to your live database.

- `mongo hostname:port/database_name -u username - password` : Use this command to connect the MongoDB shell to the remote database!