var assert = require('assert');
var fs = require('fs');

module.exports = function (gm, dir, finish, GM) {

  // Same image
  gm.compare(dir + '/original.jpg', dir + '/original.png', function(err, same) {
    if (err) return finish(err);
    if (!same) return finish(new Error('Compare should be the same!'));

    // Create a new noisy image
    gm.noise(0.3).write(dir + '/noise3.png', function (err) {
      if (err) return finish(err);

      var options = {
        highlightColor: 'yellow',
        file: dir + '/diff.png'
      };

      // Compare these images and write to a file.
      gm.compare(dir + '/original.jpg', dir + '/noise3.png', options, function(err) {
        if (err) return finish(err);

        fs.exists(options.file, function(exists) {
          if (exists) finish();
          else finish(new Error('Diff file does not exist.'));
        });
      });
    })
  });
};