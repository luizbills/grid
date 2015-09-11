# debug version
./node_modules/.bin/preprocess ./src/grid.js . -DEBUG=true > ./build/grid.js

# productuion version
./node_modules/.bin/preprocess ./src/grid.js . -DEBUG=false > ./build/grid.min.js
./node_modules/.bin/uglifyjs ./build/grid.min.js -m -c -o ./build/grid.min.js
