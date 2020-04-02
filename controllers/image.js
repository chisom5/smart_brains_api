const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: "d97d34298c994bc1913b5fe1f1bd8955"
});

const handleApiCall = (req, res) =>(req, res)=>{
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data=>{
    res.json(data)
  })
  .catch(err => res.status(400).json({message: 'error with the api'}));
};

const handleImage = (req, res) => (req, res) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json({ message: "unable to get entries" }));
};

module.exports = {
  handleImage,
  handleApiCall
};
