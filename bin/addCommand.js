/**
 * Created by cecheveria on 12/10/2015.
 */

var fs = require("fs"),
    path = require('path'),
    mkdirp = require('mkdirp'),
    reall = require('reall'),
    pretty = require('pretty-message');
var slotJson,
    slotJsonFile;

function isValidParameter(parameter) {
    return (parameter && parameter.toString().trim() == 'true') || !parameter ? undefined : parameter.toString().trim() ;
}

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
                        var jobNameId = options.job.replace(/\b./g, function(m){ return m.toUpperCase(); }).replace(/\s/g, '');
                        var jsonJob = {
                            job: jobNameId,
                            name: options.job,
                            mapper: options.mapper,
                            reducer: options.reducer,
                            combiner: isValidParameter(options.combiner),
                            transporter: isValidParameter(options.transporter),
                            input: [jobNameId, 'input'].join('/'),
                            output: [jobNameId, 'output'].join('/'),
                            done: [jobNameId, 'done'].join('/'),
                            fail: [jobNameId, 'fail'].join('/')
                        }
                        // str.replace(/\b./g, function(m){ return m.toUpperCase(); })
                        // console.log(JSON.stringify(jsonJob, null, 4));

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

                                                        // Add code to set the job details on $HOME/ReallHdop/.reall.json file
                                                        pretty.doing("Adding job config");

                                                        var reallJsonFile = path.join(home, '.reall.json');

                                                        fs.exists(reallJsonFile, function (exists) {

                                                            // Instance json object or require it
                                                            var reallJson = exists ? require(reallJsonFile) : {};

                                                            // Instance jobs attribute or instance a new one
                                                            !reallJson.jobs && (reallJson['jobs'] = {});
                                                            reallJson.jobs[jsonJob.job] = jsonJob;

                                                            // Job name identifier is not necessary on Json object
                                                            delete jsonJob.job;

                                                            // Update document on file system '$HOME/ReallHdop/.reall.json'
                                                            fs.writeFile(reallJsonFile, JSON.stringify(reallJson, null, 4), function (err) {
                                                                if (err) {
                                                                    pretty.failed("Fail adding job '%s' to config file", options.job);
                                                                    throw err;
                                                                } else {
                                                                    pretty.done("Job '%s' successfully added to config file", options.job);
                                                                }
                                                            });
                                                        });

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
