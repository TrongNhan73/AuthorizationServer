const testApi = (req, res) => {
    res.status(200).json({
        message: "ok",
        data: 'test api'
    })
}
module.exports = {
    testApi
}