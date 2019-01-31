#!/bin/bash

# print outputs and exit on first failure
set -xe

# setup ssh agent, git config and remote
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/travis_rsa
ssh root@157.230.182.92 "\
    sudo su travis && \
    cd /var/www/CatholicGatorsAdminApp && \
    git pull && docker-compose -f docker-compose-production.yml up --build"
