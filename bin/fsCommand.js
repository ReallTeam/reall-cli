/**
 * Created by cecheveria on 12/08/2015.
 */

var fs = require("fs"),
    path = require('path'),
    reall = require('reall'),
    pretty = require('pretty-message');
var slotJson,
    slotJsonFile;

function validateTargetAndDestiny(options, command, callback) {
    if (options.target && options.target.toString().trim() != 'true' && options.target.toString().trim() != '') {
        if (options.destiny && options.destiny.toString().trim() != 'true' && options.destiny.toString().trim() != ''){
            callback();
        }
        else {
            pretty.inform("Please enter a valid destiny", "reall fs -h")
        }
    }
    else {
        pretty.inform("Please enter a valid target", "reall fs -h")
    }
}

function fsCommand(options) {
    if(options.put) {
        validateTargetAndDestiny(options, 'put', function() {
            /**
             * reall fs -p -t ~/ReallHdop/job1/input/purchases_300.txt -d reallJobs/job1/input/purchases_300.txt
             * path.join('reallJobs', destiny)
             */
            reall.hadoop.put("Running put", options.target, options.destiny, false, function (error, stdout, stderr, data) {
                pretty.inform();
                // pretty.inform(data.out);
                pretty.inform('Elapsed time: %s seconds, from (%s) to (%s)', Math.round((data.end.getTime() - data.init.getTime())/1000), data.init.toLocaleString(), data.end.toLocaleString());
            });
        })
    }
    else if(options.get) {
        validateTargetAndDestiny(options, 'get', function() {
            /**
             * reall fs -g -t reallJobs/job1/input/purchases_300.txt -d ~/ReallHdop/job1/output/purchases_300.txt
             */
            reall.hadoop.get("Running get", options.target, options.destiny, false, function (error, stdout, stderr, data) {
                pretty.inform();
                // pretty.inform(data.out);
                pretty.inform('Elapsed time: %s seconds, from (%s) to (%s)', Math.round((data.end.getTime() - data.init.getTime())/1000), data.init.toLocaleString(), data.end.toLocaleString());
            });
        })
    }
}

module.exports = fsCommand;
