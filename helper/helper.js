var _ = require('lodash');

module.exports = {
    findKeyValue: function(data, key){
        //console.log(data);
        return _.result(data,key);
    },
    getFileDetails: function (filePath) {
        let fs = require("fs");
        let contents = fs.readFileSync(filePath);
        let jsonContent = JSON.parse(contents);
        return jsonContent;
    },
    getDates: function (data) {
        let list = data.list;
        var output = [];
        _.forEach(list, function (l) {
            output.push({ temp: l.main.temp, datetime: l.dt_txt });
        });
        return output;
    }
}

