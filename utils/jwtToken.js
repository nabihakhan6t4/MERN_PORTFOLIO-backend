export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken({
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });

  const expiresInDays = parseInt(process.env.COOKIE_EXPIRES) || 7;
  const expiresInSeconds = expiresInDays * 24 * 60 * 60;

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + expiresInSeconds * 1000),
      httpOnly: true,
      secure: true,         
      sameSite: "None",     
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
