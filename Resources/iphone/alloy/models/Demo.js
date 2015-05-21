exports.definition = {
    config: {
        columns: {
            FileName: "string",
            SubmissionDate: "datetime",
            Description: "string",
            Keywords: "string",
            Size: "int",
            FileType: "string",
            Title: "string",
            User: "string",
            Comments: "string",
            Thumb: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "Demo"
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

model = Alloy.M("Demo", exports.definition, []);

collection = Alloy.C("Demo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;