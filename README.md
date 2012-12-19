# grunt-mustache

A grunt plugin to concatinate mustache template files

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-mustache`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-mustache');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
19/12/2012: Edited script for newer grunt-version (didn't get it to work quite right, replaced helper with callback + minor stuff)
Note: this generates a "custom" template-format in with the resulting JS has a Object: SB.TMPL{'templatename': 'template-data' [...], 'done': true}
(this makes it easy to load our templates with JS).

## License
Copyright (c) 2012 Alexander Vassbotn Røyne-Helgesen  
Licensed under the GPL license.
