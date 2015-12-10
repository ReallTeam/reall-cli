/**
 * Created by cecheveria on 12/08/2015.
 */

var fs = require("fs"),
    path = require("path"),
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
                        reall.hadoop.mapReduce("Running MapReduce", options.mapper, options.reducer, options.combiner, options.transporter, options.input, options.output, false, function (error, stdout, stderr, outputPath) {

                        	pretty.alert();

                        	if (error) {
                        	    pretty.failed("Fail runnig mapReduce");
                        	    pretty.inform("%s", error);
                        	    data = "Fail running mapReduce: " + error;
                        	}
                        	else {
                                pretty.done("MapReduce wass susessfully executed");
                        	    pretty.inform("Please see output on Hadoop file system: %s", outputPath /*"out/mapperByWeekday"*/);

                                /**
                                 * TODO:
                                 *  1. Add code to call the Transporter
                                 */
                        	}
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
