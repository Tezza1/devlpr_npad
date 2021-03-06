// protect routes
module.exports = {
  protectRoute: (req, res, next) => {
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Please log in');
    res.redirect('/users/login');
  }
}