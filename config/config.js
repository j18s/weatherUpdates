var helper = require('../helper/helper.js');
module.exports = {
    getConfig: function () {
        let environment = process.env.NODE_ENV || 'development';
        let path = './json/' + environment.toLowerCase() + '.json';
        console.log('./json/' + environment.toLowerCase() + '.json');
        let output = helper.getFileDetails(path);
        return output;
    }
};