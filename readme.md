# Elasticsearch example ![Build status](https://circleci.com/gh/montoyadamien/NestJS_Elasticsearch_example.svg?style=shield)

This repository aims to show how to easily use the database and search engine tool Elasticsearch.
ElasticHQ, a management and monitoring graphical interface for Elasticsearch is also set up. Get to [http://localhost:5000/](http://localhost:5000/) to use it. 

The project example works with NestJS.  

Pushing on the repository will also trigger the CircleCI builds defined [here](./.circleci/config.yml).

## Test if elastic containers are up

To test if the containers are running in a healthy way you can make a GET request on `http://localhost:9200`.   
To check the cluster you can also make a GET request on `http://localhost:9200/_cluster/health`

## Issues

If you get the issue `vm.max_map_count [65530] is too low, increase to at least [262144]` when running elasticsearch using docker on Windows with WSL do the following steps :  
- Open a windows cmd with admin rights
- run `wsl -d docker-desktop`
- run `sysctl -w vm.max_map_count=262144`

## Technologies

- [Elasticsearch](https://www.elastic.co/)
- [ElasticHQ](https://www.elastichq.org/)
- [NestJS](https://nestjs.com/)
- [CircleCI](https://circleci.com/)
