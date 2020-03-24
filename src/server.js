import app from "./app";
import config from "./config/config"

app.listen(config.port, (data) => {
    console.log(config.port, `server listening in ${config.mode} mode at port ${config.port}`);
});

// @desc Health Check API
app.get('/', function (req, res) {
    res.send('Health Check Fine')
});

export default app;

