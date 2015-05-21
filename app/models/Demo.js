exports.definition = {
	config: {
		columns: {
		    "FileName": "string",
		    "SubmissionDate": "datetime",
		    "Description": "string",
		    "Keywords": "string",
		    "Size": "int",
		    "FileType": "string",
		    "Title": "string",
		    "User": "string",
		    "Comments": "string",
		    "Thumb": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "Demo"
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

