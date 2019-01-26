const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: "94cc0409d4ab41698e2988f413cc60ef"
});

const handleApiCall = (req, res) => {
  const imageUrl = req.body.imageUrl;
  app.models.initModel({ id: Clarifai.FACE_DETECT_MODEL })
    .then(model => {
      return model.predict(imageUrl);
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(console.error);
}

const handleImage = (database) => (req, res) => {
  const { id, faceCountIncre } = req.body;
  database('facebrain')
    .where('fb_id', '=', id)
    .increment({
      'image_count': 1,
      'face_count' : faceCountIncre
    })
    .then(() => res.status(200).json())
    .catch(err => {
      console.error(err);
      res.status(500);
    })
}

module.exports = {
  handleImage : handleImage,
  handleApiCall : handleApiCall
}