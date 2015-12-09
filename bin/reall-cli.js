#!/usr/bin/env node

/**
 * Reall Project Coommand Line Interface
 *
 * @type {exports}
 */
var reall = require('reall'),
    program = require('commander'),
    hadoopCommand = require('./hadoopCommand'),
    pretty = require('pretty-message'),
    path = require("path"),
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
 * Hadoop command
 */
program.command('hd')
    .description('Run basic Hadoop commands')
    .option("-j, --job [job]", "The job name identifier you want to run")
    .option("-m, --mapper [mapper]", "The mapper script to be used on hadoop job")
    .option("-r, --reducer [reducer]", "The reducer script to be used on hadoop job")
    .option("-c, --combiner [combiner]", "The combiner script to be used on hadoop job")
    .option("-i, --input [input]", "The input directory for the hadoop job")
    .option("-o, --output [output]", "The output directory for the hadoop job")
    .option("-t, --transporter [transporter]", "The transporter script to be used after hadoop job completes successfully")
    .action(function (options) {

        hadoopCommand(options);
    }
);

/**
 * Hadoop command
 */
program.command('add')
    .description('Add new objects to the Reall instance')
    .option("-j, --job [job]", "The Job Name identifier")
    .option("-m, --mapper [mapper]", "The mapper script to be used on hadoop job")
    .option("-r, --reducer [reducer]", "The reducer script to be used on hadoop job")
    .option("-c, --combiner [combiner]", "The combiner script to be used on hadoop job")
    .option("-i, --input [input]", "The input directory for the hadoop job")
    .option("-o, --output [output]", "The output directory for the hadoop job")
    .option("-t, --transporter [transporter]", "The transporter script to be used after hadoop job completes successfully")
    .action(function (options) {

        pretty.alert('');
        pretty.alert('This command is under construction');
        pretty.alert('');
    }
);

// Invoke the command execution
program.parse(process.argv);
