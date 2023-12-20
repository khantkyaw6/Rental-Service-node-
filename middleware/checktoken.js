const jwt = require("jsonwebtoken");
const Admin = require("../model/adminmodel");
const { message } = require("../Helpers/helper");
const checkToken = (req, res, next) => {
    const whileList = ["/api/admin/login", "/api/admin/register"];
    let check = whileList.includes(req.path);
    if (check) {
        next();
    } else {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) return message(res, true, "No Token!");
        jwt.verify(token, "admin", async (err, decoded) => {
            if (err) return message(res, true, "Unauthorized Token!");
            const exitAdmin = await Admin.findOne({ authToken: token });
            if (exitAdmin) {
                req.admin = { id: exitAdmin?._id };
                exitAdmin && next();
            } else {
                return message(res, true, "Unauthorized Token!");
            }
        });
    }
};
module.exports = checkToken;
