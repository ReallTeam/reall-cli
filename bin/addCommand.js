/**
 * Created by cecheveria on 12/10/2015.
 */

var fs = require("fs"),
    path = require("path"),
    reall = require('reall'),
    pretty = require('pretty-message');
var slotJson,
    slotJsonFile;

function addCommand(options) {
    if (options.job) {
            if (options.mapper) {
                if (options.reducer) {
                    if (options.input) {
                        // reall.hadoop.mapReduce("Running the MapReduce",
                        //                        "/home/mapr/trainning/code/mapperByWeekday.py",
                        //                        "/home/mapr/trainning/code/reducerByWeekday.py",
                    	// 		                  "input/mapperByWeekday/purchases_100.txt",
                        //                        "out/mapperByWeekday", false, function (error, stdout, stderr)

                        // reall.hadoop.mapReduce("Running MapReduce", options.mapper, options.reducer, options.combiner, options.transporter, options.input, options.output, false, function (error, stdout, stderr) {
                        //
                        // 	pretty.alert();
                        //
                        // 	if (error) {
                        // 	    pretty.failed("Fail runnig mapReduce");
                        // 	    pretty.inform("%s", error);
                        // 	    data = "Fail running mapReduce: " + error;
                        // 	}
                        // 	else {
                        //         pretty.done("MapReduce wass susessfully executed");
                        // 	    pretty.inform("Please see output on Hadoop file system: %s", "out/mapperByWeekday");
                        //
                        //         /**
                        //          * TODO:
                        //          *  1. Add code to call the Transporter
                        //          */
                        // 	}
                        // });

                        var jsonJob = {
                            job: options.job,
                            mapper: options.mapper,
                            reducer: options.reducer,
                            combiner: options.combiner,
                            transporter: options.transporter,
                            input: [options.job, 'input'/*, options.input*/].join('/'),
                            output: [options.job, 'output'/*, options.output*/].join('/'),
                            done: [options.job, 'done'].join('/'),
                            fail: [options.job, 'fail'].join('/')
                        }

                        console.log(JSON.stringify(jsonJob, null, 4));
                    }
                    else {
                        pretty.inform("Please enter a valid input folder", "reall add -h")
                    }
                }
                else {
                    pretty.inform("Please enter a valid reducer", "reall add -h")
                }
            }
            else {
                pretty.inform("Please enter a valid mapper", "reall add -h")
            }
    }
    else {
        pretty.inform("Please enter a valid command", "reall add -h")
    }
}

module.exports = addCommand;
