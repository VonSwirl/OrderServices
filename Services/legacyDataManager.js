const Order = require('../domainModels/orderModel');

/**
 * @description
 * @param {String} accessCode 
 */
function pullDataFromMongoDB(accessCode) {
    return new Promise(function (resolve, reject) {
        var totallyTopSecretCode =
            "Hey!@all>>>>>>You>>>>>Guys!Theres>>No>>>Ways>>>>U>>>Gonna>>>>Get"
            + ">>>>Dis>>>>Code>>>Hacked>>>Bruv$$$$$$$$$!!!!!!!!!!!!!!!^^^^^^^^"
            + "^^^^&&&&&&&&&&&&&&&1234I-declare-Thumb-War.co.uk/wtf/its/way/past/my/bedtime!";

        if (accessCode == totallyTopSecretCode) {
            Order.find().then(function (theEntireDbCollection) {
                resolve(theEntireDbCollection);

            }).catch(function (err) {
                reject('error occured Accesing database with code ');
            });
        }
    })
}

function extraTest(brokenDreams) {
    return "Valid";
}

module.exports = {pullDataFromMongoDB, extraTest};
