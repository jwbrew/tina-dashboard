webpack --progress -p --config webpack.config.prod.js
aws s3 cp ./latest.js s3://dashboard.asktina.io/$(date +%s).js --profile asktina
aws s3 cp ./latest.js s3://dashboard.asktina.io/latest.js --profile asktina
aws s3 cp ./index.html s3://dashboard.asktina.io/index.html --profile asktina
