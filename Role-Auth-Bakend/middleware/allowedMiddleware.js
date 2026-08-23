const checkAllowed = (req, res, next) => {
  // Check user
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  // Admin ko automatically access
  if (req.user.role === "admin") {
    return next();
  }

  // Normal user allowed hai ya nahi
  if (!req.user.isAllowed) {
    return res.status(403).json({
      success: false,
      message: "Your account is not allowed by admin",
    });
  }

  // User allowed hai
  next();
};

export default checkAllowed;