Running the Webserver
To run the Express webserver for this Spotify project, you need a Spotify Developer account. Follow these steps:

Create or log in to your Spotify account at https://developer.spotify.com/dashboard/.

Follow the instructions to create a client id for run this application.

Indicate that you are building a Website and are not developing a commercial application.
Set the redirect URI to:
http://localhost:8888/callback

This URI informs Spotify to redirect back to our Express webserver after authentication and authorization.

Update a file named client_secret.json in the webserver folder (not the routes folder) with your consumer key and secret:
{
 "client_id": "Your Client Key",
 "client_secret": "Your Client Secret"
}:

To run the Express webserver, navigate to the webserver folder and execute:
npm start

This will start the webserver at http://localhost:8888. Ensure dependencies are installed first:
npm install

Note: If you make changes to the webserver code, end the running program with Ctrl-C and restart it using npm start.

Running the Client
To run the Angular client, follow these steps:

Navigate to the client folder:
cd client

Run the following command:
ng serve --open

Note: --open is optional.

This will start the client at http://localhost:4200. Using the --open flag will open it in the browser. Ensure dependencies are installed first:
npm install

Any code changes will be automatically reloaded on the client.