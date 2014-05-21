/**
 * Created by Iruna on 21.05.14.
 */

var mongoose = require('mongoose');

var DocumentSchema = new mongoose.Schema({

    documentId:{
        type: Number,
        required:true,
        unique:true
    },
    title:{
        type: String,
        required:true
    },
    owner:{
        type: String,
        required:true
    },
    accessLayer:{
        type: Number,
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
        type: Data,
        required:true
    },
    updateData:{
        type: Date,
        required:true
    },
    tags:{
        type:Array,
        required:true
    },
    type:{
        type:String,     //Документ чи оголошення. Якщо оголошення файл не додаються в базу даних
        required:true
    },
    md5:{
        type: String
    },
    MIMEType:{
        type:String
    },
    binaryFile:{
        type:String
    }
});

mongoose.model('document', DocumentSchema, 'documents');
