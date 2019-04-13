#!/bin/bash

# print outputs and exit on first failure
set -xe

# setup ssh agent, git config and remote
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/travis_rsa
ssh travis@157.230.182.92 "cd /var/www/CatholicGatorsAdminApp \
    && export NODE_ENV=production \
    && git pull \
    && docker-compose up -d --build --force-recreate"
