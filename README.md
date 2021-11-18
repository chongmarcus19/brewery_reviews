# Brewery Reviews

## Description
A brewery review web app utilizing the Open BreweryDB API. 
Incorporates front-end features such as 
- Write reviews for real breweries
- Read existing reviews of real breweries
- Search and filter reviews by city or name

Incorporates a back-end database for brewery reviews

Built with HTML, CSS, Javascript, PostgreSQL, EJS, and JQuery. Hosted using Docker
 
## Running and viewing webpage locally:

Download and Install Docker for your machine (https://docs.docker.com/get-docker/)

Start the Docker application

Download the git repository

$ git clone https://github.com/CSCI-3308-CU-Boulder/3308SP21_section014_2.git
To start application from CLI

$ cd brewery_reviews
$ docker-compose up
To view application in browser, navigate to

http://localhost:3000
To stop the application from the CLI

$ docker-compose down
If encountering issues with database initialization, remove conflicting volumes tied to the docker container

##Snaps
