const mongoose = require('mongoose');

const GalleryModel = new mongoose.Schema({

    title: {
        type: String
    },

    description: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model ('galleries', GalleryModel)