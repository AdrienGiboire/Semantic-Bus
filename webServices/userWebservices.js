const User = require('./models/userModel');
const config = require('./models/configuration');

module.exports = function (router) {
    router.get('/core/users/:id', function (req, res) {
        console.log(req.params.id)
        User.findOne({
            where: {
                _id: req.params.id
            }
        }, function (err, user) {
            console.log(user);
            if (user) {
                res.send({
                    user: user,
                });
            }
        })
    });

    router.put('/core/users/:id', function (req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        }, function (err, user) {
            if (user) {
                console.log("in false")
                console.log(user);
                res.send(false)
            } else {
                User.findOne({
                    where: {
                        _id: req.params.id
                    }
                }, function (err, user) {
                    if (user) {
                        user.email = req.body.email
                        user.save(function () {
                            res.send({
                                user: user,
                            });
                        })
                    }
                })
            }
        })
    });
}