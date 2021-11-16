const {Router} = require('express');

const {HomeGet, GalleryGet, GetGallery, GalleryPost, GalleryUpdate, GalleryDelete, UploadImage} = require('../controller/gallery');
const router = Router();

const multipart = require('connect-multiparty');
const md_upload =multipart({uploadDir: './uploads/galleries'})


router.get('/home', HomeGet);

//metodo mostrar 
router.get('/getImages', GalleryGet)

//ruta mostrar un solo document
router.get('/getimage/:id', GetGallery);

//ruta para guardar
router.post('/save', GalleryPost);

//ruta actualizar 
router.put('/updateImage/:id', GalleryUpdate)

//ruta eliminar
router.delete('/deletegallary/:id', GalleryDelete)

//subir archivo
router.post('/uploadimage/:id', md_upload, UploadImage)

module.exports = router;