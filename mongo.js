var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');

var mongoSchema =   mongoose.Schema;

var userSchema  = {

	"name": {
        "first": String,
        "last": String,
        },
        "title": String,
        "emails": [String]
};

module.exports = mongoose.model('contacts',userSchema);



