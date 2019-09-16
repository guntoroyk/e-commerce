const User = require('../models/user');
const { generateToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');

class UserController {
    static signup(req, res, next) {
        const { name, email, password } = req.body;

        User.create({ name, email, password })
            .then(user => {
                const payload = {
                    name: user.name,
                    email: user.email,
                    role: user.role
                };

                let token = generateToken(payload);

                res.status(201).json({ token, payload });
            })
            .catch(next);
    };

    static signin(req, res, next) {
        const { email, password } = req.body;

        User.findOne({ email })
            .then(user => {
                if (user) {
                    if(comparePassword(password, user.password)) {
                        const payload = {
                            name: user.name,
                            email: user.email,
                            role: user.role
                        };

                        let token = generateToken(payload);
                        res.status(200).json({ token, payload });
                    } else {
                        res.status(400).json({
                            errors: ['Incorrect email or password']
                        })
                    }
                } else {
                    res.status(400).json({
                        errors: ['Incorrect email or password']
                    })
                }
            })
            .catch(next)
    }
}

module.exports = UserController;