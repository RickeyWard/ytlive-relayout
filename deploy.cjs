var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config = {
    user: "githubdeploy",
    host: "www.diamonddrake.com",
    port: 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/httpdocs/ytlive",
    include: ["*", "**/*"],      // this would upload everything except dot files
    //include: ["*.php", "dist/*", ".*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    //exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: false,
    password: process.env.FTPPASSWORD
};
 
// use with promises
ftpDeploy
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));
