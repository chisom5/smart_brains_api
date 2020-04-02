const saltRound = 10;
const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: "incorrect form submission" });
  }
  const hash = bcrypt.hashSync(password, saltRound);

  db.transaction(trx => {
    trx
      .insert({
        hash,
        email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0],
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err =>
    res.status(400).json({
      message: "unable to register"
    })
  );
};

module.exports = {
  handleRegister
};
