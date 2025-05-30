const DEDUPE_PROPERTY = 'phone';
const hubspot = require('@hubspot/api-client');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.main = async (event, callback) => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.SECRET_NAME // Your api key secret
  });

  const mergedContacts = new Set();

  const mergeDuplicates = async (enrolledContactId) => {
    if (mergedContacts.has(enrolledContactId)) return;

    mergedContacts.add(enrolledContactId);
    let currentContactId = enrolledContactId;
    let searchResults;

    do {
      const contactResult = await hubspotClient.crm.contacts.basicApi.getById(currentContactId, [DEDUPE_PROPERTY]);
      const dedupePropValue = contactResult.properties[DEDUPE_PROPERTY];

      searchResults = await hubspotClient.crm.contacts.searchApi.doSearch({
        filterGroups: [{
          filters: [{
            propertyName: DEDUPE_PROPERTY,
            operator: 'EQ',
            value: dedupePropValue
          }]
        }]
      });

      const duplicateContactIds = searchResults.results
        .map(object => object.id)
        .filter(vid => Number(vid) !== Number(currentContactId) && !mergedContacts.has(vid));

      for (const dupContactId of duplicateContactIds) {
        try {
          await hubspotClient.apiRequest({
            method: 'POST',
            path: `/contacts/v1/contact/merge-vids/${currentContactId}`,
            body: { vidToMerge: dupContactId }
          });

          mergedContacts.add(dupContactId);
          currentContactId = dupContactId;
        } catch (error) {
          if (error.code === 429) {
            await delay(2000);
            await mergeDuplicates(enrolledContactId);
          } else {
            throw error;
          }
        }
      }
    } while (searchResults.total > 1);
  };

  await mergeDuplicates(event.object.objectId);
};
