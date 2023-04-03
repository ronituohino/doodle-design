// This defines all the currencies
// supported by the application

// Use ISO 4217 format
const currency = ["EUR"];

const getMongoose = () => {
  const obj = {};
  currency.forEach(l => {
    obj[l] = Number;
  });

  return obj;
};

const getGql = () => {
  const obj = {};
  currency.forEach(l => {
    obj[l] = "Float!";
  });

  const regex = /"/gi;
  return `${JSON.stringify(obj).replace(regex, "")}`;
};

module.exports = { currency, getMongoose, getGql };
