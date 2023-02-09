require('dotenv').config();


let todaysDate = new Date();
let _YEAR = todaysDate.getFullYear();

//get this one working  
//FACTORYCONTRACTABI:process.env.FACTORYCONTRACTABI,

module.exports = {
    YEAR: _YEAR,
    TITLE: "YACE V2",
    APIURL: process.env.APIURL,
    ADMINURL: process.env.ADMINURL,
    COPYRIGHT: "CRYPTOSKILLZ " + _YEAR,
    ENVIRONMENT: process.env.ELEVENTY_ENV,
    SECRET: process.env.SECRET,
    LEVEL1NAME: "sites",
    LEVEL2NAME: "pages",
    ITEMSDATAMAIN: "items",
    DASHBOARDSTRAP: "Welcome to the content editor.",
    CANCREATEACCOUNT: process.env.CANCREATEACCOUNT,
    COMPLEXPASSWORD: process.env.COMPLEXPASSWORD,
    BLOCKEXPLORER: process.env.BLOCKEXPLORER,
    PAYMEURL: process.env.PAYMEURL,
    PAYMEUSERID: process.env.PAYMEUSERID

}