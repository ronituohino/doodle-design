const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getPagination = (page, size) => {
  const limit = size ? size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset, populate: "category" };
};

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const createToken = _id => {
  const userToken = { _id };
  return { token: jwt.sign(userToken, process.env.JWT_SECRET) };
};

const streamToBase64 = stream => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", chunk => chunks.push(Buffer.from(chunk)));
    stream.on("error", err => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("base64")));
  });
};

module.exports = {
  getPagination,
  hashPassword,
  createToken,
  streamToBase64,
};
