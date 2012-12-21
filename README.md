# grunt-mustache

A grunt plugin to concatinate mustache template files

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: 

`npm install grunt-mustache`

Then add this line to your project's `Gruntfile.js`:

`grunt.loadNpmTasks('grunt-mustache');`

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
Add something like this in yer gruntfile:

	mustache: {
	  files : {
	    src: 'src/main/webapp/js/mustache/',
	    dest: 'src/main/webapp/js/src/templates.js',
	    options: {
	      postfix: 'my.templates = {',
	      prefix: 	'};'
	    }
	  }
	}


Note: If postfix/preficx options are set or not, you can either create a JS object, or just a pure JSON string:

	my.templates = {'templatename': 'template-data' [...], 'done': true};

(this makes it easy to load our templates with JS).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
21/12/2012: Upgraded task to fit grunt v 0.4*, renamed old gruntfile and added postfix/prefix support for template generation. removed old config.varname functionality
19/12/2012: Edited script for newer grunt-version (didn't get it to work quite right, replaced helper with callback, added some options for variable name + minor stuff)


## License
Copyright (c) 2012 Alexander Vassbotn Røyne-Helgesen  
Licensed under the GPL license.
