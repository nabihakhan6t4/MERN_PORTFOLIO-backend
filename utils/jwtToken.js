export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      
    })
    .json({
      success: true,
      message,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
};
