const PHONE_NUMBER_PROP = "phone";
const hubspot = require('@hubspot/api-client');

exports.main = (event, callback) => {
  const hubspotClient = new hubspot.Client({ accessToken: process.env.SECRET_NAME // Your api key secret });
  const contactId = event.object.objectId;

  hubspotClient.crm.contacts.basicApi.getById(contactId, [PHONE_NUMBER_PROP])
    .then(results => {
      const phone = results.properties[PHONE_NUMBER_PROP];
      if (!phone) return;

      hubspotClient.crm.contacts.basicApi.update(contactId, {
        properties: { [PHONE_NUMBER_PROP]: formatPhoneNumber(phone) }
      });
    });
};

function formatPhoneNumber(phoneNumber) {
  let cleaned = phoneNumber.replace(/\D/g, '').trim();

  if (cleaned.length === 11 && cleaned[0] === '1') {
    return '+1 (' + cleaned.substring(1, 4) + ') ' + cleaned.substring(4, 7) + '-' + cleaned.substring(7);
  }

  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) return '+1 (' + match[1] + ') ' + match[2] + '-' + match[3];

  return phoneNumber;
}
