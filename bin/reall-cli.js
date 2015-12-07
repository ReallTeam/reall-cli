#!/usr/bin/env node

/**
 *
 */

var reall = require('reall'),
    path = require("path")
    ;
console.log("Hi, this is the Reall command line in action");
console.log("current dir ", process.cwd());

var reallPath = '/usr/lib/node_modules/reall';

//cliHelper.runCmd((os.platform() == 'win32' ? '' : 'sudo ') + 'npm install -g grunt-cli', "Installing grunt:", false, function (error, stdout, stderr) {
//runCmd("ls -ltr", "", false, function (error, stdout, stderr) {
//reall.runCmd("", "hs /home/mapr/trainning/code/mapperByWeekday.py /home/mapr/trainning/code/reducerByWeekday.py input/purcha*txt out/mapperByWeekday/00007", false, function (error, stdout, stderr) {
//reall.runCmd("./bin/stream", "/home/mapr/trainning/code/mapperByWeekday.py /home/mapr/trainning/code/reducerByWeekday.py input/purcha*txt out/mapperByWeekday/00007", false, function (error, stdout, stderr) {
//reall.runCmd(path.join(reallPath, "bin/stream.sh"), "/home/mapr/trainning/code/mapperByWeekday.py /home/mapr/trainning/code/reducerByWeekday.py input/purcha*txt out/mapperByWeekday/00007", false, function (error, stdout, stderr) {

reall.hadoop.mapReduce("/home/mapr/trainning/code/mapperByWeekday.py", "/home/mapr/trainning/code/reducerByWeekday.py", "input/mapperByWeekday/purchases_100.txt", "out/mapperByWeekday", true, function (error, stdout, stderr) {
    if (error) {
	console.log("Fail runnig mapReduce");
	console.log("%s", error);
	data = "Fail running mapReduce: " + error;
    }
    else {
	data = "Ok process: " + stdout;
	console.log("%s", data);
    }
	
    //callback(data /*<<== "data buffer to be saved on session"*/);
});
