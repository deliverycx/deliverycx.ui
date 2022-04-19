CONTAINER?=$(shell basename $(CURDIR))_php_1
BUILDCHAIN?=$(shell basename $(CURDIR))_webpack_1

.PHONY: build clean composer dev npm pulldb restoredb up

build:
        docker-compose -f docker-compose.dev.yml up -d --build 
deck:
       	docker-compose -f docker-compose.dev.yml up -d --build deliverycx_client_desktop			