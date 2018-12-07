
module.exports = {
    //It is not safe to keep a production db url in a file, so need to set the env variable up via commandline
    db: process.env.MONGO_DB_URL
}