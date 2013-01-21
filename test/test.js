/*jslint node: true */
'use strict';


exports.nodeunit = {
  will_always_pass: function(test) {
    test.expect(1);
    test.ok(true, 'this had better work.');
    test.done();
  }
};
