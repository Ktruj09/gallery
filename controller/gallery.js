//importamos nuestro modelo
const Gallery = require("../models/gallery");
const fs = require('fs');
var path = require('path');



const HomeGet = async (req, res) => {
  res.status(200).send({
    message: "Ruta de Prueba",
  });
}; //end HomeGet

//metodo para mostrar
const GalleryGet = async (req, res) => {
  const galleries = await Gallery.find();
  const total = await Gallery.countDocuments();

  if (galleries == 0) {
    res.status(200).send({
      message: "No hay Imagenes a mostrar",
    });
  } else {
    res.status(200).send({
      message: "Las imagenes guardadas son: ",
      total,
      galleries,
    });
  }
}; //end GalleryGet

//método getImage
const GetGallery = async(req, res)=>{

    const galleryId = req.params.id;

    const gallery = await Gallery.findById(galleryId);
  
    res.status(200).send({
      
      gallery,
    });

}

//método guardar
const GalleryPost = async (req, res) => {
  //acá indicamos que todo esto, vendrá desde el body
  const { title, description, image = null } = req.body;

  const gallery = new Gallery({ title, description, image });

  //guardamos los datos
  await gallery.save();

  res.status(201).json({
    message: "Gallería guardada Perfectamente",
    gallery,
  });
}; //end GalleryPost

//método actualizar
const GalleryUpdate = async (req, res) => {
  //esta variable nos servirá para llamar el dato que deseamos actualizar
  //por medio del ID
  const updateId = req.params.id;

  //acá lo que vamos a actualizar vendrá del body
  const update = req.body;

  await Gallery.findByIdAndUpdate(
    updateId,
    update,
    { new: true },
    (err, galleryUpdate) => {
      res.status(201).send({
        message: "Imagén actualizada correctamente",
        gallery: galleryUpdate,
      });
    }
  );
}; //end update

const GalleryDelete = async (req, res) => {
  const deleteId = req.params.id;

  const gallery = await Gallery.findByIdAndRemove(deleteId);

  res.status(200).send({
    message: "Elemento borrado correctamente",
    gallery,
  });
};//end Gallery Delete

//método subir imagen
const UploadImage= async(req, res) =>{

    const galleryId = req.params.id;
    if (req.files) {
        const file_path = req.files.image.path;
        console.log(file_path)
        const file_split = file_path.split('\\')
        console.log(file_split)

        //sacamos el nombre del archivo
        const file_name = file_split[2];
        console.log(file_name)

        const ext_split = file_name.split('\.');
        const file_ext = ext_split[1];
        console.log(file_ext);
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext =='gif') {

            //actualizar documento de usuario logueado
            await Gallery.findByIdAndUpdate(galleryId, { image: file_name }, { new: true }, (err, galleryUpdate) => {
                if (err) res.status(404).send({ message: 'Error al actualizar los datos del usuario' })

                res.status(201).send({ gallary: galleryUpdate })
            })
        } else {
            return removeFile(res, file_path, 'Extensión no validad')
        }
    } else {
        return res.status(200).send({ message: 'No se ha podido subir la imagen' })
    }
}

function removeFile(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    })
}

module.exports = {
  HomeGet,
  GalleryGet,
  GetGallery,
  GalleryPost,
  GalleryUpdate,
  GalleryDelete,
  UploadImage,

};
