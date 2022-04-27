# IGN Code Foo 10 - Front-end project application

### A simple react website with video player and api for IGN CodeFoo10 intern Application.

## Table of Contents
[General Info](#general-info)
[Technologies](#technologies)
[Setup](#setup)
## General Info

A proxy server was needed to bypass the CORS error when accessing the IGN api through the website. There are a few aspects that weren't as refined due to final exams such as the unappealing mobile view and view on 4k+ sized monitors. Didn't know the Font family in the image so I used Roboto.

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
To run this project Node.js is require. 
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


