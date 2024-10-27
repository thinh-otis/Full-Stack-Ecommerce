async function userLogout(req, res) {
    try {
        const tokenOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        };

        res.clearCookie("token", tokenOption);

        return res.status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Error logging out",
            error: true,
            success: false,
        });
    }
}
