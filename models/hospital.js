const { Schema, model} = require('mongoose');

const hospitalSchema = Schema({
    name:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    google:{
        type:Boolean,
        default: false
    },
    user:{
        required: true,
        type: Schema.Types.ObjectId,
        ref:'user'
    }

},{ collection: 'hospital' });

hospitalSchema.method('toJSON', function(){
    const {__v,...object} = this.toObject();
    return object;
});

module.exports = model('hospital',hospitalSchema);