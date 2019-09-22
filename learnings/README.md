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

# Wokring with Heroku!

- First create a dict called *engines* in the package.json file to tell heroku which platform our application is on and which version to use.

- `"engines": {"node": "">=10.4.1", "npm":">=6.4.1"}`

- Now,create a Procfile which is used to tell Heroku the process types our application uses and the commands used to start them. Add this line in the Procfile, `web: npm start`.

- The * Heroku CLI* comes with a utility called Heroku Local. With this utility we can verify our seup and run oour application locally before pushing the application up to Heroku. For this use the command: `heroku local`

- If all goes well, this will start the application on port number 5000.

- Also, dont forget to initialize it as a git repostitory. Heroku uses git as a deployment methood. So, if you have already used git, you'll love this approach! <3!

- Next step is to create an application on Heroku as a remote Git repository of our local repository. To do this, use this command: `heroku create`

- If you log in to your Heroku account in a browser, you’ll also see that the application exists there. Now that you have a place on Heroku for the application, the next step is pushing the application code up.

- Now, it's time to push our local repo to the heroku remote repository.To do this, use the command: `git push heroku master`

- Finally, everything is in place and the application is live on the internet!!!Hooray!
You see it by using the following command: `heroku open`
