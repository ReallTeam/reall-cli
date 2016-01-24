/**
 * Created by cecheveria on 12/08/2015.
 */

var fs = require("fs"),
    path = require('path'),
    reall = require('reall'),
    pretty = require('pretty-message');
var slotJson,
    slotJsonFile;

function hadoopMapReduce(options) {
    if (options.mapper) {
        if (options.reducer) {
            if (options.input) {
                if (options.output) {

                    reall.hadoop.mapReduce("Running MapReduce", options.mapper, options.reducer, options.combiner, options.transporter, options.input, options.output, options.verbose, function (error, stdout, stderr, data) {
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

function runReallJob(options) {

    var home = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], 'ReallHdop'),
        reallJsonFile = path.join(home, '.reall.json');

    fs.exists(reallJsonFile, function (exists) {

        if (exists) {
            // Get $HOME/ReallHdop/.reall.json from file system.
            var reallJson = require(reallJsonFile),
                reallJob = reallJson.jobs && reallJson.jobs[options.job.toString().trim()];

            if (reallJob) {
                // Build parameters
                options.mapper = path.join(home, options.job, reallJob.mapper);
                options.reducer = path.join(home, options.job, reallJob.reducer);
                options.combiner = reallJob.combiner;
                // options.transporter = reallJob.transporter;
                options.transporter = reallJob.transporter ? path.join(home, options.job, reallJob.transporter) : reallJob.transporter;
                //
                options.input = path.join('ReallHdop', /*home,*/ options.job, reallJob.input);
                options.output = path.join('ReallHdop', /*home,*/ options.job, reallJob.output);
                options.done = reallJob.done;
                options.fail = reallJob.fail;

                // Call put files to HDFS input folder
                // reall.hadoop.put("Running put", options.target, options.destiny, false, function (error, stdout, stderr, data) {
                reall.hadoop.put("Running put", path.join(home, options.job, reallJob.input), path.join('ReallHdop', options.job, reallJob.input), options.verbose, function (error, stdout, stderr, data) {
                    // pretty.inform();
                    // // pretty.inform(data.out);
                    // pretty.inform('Elapsed time: %s seconds, from (%s) to (%s)', Math.round((data.end.getTime() - data.init.getTime())/1000), data.init.toLocaleString(), data.end.toLocaleString());

                    pretty.inform('')

                    // Call MapReduce
                    hadoopMapReduce(options);
                });
            } else {
                pretty.inform("Please enter a valid job name identifier, '%s' does not exists", options.job)
            }
        } else {
            pretty.inform("It looks like you don't have the $HOME/ReallHdop/.reall.json file on place")
        }
    });
}

function hadoopCommand(options) {
    // Use or not verbose mode
    options.verbose = options.verbose || false;

    if (options.job) {
        //
        // reall hd -j job1
        //
        if (options.job.toString().trim() != 'true' && options.job.toString().trim() != '') {
            runReallJob(options);
        }
        else {
            pretty.inform("Please enter a valid job name identifier", "reall hd -h")
        }
    }
    else {
        // reall hd -m /home/mapr/trainning/code/mapperByWeekday.py
        //             -r /home/mapr/trainning/code/reducerByWeekday.py
        //             -i input/mapperByWeekday/purchases_10.txt
        //             -o out/mapperByWeekday
        //             -c /home/mapr/trainning/code/reducerByWeekday.py
        //             -t /home/mapr/trainning/code/reducerByWeekday.py
        hadoopMapReduce(options);
    }
}

module.exports = hadoopCommand;
