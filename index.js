const fs = require("fs");
const path = require("path");
const express = require("express");
const Mock = require('mockjs')
const watch = function(filename, callback) {
    var isWin = process.platform === "win32";
    if (isWin) {
        return fs.watch(filename, function(event) {
            if (event === "change") {
                return callback(filename);
            }
        });
    } else {
        return fs.watchFile(
            filename,
            {
                interval: 200
            },
            function(curr, prev) {
                if (curr.mtime > prev.mtime) {
                    return callback(filename);
                }
            }
        );
    }
};
const cleanCache = function(modulePath) {
    var module = require.cache[modulePath] || {};
    // remove reference in module.parent
    if (module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1);
    }
    require.cache[modulePath] = null;
};

module.exports = (api, options) => {
    let mockRouter = express.Router();
    const mockOptions = options.pluginOptions && options.pluginOptions.mock || {};
    let entry = mockOptions.entry || "mock.js";
    let power = mockOptions.power !== undefined ? mockOptions.power : true;
    if(power){
        let watchFile = path.join(process.cwd(), entry);
        api.configureDevServer(function(app) {
            if (fs.existsSync(watchFile)) {
                require(watchFile)(mockRouter, Mock);
                console.log("[INFO] 已成功加载 mock.js");
                watch(watchFile, function() {
                    cleanCache(watchFile);
                    mockRouter.stack = [];
                    require(watchFile)(mockRouter, Mock);
                    console.log("[INFO] mock.js UPDATED!");
                });
                app.use("/", mockRouter);
            }
        });
    }
};
