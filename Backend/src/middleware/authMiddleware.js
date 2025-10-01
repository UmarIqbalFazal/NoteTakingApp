import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log("🔎 [MW] Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("🔒 [MW] No token provided");
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log("🔒 [MW] Token verification failed:", err.message);
      return res.status(401).json({ error: "Invalid token" });
    }

    console.log("✅ [MW] Token decoded (id):", decoded && decoded.id);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("🔥 [MW] auth error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
}


/* commenting out code for debugging
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {
    // token should be sent in request header: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user id to request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

*/
