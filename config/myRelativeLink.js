var _ = require('lodash');
var path = require('canonical-path');

module.exports = function myRelativeLinkInlineTag(myApp) {
  return {
    name: 'myRelativeLink',
    process: function(myTitle, myOutputPath) {

        var url;
        var compiled = _.template('<a href="${url}">${title}</a>');
        var title = myTitle;

        if (myOutputPath) {
            url = path.join(myApp.deployPath, myOutputPath);
        } else{
            return myTitle;
        }

        return compiled({ url: url, title: title });
    }
  };  
};