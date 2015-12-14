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

            //reall fs -p -t ~/ReallHdop/job1/input/purchases_300.txt -d job1/input/purchases_300.txt

            reall.hadoop.put("Running put", options.target, options.destiny, false, function (error, stdout, stderr, data) {
                pretty.inform();
                // pretty.inform(data.out);
                pretty.inform('Elapsed time: %s seconds, from (%s) to (%s)', Math.round((data.end.getTime() - data.init.getTime())/1000), data.init.toLocaleString(), data.end.toLocaleString());
            });
            // pretty.done("Put have been completed")
        })
    }
    else if(options.get) {
        validateTargetAndDestiny(options, 'get', function() {
            pretty.done("Get have been completed")
        })
    }
}

function fsCommandX(options) {
    if(options.put) {
        if (options.target) {
            if (options.destiny) {
                // reall.hadoop.mapReduce("Running the MapReduce",
                //                        "/home/mapr/trainning/code/mapperByWeekday.py",
                //                        "/home/mapr/trainning/code/reducerByWeekday.py",
            	// 		                  "input/mapperByWeekday/purchases_100.txt",
                //                        "out/mapperByWeekday", false, function (error, stdout, stderr) {
                reall.hadoop.mapReduce("Running MapReduce", options.mapper, options.reducer, options.combiner, options.transporter, options.input, options.output, false, function (error, stdout, stderr, data) {
                    pretty.inform();
                    // pretty.inform(data.out);
                    pretty.inform('Elapsed time: %s seconds, from (%s) to (%s)', Math.round((data.end.getTime() - data.init.getTime())/1000), data.init.toLocaleString(), data.end.toLocaleString());
                });
            }
            else {
                pretty.inform("Please enter a valid destiny", "reall fs -h")
            }
        }
        else {
            pretty.inform("Please enter a valid target", "reall fs -h")
        }
    }
    else if(options.get) {
    }
}

module.exports = fsCommand;
