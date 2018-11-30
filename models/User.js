const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
	googleId: String
}); 
//create a new collection 'users'
mongoose.model('users',userSchema);