var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.gateway = "https://earthserver-sg.consorzio-cometa.it/";

Alloy.Globals.repository = "ESArep";

Alloy.Globals.Map = require("ti.map");

Alloy.createController("index");