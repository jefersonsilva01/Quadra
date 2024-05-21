module.exports = (req, res, next) => {
  if (req.session.currentUser) res.redirect("/");

  next();
}