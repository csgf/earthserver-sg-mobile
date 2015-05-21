exports.definition = {
    config: {
        columns: {
            name: "string",
            size: "bigint",
            thumb: "string",
            upload_date: "datetime"
        },
        adapter: {
            type: "sql",
            collection_name: "File"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("File", exports.definition, []);

collection = Alloy.C("File", exports.definition, model);

exports.Model = model;

exports.Collection = collection;