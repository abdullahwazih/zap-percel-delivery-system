
// Firebase Setup 
const admin = require("firebase-admin");

var serviceAccount = require("../../zap-shift-25aa5-firebase-adminsdk-fbsvc-192b345207.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const verifyFBToken = async (req, res, next) => {

    const rawAuthHeader = req.headers.authorization || req.headers.Authorization;

    // 🛑 FIX: Check if the header exists at all
    if (!rawAuthHeader) {
        return res.status(401).json({ error: "Access Denied: No token provided" });
    }

    const token = rawAuthHeader.startsWith("Bearer ")
        ? rawAuthHeader.slice(7) // "Bearer " is 7 characters
        : rawAuthHeader;

    // Proceed to verification
    console.log("Verifying token:", token);

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        console.log("Decoded token:", decoded.email);
        req.decoded_email = decoded.email;
        next();
    }
    catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ error: "Access Denied: Invalid token" });

    };


}
module.exports = verifyFBToken;
