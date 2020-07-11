"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
app.get('/', function (request, response) {
    return response.json({ message: 'Hello' });
});
app.listen(3333);
