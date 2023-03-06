# Setup


### 1. Setup the bot
* Go to https://discord.com/developers/applications
* Create an application by clicking on the `New application` button.
* Choose the name of the application, and create it
* In the general informations of the application, copy the application id, and create an environment variable called `DISCORD_ID` with it's value.
* Copy the public key, and create an environment variable called `DISCORD_PUBLIC_KEY` with this public key.
* Go in the tab `OAuth2` and then in `General` in the discord developer portal.
* Reset the client secret, copy the new client secret and create an environment variable called `DISCORD_AUTH_SECRET` with its value.
* Click on the button `Add Redirect`, and inside the new input field write this `https://<host-name>/api/auth/callback/discord`
* Go to the bot tab, and then create a bot by clicking on the button.
* Go to `https://discord.com/oauth2/authorize?client_id=<discord-id>&permissions=268435460&scope=bot` with the value of the environment variable called `DISCORD_ID`.
* Add the bot to your server.

### 2. Setup mongoose
* Create an environment variable called `MONGO_URI` like this one (if you're using mongodb atlas) `mongodb+srv://<user>:<password>@test.ebsox.mongodb.net/<database-name>?retryWrites=true&w=majority`

### 3. Setup the guild
* In the guild settings, add the bot's role above the verified role
* Verify in the permissions that the bot is able to manage roles.

### 4. Setup the website
* Go in `/utils/server.config.js`, you can change some config things in it.
* Do the same in `/utils/app.config.js`
* Go to `https://<host-name>/api/init` to init the slash commands
* Then you can delete the third line of `/pages/api/init.js` so it will not re-register the commands when you go to `/api/init`.

It should works. Btw it's normal if the bot is always offline :)
I can try to set it's status as online if you want.