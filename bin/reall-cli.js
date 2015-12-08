#!/usr/bin/env node

/**
 *
 */
var reall = require('reall'),
    program = require('commander'),
    pretty = require('pretty-message'),
    path = require("path"),
    pkg = require('../package.json')
    ;

//console.log("Hi, this is the Reall command line in action");
//console.log("current dir ", process.cwd());



// Get version number from package.json file
program.version(pkg.version);

/**
 * TODO:
 *  1.  Add code to control 'no parameters send by user'
 */

program.command('*')
    .action(function (env) {
	pretty.alert();
	pretty.alert("Enter a Valid command");
	pretty.alert("   To see help use: reall -h");
    });

/**
 * Restart command
 */
program.command('hd')
    .description('Hadoop tools for real time data display')
    .option("-r, --reduce", "Runs the standar command for Hadoop MapReduce")
    .action(function (options) {
	pepe();
    }
);


function pepe() {
    var reallPath = '/usr/lib/node_modules/reall';
    
    reall.hadoop.mapReduce("Running the Reall haddop tool", "/home/mapr/trainning/code/mapperByWeekday.py", "/home/mapr/trainning/code/reducerByWeekday.py", 
			   "input/mapperByWeekday/purchases_100.txt", "out/mapperByWeekday", false, function (error, stdout, stderr) {

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
	    
	//callback(data /*<<== "data buffer to be saved on session"*/);
    });
}

// Invoke the command execution
program.parse(process.argv);

