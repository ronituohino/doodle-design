const getMongoose = () => {
  return {
    year: Number,
    month: Number,
    day: Number,
    hours: Number,
    minutes: Number,
    seconds: Number,
  };
};

const getGql = () => {
  return `{
    year: Int!
    month: Int!
    day: Int!
    hours: Int!
    minutes: Int!
    seconds: Int!
  }`;
};

module.exports = { getMongoose, getGql };
