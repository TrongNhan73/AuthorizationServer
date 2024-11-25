import apiUser from '../services/apiAuthen.service';
const testApi = (req, res) => {
    res.status(200).json({
        message: "ok",
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.userName || !req.body.phoneNum || !req.body.password) {
            return res.status(400).json({
                EM: 'missing required parameter',//error message
                EC: '1',//error code
                DT: ''//data
            });

        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(400).json({
                EM: 'The password must have more than 3 letters',//error message
                EC: 1,//error code
                DT: ''//data
            });
        }
        let data = await apiUser.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: ''//data
        });
    } catch (e) {
        console.log(">>>>>Error when signup: " + e.message);
        return res.status(500).json({
            EM: 'error when register{controller}',//error message
            EC: '-1',//error code
            DT: ''//data
        });
    }
}

const handleLogin = async (req, res) => {
    try {
        if (!req.body.ephone || !req.body.password) {
            return res.status(400).json({
                EM: 'missing required parameter',//error message
                EC: '1',//error code
                DT: ''//data
            });

        }
        let data = await apiUser.login(req.body);
        res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (e) {
        console.log(">>>>>Error when login: " + e.message);
        return res.status(500).json({
            EM: "Error when login{controller}",
            EC: '-1',
            DT: ''
        });
    }
}

const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: 'ok',
        EC: '0',
        DT: {
            access_token: req.token,
            ...req.user
        }
    })
}


module.exports = {
    testApi,
    handleRegister,
    handleLogin,
    getUserAccount
}




//test

// return res.status(200).json({
//     EM: 'this is test',
//     EC: 1111,
//     DT: ''
// });