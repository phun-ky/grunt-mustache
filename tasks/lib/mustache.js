/* node: true */

'use strict';

var templateCount = 0;
var extension = 'mustache';

exports.init = function (grunt) {
    return {
        count: function () {
            return "" + templateCount;
        },

        compile: function (templateDirs, options) {

            options = options || {};
            extension = options.extension || extension;

            var prefix = options.prefix || '(',
                postfix = options.postfix || '',
                templates = '';

            if( prefix === '(') {
              postfix = ');' + postfix;
            }

            var isTemplate = function (abspath) {
                return abspath.split('.').pop() === extension;
            };

            var templateName = function (filename) {
                if (options.keepTemplateSuffix) {
                    return filename;
                }
                var file_extension = '.' + extension;
                return filename.split(file_extension)[0].replace(/-/g, "_");
            };

            var replace_single_quotes = function (content) {
                return content.replace(/'/g, "\\'");
            };

         function get_key_index (keyArray, key){
                this.keyArray = keyArray;
                this.keyIndex = -1;

                this.updateKeyArray= function() {
                    var found = false;

                    for (var i=0; i<keyArray.length; i++){
                        if (key == keyArray[i][0]){
                            keyArray[i][1] += 1;
                            this.keyIndex = this.keyArray[i][1];
                            found =true;
                            break;
                        };
                    }

                    if (!found){
                        var newKey = new Array(2);
                        newKey[0] = key;
                        newKey[1] = 0;
                        this.keyArray.push(newKey);
                    };
                };
            };

            var replace_template = function (contentArray,currentIndex,keyArray){
                var content=contentArray[currentIndex][1];
                var tokens = content.match(/{{#[a-zA-Z]*}}/g);
                if (tokens == null) return contentArray;
                for (var i=0; i<tokens.length;i++){
                    var startIndex = content.indexOf(tokens[i]);
                    if (startIndex >0){
                        var endToken =tokens[i].toString().replace("#","\/");
                        var endIndex = content.indexOf(endToken);
                        var tokenLength =tokens[i].toString().length;
                        var token=tokens[i].toString().replace("#","");
                        var key = token.replace("{{","").replace("}}","");
                        var keyString = content.substring(startIndex+tokenLength,endIndex);

                        var updateKey= new get_key_index(keyArray,key);
                        updateKey.updateKeyArray();
                        var keyIndex = updateKey.keyIndex;
                        var updateKeyArray = updateKey.keyArray;

                        var newKeyPair = new Array(2);


                        if (keyIndex >0 ){
                            key = key + keyIndex;
                            token = "{{" + key + "}}";
                        }
                        newKeyPair[0] = key;
                        newKeyPair[1]=keyString;

                        contentArray.push(newKeyPair);

                        content = content.substring(0,startIndex) + token + content.substring(endIndex+tokenLength, content.length);
                    };
                }
                contentArray[currentIndex][1]= content;
                for (var i=currentIndex+1; i<contentArray.length;i++){
                    contentArray = replace_template(contentArray,i,updateKeyArray);
                }
                return contentArray;
            };

            var translateContentArrayToJson = function(contentArray){
                 var contentJson = "{";
                    for (var i=0;i<contentArray.length;i++){
                        contentJson += "\"" + contentArray[i][0] + "\":'" + contentArray[i][1] + "',";
                    }
                    contentJson = contentJson.substring(0,contentJson.length-1) + "}";
                    return contentJson;
            };

            var templateHandler = function(abspath, rootdir, subdir, filename) {
                if(! isTemplate(abspath) ) {
                    return;
                }
                templateCount += 1;
                var file_content = grunt.file.read(abspath);
                file_content = replace_single_quotes(file_content);

                var start = file_content.match(/{{#[a-zA-Z]*}}/);

                if (start !=null){
                    var contentArray = new Array();
                    var basePair = new Array('base',file_content);
                    var array_of_keys = [];
                    contentArray.push(basePair);
                    contentArray=replace_template(contentArray,0, array_of_keys);
                    file_content = translateContentArrayToJson(contentArray);
                    templates += '"' + templateName(filename) + '"' + ' : ' + file_content + ','+"\n";
                } else {

                templates += '"' + templateName(filename) + '"' + ' : \'' + file_content + '\','+"\n";
                }
                if (options.verbose) {
                    grunt.log.writeln('Reading file: '.white + filename.yellow);
                };
            };

            templateCount = 0;
            templateDirs.forEach( function(file) {
                grunt.file.recurse(file, templateHandler);
            });

            templates = '{\n    ' + templates.replace( /\r|\n|\t|\s\s/g, '') + "\n";
            templates += '    "done": "true"\n  }';

            return prefix + templates + postfix;

        }
    };
}
