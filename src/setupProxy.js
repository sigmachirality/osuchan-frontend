const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy(["/osuauth", "/api"], {
        target: "http://127.0.0.1:8000"
    }));
}