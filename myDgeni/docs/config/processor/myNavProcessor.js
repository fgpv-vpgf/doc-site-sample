var _ = require('lodash');

module.exports = function myNavProcessor(log) {
	return {
		$runAfter: ['myJSMergeProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function (docs) {

			var navMenu = [];

			var moduleDocs = _.filter(docs, {docType: 'ngModule'});


			_.forEach(moduleDocs, function(moduleDoc, idx) {
				var subMenu=[];

				// groups is not array
				// convert to array
				var groups = _.pairs(moduleDoc.groups);


				if(groups.length) {
					groups.forEach(function(group) {
						// directives, services, filters ???
						subMenu.push({
							title: group[1].title,
							children: group[1].children
					    });

					    // TODO: each group has children in array format
					    // children has name, outputPath as value
					});

					// build each menu item for module
					navMenu.push({
						name: moduleDoc.name,
						url: moduleDoc.outputPath,
						submenus: subMenu
					});
				}

			});

			// create new doc called index,  set output location to  ../
			// because the output location is in the partial folder for rest of the files
			docs.push({
				'docType': 'index',
				'gcMenu': navMenu,
				'name': 'This is a name field',
				'title': 'This is a title field',
				// 'path': '../../',
				'outputPath': '../index.html'
			});

			return docs;
		}
	};
};