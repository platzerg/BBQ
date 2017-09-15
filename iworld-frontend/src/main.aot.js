"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Webpack creates a link to the main.css and put it into the index.html
require("./assets/css/main.scss");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_module_ngfactory_1 = require("../aot/src/app/app.module.ngfactory");
core_1.enableProdMode();
platform_browser_1.platformBrowser().bootstrapModuleFactory(app_module_ngfactory_1.AppModuleNgFactory)
    .catch(function (err) { return console.error(err); });
