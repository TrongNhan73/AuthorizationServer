import apiUser from '../services/apiUser.service';
const testApi = (req, res) => {
    res.status(200).json({
        message: "ok",
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.userName || !req.body.phoneNum || !req.body.password) {
            return res.status(500).json({
                EM: 'missing required parameter',//error message
                EC: '1',//error code
                DT: ''//data
            });

        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
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
        console.log(e.message);
        return res.status(500).json({
            EM: 'error when register',//error message
            EC: '-1',//error code
            DT: ''//data
        });
    }
}
module.exports = {
    testApi,
    handleRegister
}