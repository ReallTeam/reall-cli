/**
 * Created by cecheveria on 12/08/2015.
 */

var fs = require("fs"),
    path = require('path'),
    reall = require('reall'),
    pretty = require('pretty-message');
var slotJson,
    slotJsonFile;

function hadoopCommand(options) {
        if (options.mapper) {
            if (options.reducer) {
                if (options.input) {
                    if (options.output) {
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
                        pretty.inform("Please enter a valid output", "reall hd -h")
                    }
                }
                else {
                    pretty.inform("Please enter a valid input", "reall hd -h")
                }
            }
            else {
                pretty.inform("Please enter a valid reducer", "reall hd -h")
            }
        }
        else {
            pretty.inform("Please enter a valid mapper", "reall hd -h")
        }
}

module.exports = hadoopCommand;
