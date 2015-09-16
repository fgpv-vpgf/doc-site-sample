// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');
var Package = require('dgeni').Package;


module.exports = new Package('dgeni-example', [
  require('dgeni-packages/angularjs'),
  require('dgeni-packages/jsdoc'),
  require('dgeni-packages/nunjucks')
])

// add myRelativeLink to the package
.factory(require('./processor/myRelativeLink'))
.factory(require('./processor/myLinkModifier'))
.factory(require('./processor/myApp'))

.processor(require('./processor/myJSMergeProcessor'))
.processor(require('./processor/myNavProcessor'))

.config(function(log, readFilesProcessor, writeFilesProcessor) {

  log.level = 'debug'; // info, debug, silly

  readFilesProcessor.basePath = path.resolve(__dirname, '..');
  readFilesProcessor.sourceFiles = [
    { include: '../../src/**/*.js', basePath: '../../src' }
  ];

  writeFilesProcessor.outputFolder  = 'dist/mydgeni/docs/app/partials';

})


.config(function(templateFinder, templateEngine) {

  // Nunjucks and Angular conflict in their template bindings so change the Nunjucks
  templateEngine.config.tags = {
    variableStart: '{$',
    variableEnd: '$}'
  };

  templateFinder.templateFolders
      .unshift(path.resolve(__dirname, './config/templates'));

  templateFinder.templatePatterns = [
    '${ doc.template }',
    '${ doc.id }.${ doc.docType }.template.html',
    '${ doc.id }.template.html',
    '${ doc.docType }.template.html',
    'common.template.html'
  ];
})

// add filter to template engine
.config(function(templateEngine, myRelativeLinkInlineTag, myLinkModifierFilter) {
  templateEngine.filters.push(myRelativeLinkInlineTag);
  templateEngine.filters.push(myLinkModifierFilter);
})

.config(function(getLinkInfo) {
  getLinkInfo.relativeLinks = true;
});




