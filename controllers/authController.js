const User = require("../models/user")
const validatePassword = require("../helpers/validatePassword")
const bcrypt = require("bcryptjs")

exports.register = async (req, res) => {
    const { firstName, lastName, phone, email, password, confirmPassword, role } = req.body;

    //Check if the password match
    if (password !== confirmPassword) {
        return res.json("do not match");
    }

    //Check if the password is valid
    if (!validatePassword(password)) {
        return res.json("Invalid password");
    }

    try {
        //Check if the user already exist
        let user = await User.findOne({ email });
        if (user) {
            res.json("exists");
        }

        user = new User({ firstName, lastName, phone, email, password, role});
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save();

        const token = user.generateAuthToken()
        res.header("auth-token", token).json(user)
    } catch (error) {
        console.log(error);
    }
};


exports.login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.json("invalid email or password")
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.json("invalid email or password")
        }

        const token = user.generateAuthToken()
        res.json({token})
    } catch (error) {
        console.log(error);
    }
}