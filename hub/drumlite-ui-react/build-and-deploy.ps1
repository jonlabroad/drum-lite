npm run build
aws s3 sync ./build s3://drumlite-ui --acl public-read
aws s3 sync ./build s3://site-drumlite-ui --acl public-read