const borrow_email = 'borrow_email';
const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.SECRET_NAME // Your api key secret
  });

  try {
    const deal = await hubspotClient.crm.deals.basicApi.getById(event.object.objectId, ["hubspot_owner_id", borrow_email]);
    const dealOwnerId = deal.properties.hubspot_owner_id;
    const email = deal.properties[borrow_email];

    const contactSearch = await hubspotClient.crm.contacts.searchApi.doSearch({
      filterGroups: [{
        filters: [{ propertyName: 'email', operator: 'EQ', value: email }]
      }]
    });

    const contactId = contactSearch.results.map(obj => obj.id)[0];
    const contact = await hubspotClient.crm.contacts.basicApi.getById(contactId, ["hubspot_owner_id"]);
    const contactOwnerId = contact.properties.hubspot_owner_id;

    if (contactOwnerId !== dealOwnerId) {
      await hubspotClient.crm.deals.basicApi.update(event.object.objectId, {
        properties: { hubspot_owner_id: contactOwnerId }
      });
      callback({ outputFields: { result: 'ownerUpdated' } });
    } else {
      callback({ outputFields: { result: 'ownerAlreadyMatching' } });
    }
  } catch (error) {
    console.error('Error:', error);
    callback({ outputFields: { result: 'error' } });
  }
};

