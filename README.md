# IGN Code Foo 10 - Front-end project application

### A simple react website with video player and api for IGN CodeFoo10 engineering  intern Application.
* [Codefoo Introduction](https://github.com/JeffreyChan1303/codefoo10/tree/master/CodeFooQuestions/Introduction.pdf)
* [Codefoo Hisui's Power Plant](https://github.com/JeffreyChan1303/codefoo10/tree/master/CodeFooQuestions/HisuisPowerPlant.pdf)
* [Deployed Website link](https://jeffreychancodefoo2022.netlify.app/)

## Table of Contents
* [Notes](#Notes)
* [Technologies](#technologies)
* [Setup](#setup)
## Notes

A proxy server is needed to bypass the CORS error when accessing the IGN api through the website. There are a few aspects that weren't as refined due to final exams such as the unappealing mobile view and view on 4k+ sized monitors. I also didn't know the Font family in the image so I used Roboto.

## Technologies
Created with: 
* create-react-app
* React version: 18.0.0
* React Player version: 2.10.0
* Material UI version: 4.12.4
* Screenfull version: 6.0.1
* Axios version: 0.26.1

## Setup

### 1. Check if you have npm, and git installed.
This can be done by using 'npm -v', and 'git --version' in the terminal.
##### you can install node [here](https://nodejs.org). This installs both nodejs and npm.
##### you can learn more about installing git [here](https://git-scm.com)

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
### 4. run the webpage
start the website using npm start in codefoo10 directory
```
npm start
```

