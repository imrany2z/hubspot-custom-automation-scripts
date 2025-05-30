const DEDUPE_PROPERTY = 'phone';
const hubspot = require('@hubspot/api-client');

exports.main = (event, callback) => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.SECRET_NAME // Your api key secret
  });

  hubspotClient.crm.contacts.basicApi
    .getById(event.object.objectId, [DEDUPE_PROPERTY])
    .then(contactResult => {
      let dedupePropValue = contactResult.properties[DEDUPE_PROPERTY];

      hubspotClient.crm.contacts.searchApi.doSearch({
        filterGroups: [{
          filters: [{
            propertyName: DEDUPE_PROPERTY,
            operator: 'EQ',
            value: dedupePropValue
          }]
        }]
      }).then(searchResults => {
        let idsToMerge = searchResults.results.map(object => object.id)
          .filter(vid => Number(vid) !== Number(event.object.objectId));

        if (idsToMerge.length === 0) {
          console.log('No match found, nothing to merge');
          return;
        } else if (idsToMerge.length > 1) {
          throw new Error("Ambiguous merge; more than one matching contact");
        }

        let idToMerge = idsToMerge[0];
        hubspotClient.apiRequest({
          method: 'POST',
          path: `/contacts/v1/contact/merge-vids/${idToMerge}`,
          body: { vidToMerge: event.object.objectId }
        }).then(() => {
          console.log('Contacts merged!');
        });
      });
    });
};
