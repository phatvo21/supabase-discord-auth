# UI serves the authentication request

- [Introduction](#introduction)
- [Installation](#installation)
- [Commands](#commands)
- [Host](#host)


# Introduction
Application allows the identity provider invoke the callback url. And based on the callback, we can obtain the Supabase access token display in the UI.

# Installation
Before starting to explore this application. You have to make sure your machine has a Node version >= 15.
- Node version >= 15 (Required)
- Run the command npm i to install all the dependencies of this application.

# Commands
By using the following commands you will make the application work in the proper way.

`` 
npm run start -- This command allows you to start the application
``

# Host
The application will be started after typing the following command above and you can obtain the access token under `http://${url}:3001/`


