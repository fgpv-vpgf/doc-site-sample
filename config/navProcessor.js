var _ = require('lodash');

module.exports = function jackSNavProcessor(log) {
	return {
		$runAfter: ['jacksMergeProcessor'],
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

			_.forEach(docs, function(doc) {
				_.assign(doc, {'gcMenu':navMenu});
			});

			return docs;
		}
	};
};