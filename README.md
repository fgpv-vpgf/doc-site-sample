doc-site-sample
===============

A dgeni based project/api doc generation code. Using dgeni, dgeni-angularjs package. Custom processors were added to process jsdoc comments.

angular-esri-map project was used as source code example for the demo purpose. You can read more about the project on github site [Read more...](http://esri.githbu.io/angular-esri-map)

I am not a contributor to the angular-esri-map project. I do not take any credit for the awesome work they did on angular-esri-map project.

Modification

* Added myDgeni folder for dgeni related code, config, template
* Modified gulpfile.js to include dgeni tasks.

## Getting Started

Clone the project

Run npm install

```bash
npm install
```

To build the doc site run the following command:
```bash
gulp dgeni
```
This will build and copy the files for the doc site to ./dist/mydgeni/docs/app

To build and view the doc site,
```bash
gulp dgeni:serve
```

## Project Documents
Project docs can be in markdown format. They are placed in ./myDgeni/docs/content folder, e.g. getting_started.md

Project docs can also be in partial html format and placed in ./myDgeni/docs/app/partials, e.g. home.tmpl.html

Currently project documents routing is done via modification on app.js, this process can be automated like the API doc.

## API Documents
API documents are processed by dgeni reading through the specified source folder in dgeni-config.js. Partial documents are generated and placed in proper folder. Route file to partial documents is also generated and will be consumed by the angular application which handles the routing of different API docs.