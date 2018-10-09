// CSCI 5828: Spring 2018, HW 3
// Tanya Schulz
// October 9, 2018

//Still doesn't function properly but works for empty directories now...

var fs = require('fs'); //file system module 
var args = process.argv; //command line arguments
var recursive = require("recursive-readdir");

process.chdir(args[2]);
console.log(`Directory: ${process.cwd()}`);

var all_done = function(size) { //executes first
	console.log("Total size:", size);
}

recursive(process.cwd(), function (err, files) { //array of all file paths
  if (files.length == 0) { 
	console.log("Total size: 0")
	//end if directory and/or subdirectories are all empty
  }	else {
	  console.log("All files: ");
	  console.log(files);

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
		
		fs.readdir('.', function(err, filenames) {
			if (err) throw err;
			processFile(0, filenames, 0);
		});
	  }
});



//Must work on directories that:
// 1. contains files but does not have sub-directories
// 2. do not contain files but has multiple sub-directories (which also does not contain files)
// 3. contains multiple files and one or more sub-directories (which, in turn, have files and zero or more sub-directories)



// References:
// 1. https://www.npmjs.com/package/prompt-async
// 2. https://nodejs.org/api/process.html
// 3. https://www.npmjs.com/package/recursive-readdir


