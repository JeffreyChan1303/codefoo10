# IGN Code Foo 10 - Front-end project application

### A simple react website with video player and api for IGN CodeFoo10 engineering  intern Application.

## Table of Contents
* [Notes](#Notes)
* [Technologies](#technologies)
* [Setup](#setup)
## Notes

A proxy server is needed to bypass the CORS error when accessing the IGN api through the website. There are a few aspects that weren't as refined due to final exams such as the unappealing mobile view and view on 4k+ sized monitors. Didn't know the Font family in the image so I used Roboto.

## Technologies
Front-end is created with: 
* create-react-app
* React version: 18.0.0
* React Player version: 2.10.0
* Material UI version: 4.12.4
* Screenfull version: 6.0.1
* Axios version: 0.26.1

Proxy server is created with:
* node version: 16.13.1
* express version: 4.17.3
* axios version: 0.26.1
* cors version: 2.8.5

## Setup

### 1. Check if you have node, npm, and git installed.
This can be done by using 'node -v', 'npm -v', and 'git --version' respectively.
##### you can install node [here](https://nodejs.org). This installs both nodejs and npm.
##### you can learn more about installing git [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### 2. Clone repository
Go into the target directory and clone the repository using the code below
```
git clone https://github.com/JeffreyChan1303/codefoo10.git
```
### 3. Initialize node modules
go into the cloned repository and use npm to initialize the modules
```
cd codefoo10
npm install
```
### 4. run the proxy server
go into the server file and run the proxy server to bypass CORS error
##### *Default port: 3000, this can be changed on line 22 on /codefoo10/server/app.js.*
```
cd server
node app.js
```
### 5. run the webpage
create a new terminal, go into the codefoo10 directory and start the website
##### *If default port for the server was changed from 3000, adjust the server call on line 7 of /codefoo10/App.js to the new port number.*
```
cd codefoo10
npm start
```

