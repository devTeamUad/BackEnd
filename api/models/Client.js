const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true, 
            maxlength: 200,
        },
        prenom: {
            type: String,
            required: false,
            maxlength: 60,
        },
        type: {
            type: String,
            required: true,
            enum:["personne morale", "personne physique"],
        },
         telephone: {
            type: String,
            required: true,
            minlength: 9,
            maxlength: 20,

        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
         archive: {
            type: String,
            enum: ["archive", "nonArchive"],
            default: "nonArchive",
        },
        pays: {
            type: String,
            required: true,
            maxlength: 40,
        },
        ville: {
            type: String,
            required: true,
            maxlength: 50,
        },
        quartier: {
            type: String,
            required: true,
        }
    },
  {timestamps:true}
);

module.exports= mongoose.model("client", clientSchema);