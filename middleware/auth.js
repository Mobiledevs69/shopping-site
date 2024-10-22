function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.redirect('/account/login');  // Redirect if not an admin
}

const isNormalUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role && req.user.role === 'user') {
      return next();
    } else {
      return res.redirect('/admin');
    }
  }
  res.redirect('/account/login');
};

module.exports = { isAdmin, isNormalUser }