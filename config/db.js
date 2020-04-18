const mongoose = require('mongoose');

let connectionDB = mongoose.connect(process.env.DB,
    {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("DB ON!"),
    (err) => console.log(err) 
);

module.exports = connectionDB;