var _ = require('lodash');

module.exports = function jacksMergeProcessor(log) {
	return {
		$runAfter: ['computePathsProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function (docs) {

			// var jsDocs = docs.filter(function(doc) {
			// 	if (doc.docType === 'js'){
			// 		return true;
			// 	}
			// });

			// jsDocs.forEach(function(jsdoc, idx, arr) {
			// 	// todo:
			// 	// 1. 	a. update path 
			// 	// 		b. create a new doctype for method
			// 	// 		c. ignore the doc, add directly to the angular stuff as dependencies
			// 	// 2. remove the element if it is added to a parent
			// 	jsdoc.codeNode.type === 'FunctionDeclaration'
			// });
			// 1. do some stuff with docs
			// 2. update path
			// 3. add reference link to parent service or directive
			// find the memberof tag
			// check type from doc.codeNode.type: e.g. FunctionDeclaration
			
			// ngServiceDocs = _.filter(docs, { docType: 'ngService'});

			// ngDirectiveDocs = _.filter(docs, {docType: 'ngDirective'});

			// ngControllerDocs = _.filter(docs, {docType: 'ngController'});

			ngDocs = _(docs).reject({docType: 'ngModule'})
							.reject({docType: 'componentGroup'})
							.value();



			jsDocsWithMemberOf = _(docs).filter({docType: 'js'})
										.filter(function(doc) {
											var tags = doc.tags.tags;
											return _.find(tags, function(tag) {
												if(tag.tagName === 'memberof') {
													return true;
												}
												return false;
											});
										})
										.value();

			jsDocsWithMemberOf.forEach( function(doc, idx) {
				var tags = doc.tags.tags;
				var memberofTag = _.find(tags, function(tag) {
					if(tag.tagName === 'memberof'){
						return true;
					}
				});

				if (typeof memberofTag !== 'undefined'){
					var parentName = memberofTag.description;

					log.debug("memberof: " + parentName);
					// find the associated doc e.g. service or directive
					var parentIdx = _.findIndex(ngDocs, function(a) {
						return a.name === parentName;
					});

					log.debug("doc id:"+ doc.id + ", parentIdx:" + parentIdx + ", memberof:" + parentName);

					if(parentIdx > -1){

						var parentDoc = ngDocs[parentIdx];

						if (! parentDoc.hasOwnProperty('methods')) {
							// add methods
							parentDoc.methods = [];
						}

						parentDoc.methods.push({
							"name": doc.id,
							"description": doc.description
						});

						// if(_.isString(parentDoc.path)){
							doc.path = parentDoc.path;
							doc.outputPath = doc.path + doc.outputPath;
						// }
					}
				}

				// update doc type
				doc.docType = "gcMethod";

			});

			return docs;
		}
	};
};