/**
 * Created by cecheveria on 12/10/2015.
 */

var fs = require("fs"),
    path = require("path"),
    mkdirp = require('mkdirp'),
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

                        var home = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], 'ReallHdop');

                        pretty.doing("Creating '%s' local file system", jsonJob.job);
                        pretty.inform("home:\t\t", home);
                        pretty.inform("--");
                        pretty.inform("input:\t", jsonJob.input);
                        pretty.inform("output:\t", jsonJob.output);
                        pretty.inform("done:\t\t", jsonJob.done);
                        pretty.inform("fail:\t\t", jsonJob.fail);

                        mkdirp(path.join(home, jsonJob.input), function (err) {
                            if (err) {
                                pretty.failed("Fail creating input folder on '%s'", jsonJob.input);
                                throw err;
                            }
                            else {
                                pretty.doing("Creating output folder");

                                mkdirp(path.join(home, jsonJob.output), function (err) {
                                    if (err) {
                                        pretty.failed("Fail creating output folder on '%s'", jsonJob.output);
                                        throw err;
                                    }
                                    else {
                                        pretty.doing("Creating done folder");

                                        mkdirp(path.join(home, jsonJob.done), function (err) {
                                            if (err) {
                                                pretty.failed("Fail creating done folder on '%s'", jsonJob.done);
                                                throw err;
                                            }
                                            else {
                                                pretty.doing("Creating fail folder");

                                                mkdirp(path.join(home, jsonJob.fail), function (err) {
                                                    if (err) {
                                                        pretty.failed("Fail creating fail folder on '%s'", jsonJob.fail);
                                                        throw err;
                                                    }
                                                    else {
                                                        pretty.done("Local file system was correctly created");
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
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
