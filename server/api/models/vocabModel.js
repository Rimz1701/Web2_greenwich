const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const VocabSchema = new Schema({
    english :{
        type: String,
        required: 'English word cannot be blank'
    },
    german:{
        type: String,
        required: 'German word cannot be blank'
    },
    korean:{
        type: String,
        required: 'Korean word cannot be blank'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }, 
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }

},
{ collection: 'vocab3'}
);

VocabSchema.pre('save', function(next) { 
    this.updatedAt = Date.now(); 
    next(); 
});

module.exports = mongoose.model('Vocab', VocabSchema);