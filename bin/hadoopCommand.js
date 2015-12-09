/**
 * Created by cecheveria on 10/10/2015.
 */

var fs = require("fs"),
    path = require("path"),
    reall = require('reall'),
    pretty = require('pretty-message');
var slotJson,
    slotJsonFile;

function hadoopCommand(options) {
    if (options.job) {
        pretty.alert('');
        pretty.alert('This command is under construction');
        pretty.alert('');
    }
    else {
        if (options.mapper) {
            if (options.reducer) {
                if (options.input) {
                    if (options.output) {
                        // reall.hadoop.mapReduce("Running the Reall haddop tool",
                        //                        "/home/mapr/trainning/code/mapperByWeekday.py",
                        //                        "/home/mapr/trainning/code/reducerByWeekday.py",
                    	// 		               "input/mapperByWeekday/purchases_100.txt",
                        //                        "out/mapperByWeekday", false, function (error, stdout, stderr) {
                        reall.hadoop.mapReduce("Running the Reall haddop tool", options.mapper, options.reducer, options.combiner, options.transporter, options.input, options.output, false, function (error, stdout, stderr) {

                        	pretty.alert();

                        	if (error) {
                        	    pretty.failed("Fail runnig mapReduce");
                        	    pretty.inform("%s", error);
                        	    data = "Fail running mapReduce: " + error;
                        	}
                        	else {
                        	    //data = "Ok process: " + stdout;
                        	    pretty.done("MapReduce wass susessfully executed");
                        	    pretty.inform("Please see output on Hadoop file system: %s", "out/mapperByWeekday");
                        	}
                        });
                    }
                    else {
                        pretty.inform("Please enter a valid output", "slot config -h")
                    }
                }
                else {
                    pretty.inform("Please enter a valid input", "slot config -h")
                }
            }
            else {
                pretty.inform("Please enter a valid reducer", "slot config -h")
            }
        }
        else {
            pretty.inform("Please enter a valid mapper", "reall hd -h")
        }
    }
}

module.exports = hadoopCommand;
