const handleProfile =(db) => (req, res) =>{
    const { id } = req.params;
  
    db.select("*")
      .from("users")
      .where({ id })
      .then(user => {
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json({
            message: "not found"
          });
        }
      })
      .catch(err => res.status(400).json({ message: "error getting users" }));
  }

  module.exports ={
      handleProfile
  }