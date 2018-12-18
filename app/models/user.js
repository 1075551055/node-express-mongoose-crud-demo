const mongoose = require('mongoose'),
    Schema = mongoose.Schema
const conn = require('./db')

var UserSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'why no user name?']
    },
    //todo add validation
    emailAddress: {
        type: String
        // validate
    }
});

/**
 * Methods
 */
UserSchema.methods = {
    // /**
    // * add user
    // *
    // * @param user
    // * @return void
    // * @api private
    // */
    // addUser: function (user) {
    //     let err = this.validateSync();
    //     if (err && err.toString()) throw new Error(err.toString());
    //
    // }
    saveOrUpdate: function () {
        const err = this.validateSync();
        if (err && err.toString()) throw new Error(err.toString());
        return this.save();
    }
};

UserSchema.statics = {
    load: function (_id) {
        return this.findOne({_id});
    },
    list: function (callBack) {
        return this.find({}, callBack);
    }
}

// Important! (https://www.npmjs.com/package/mongoose)
// If you opened a separate connection using mongoose.createConnection() but attempt to access
// the model through mongoose.model('ModelName') it will not work as expected since it is
// not hooked up to an active db connection. In this case access your model through the
// connection you created
module.exports = conn.model('User', UserSchema)