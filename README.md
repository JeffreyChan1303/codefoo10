# IGN Code Foo 10 - Front-end project application

### A simple react website with video player and api for IGN CodeFoo10 intern Application.

## Table of Contents
* [Notes](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
## Notes

A proxy server is needed to bypass the CORS error when accessing the IGN api through the website. There are a few aspects that weren't as refined due to final exams such as the unappealing mobile view and view on 4k+ sized monitors. Didn't know the Font family in the image so I used Roboto.

## Technologies
Front-end is created with: 
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
To run this project Node.js is required. 
Run the proxy server on localhost using node.js

Then use npm start to run the website, change line 46 based on where the proxy server was hosted.

Choose localhost port number on line 22 ./proxyserver app.js (default: port 3000).
Change portNumber to the proxy server port number on line 7 ./App.js (default: port 3000).

run node app.js on ./proxyserver
run npm start on 

```
$ ./proxyserver node app.js
$ npm start
```


1. Download [Node.js](nodejs.org/en/) version 16.13.1 or newer. This should come with npm.
2. Clone this repository by going into the target directory on your device and input 'git clone https://github.com/JeffreyChan1303/codefoo10.git' into the terminal.
```
npm i https://github.com/JeffreyChan1303/codefoo10.git
```
3. go into /server directory and input 'node app.js' into the terminal. This initializes the prozy server.
```
cd proxyserver
node app.js
```
4. return to codefoo10 file and input 'npm start'. This initializes the client/website.
```
cd ..
npm start
```


