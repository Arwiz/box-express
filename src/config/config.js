const config = {
    port: process.env.PORT || 8080,
    mode: process.env.NODE_ENV || 'development',
    dbConnection: process.env.DB_CONNECTION_STRING || 'mongodb+srv://arwiz:Wizni@123@cluster0-lvv9l.mongodb.net/boxeyedb?retryWrites=true&w=majority',
    secretHashKey: 'iloveindia'
};

export default config ;