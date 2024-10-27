const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        console.log("token", token);
        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                
                console.log("error auth", err);

                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded?._id;
            next(); // Gọi tiếp tục middleware nếu token hợp lệ
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
