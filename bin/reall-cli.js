#!/usr/bin/env node

/**
 * Reall Project Coommand Line Interface
 *
 * @type {exports}
 */
var reall = require('reall'),
    program = require('commander'),
    hadoopCommand = require('./hadoopCommand'),
    fsCommand = require('./fsCommand'),
    addCommand = require('./addCommand'),
    pretty = require('pretty-message'),
    path = require('path'),
    pkg = require('../package.json')
    ;

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
 * Hadoop command (hd)
 */
program.command('hd')
    .description('Run basic Hadoop commands')
    .option("-j, --job [job]", "The job name identifier you want to run")
    .option("-m, --mapper [mapper]", "The mapper script to be used on hadoop command")
    .option("-r, --reducer [reducer]", "The reducer script to be used on hadoop command")
    .option("-c, --combiner [combiner]", "The combiner script to be used on hadoop command")
    .option("-i, --input [input]", "The input directory for the hadoop command")
    .option("-o, --output [output]", "The output directory for the hadoop command")
    .option("-t, --transporter [transporter]", "The transporter script to be used after hadoop command completes successfully")
    .option("-v, --verbose [verbose]", "The output directory for the hadoop command")
    .action(function (options) {

        hadoopCommand(options);
    }
);

/**
 * File System command (fs)
 */
program.command('fs')
    .description('Runs basic HDFS commands')
    .option("-p, --put [put]", "Puts a file into hadoop file system")
    .option("-g, --get [get]", "Pulls a file from hadoop file system")
    .option("-t, --target [target]", "The targeted files to be trasfered")
    .option("-d, --destiny [destiny]", "The destiny folder where to locate trasfered files")
    .action(function (options) {

        fsCommand(options);
    }
);

/**
 * Add command (add)
 */
program.command('add')
    .description('Add new Job Definitions to the Reall instance')
    .option("-j, --job [job]", "The Job Name identifier")
    .option("-m, --mapper [mapper]", "The mapper script to be used on hadoop job")
    .option("-r, --reducer [reducer]", "The reducer script to be used on hadoop job")
    .option("-c, --combiner [combiner]", "The combiner script to be used on hadoop job")
    .option("-i, --input [input]", "The input directory for the hadoop job")
    .option("-o, --output [output]", "The output directory for the hadoop job")
    .option("-t, --transporter [transporter]", "The transporter script to be used after hadoop job completes successfully")
    .action(function (options) {

        addCommand(options);
    }
);


// Invoke the command execution
program.parse(process.argv);
