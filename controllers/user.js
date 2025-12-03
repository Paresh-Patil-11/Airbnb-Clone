const User = require("../models/user.js");


module.exports.signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm = async (req, res, next) => {
        try {
            const authenticateUser = User.authenticate();
            const { user, error } = await authenticateUser(req.body.username, req.body.password);

            if (user) {
                req.login(user, (err) => {
                    if (err) return next(err);
                    req.flash("success", "Welcome back to Wanderlust!");
                    const redirectUrl = res.locals.redirectUrl || "/listings";
                    res.redirect(redirectUrl);
                });
            } else {
                req.flash("error","Invalid username or password.");
                res.redirect("/login");
            }
        } catch (err) {
            req.flash("error", "An unexpected server error occurred during login. Please check your console.");
            res.redirect("/login");
        }
    }

    module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
}