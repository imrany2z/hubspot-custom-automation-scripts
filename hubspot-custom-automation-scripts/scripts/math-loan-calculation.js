const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.SECRET_NAME
  });

  const calculateloan = (verified_income) => {
    return Math.exp((2 * Math.log(verified_income) + 2) - 0.5);
  };

  const verifiedincome = event.inputFields['verified__income'];
  const calculatedResult = calculateloan(verifiedincome);

  callback({
    outputFields: {
      calculatedResult: calculatedResult,
    }
  });
};
