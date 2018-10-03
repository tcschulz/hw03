// CSCI 5828: Spring 2018
// Homework 3
// Tanya Schulz
// September 30, 2018

//Doesn't function properly yet... 



var fs = require('fs'); //file system module 
var args = process.argv; //command line arguments

console.log(`Starting directory: ${process.cwd()}`);

process.chdir(args[2]);
console.log(`New directory: ${process.cwd()}`);

var all_done = function(size) {
	console.log("Total size:", size);
}

var handleFile = function(stats, i, filenames, total) {
	if (i === filenames.length - 1) {
		all_done(total + stats.size);
	} 	else {
		processFile(i+1, filenames, total+stats.size);
	}
}

var handleDir = function(i, filenames, total) {
	if (i=== filenames.length - 1) {
		all_done(total);
	}	else {
	processFile(i+1, filenames, total);
	}
}

var processFile = function(i, filenames, total) {
	var name = filenames[i];
	fs.stat(name, function(err, stats) {
		if (err) throw err;
		if (stats.isFile()) {
			handleFile(stats, i, filenames, total);
		} else {
		  handleDir(i, filenames, total);
	  }
  });
}





//Must work on directories that:
// 1. contains files but does not have sub-directories
// 2. do not contain files but has multiple sub-directories (which also does not contain files)
// 3. contains multiple files and one or more sub-directories (which, in turn, have files and zero or more sub-directories)



// References:
// 1. https://www.npmjs.com/package/prompt-async
// 2. https://nodejs.org/api/process.html


