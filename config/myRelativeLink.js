var _ = require('lodash');
var path = require('canonical-path');

module.exports = function myRelativeLinkInlineTag() {
  return {
    name: 'myRelativeLink',
    process: function(myTitle, myOutputPath) {

    var url;
    title = myTitle;
    url = path.join("/",myOutputPath);
    var compiled = _.template('<a href="${url}">${title}</a>');

    return compiled({ url: url, title: title });
    }
  };
};