export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken(); // Make sure this method sets the JWT expiration

  // Convert COOKIE_EXPIRES from days to milliseconds
  const expiresInDays = parseInt(process.env.COOKIE_EXPIRES) || 7; // Default to 7 days if the value is not set
  const expiresInMilliseconds = expiresInDays * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + expiresInMilliseconds), // Set the expiration for the cookie
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
