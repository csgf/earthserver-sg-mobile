exports.definition = {
	config: {
		columns: {
		    "name": "string",
		    "size": "bigint",
		    "thumb": "string",
		    "upload_date": "datetime"
		},
		adapter: {
			type: "sql",
			collection_name: "File"
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
}

