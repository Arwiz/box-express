import app from "./app";
import config from "./config/config"
import createDBConnection from "./config/db";

// Connection To Database
const dbConnectionStart = createDBConnection();

//Listen Server
const server =  app.listen(config.port, (data) => {
    console.log(config.port, `server listening in ${config.mode} mode at port ${config.port}`);
});

// Handle unhandled Promise rejection
process.on('unhandledRejection', (err, promise)=>{
console.log(`Error ${err.message}`);
// server.close(()=>process.exit(1));
});

export default app;

