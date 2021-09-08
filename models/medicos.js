const { Schema, model} = require('mongoose');

const medicoslSchema = Schema({
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
    },
    hospital:{
        required: true,
        type:Schema.Types.ObjectId,
        ref: 'hospital'
    }

},{ collection: 'medicos' });

medicoslSchema.method('toJSON', function(){
    const {__v,...object} = this.toObject();
    return object;
});

module.exports = model('medicos',medicoslSchema);