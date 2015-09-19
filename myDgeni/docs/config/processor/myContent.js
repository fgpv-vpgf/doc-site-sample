var _ = require('lodash');

module.exports = function myContentProcessor(templateFinder, log) {
	return {
		$runAfter: ['myNavProcessor'],
	    $runBefore: ['rendering-docs'],
	    $process: function(docs) {
	    	log.info('in myContentProcessor');
	      // var contentDocs = _(docs)
	      // .filter(function(doc) {
	      //   return doc.docType === 'content';
	      // })
	      // .groupBy('area')
	      // .mapValues(function(areaDocs) {
	      //   return _.map(areaDocs, function(areaDoc) {
	      //     return {
	      //       name: areaDoc.name,
	      //       outputPath: areaDoc.outputPath,
	      //       url: '/' + areaDoc.path,
	      //       label: areaDoc.label || areaDoc.name
	      //     };
	      //   });
	      // }).
	      // value();

	      // docs.push({
	      //   name: 'PAGES',
	      //   docType: 'content',
	      //   template: 'constant-data.template.js',
	      //   outputPath: 'js/content-data.js',
	      //   items: contentDocs
	      // });
	      // _.forEach(docs, function(doc){
	      // 	log.debug('doc.name:' + doc.name + ' ,doc.docType: ' + doc.docType);
	      // });
	      var contentDocs = _(docs).filter(function(doc){
	      	return doc.docType === 'content';
	      })
	      .value();

	      contentDocs.forEach(function(doc) {
	      	doc.outputPath = '../' + doc.fileInfo.baseName + '.html';
	      });

	      return docs;
	    }
	};
};