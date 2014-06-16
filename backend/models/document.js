/**
 * Created by Iruna on 21.05.14.
 */

var mongoose = require('mongoose'),
    DocumentSchema = new mongoose.Schema({
        title:{
            type: String,
            required:true
        },
        owner:{
            type: String,
            required:true
        },
        accessLayer:{
            type: Array,
            required:true
        },
        description:{
            type: String,
            required:true
        },
        fileName:{
            type: String,
            required:true
        },
        uploadDate:{
            type: Number,
            required:true
        },
        updateDate:{
            type: Number,
            required:true
        },
        tags:{
            type:Array,
            required:true
        },
        type:{
            type:Number,     //Документ чи оголошення. Якщо оголошення файл не додаються в базу даних
            required:true
        },
        md5:{
            type: String
        },
        MIMEType:{
            type:String
        },
        binaryFile:{
            type: Buffer
        }
    });

module.exports = mongoose.model('document', DocumentSchema, 'documents');
