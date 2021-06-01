# brewery_reviews

### Running and viewing webpage locally:

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
