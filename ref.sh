#!/bin/bash

echo "Starting Refusion.ai..."

cd /home/ubuntu/project/refusion
echo "/home/ubuntu/project/refusion"

#export NVM_DIR=$HOME/.nvm;
#source $NVM_DIR/nvm.sh;

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

node --version

/home/ubuntu/.nvm/nvm.sh use v20.8.1

node --version

/home/ubuntu/.nvm/versions/node/v20.8.1/bin/yarn start:default
echo "yarn start:default" 
