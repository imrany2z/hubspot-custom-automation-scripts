const l1_loan__ = 'l1_loan__';
const hubspot = require('@hubspot/api-client');

exports.main = (event, callback) => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.SECRET_NAME // Your api key secret
  });

  hubspotClient.crm.tickets.basicApi.getById(event.object.objectId, [l1_loan__])
    .then(ticketResults => {
      let loanID = ticketResults.properties[l1_loan__];

      if (!loanID) {
        console.log('l1_loan__ is unknown');
        callback({ outputFields: { result: 'l1LoanUnknown' } });
        return;
      }

      console.log(`Looking for loan id in deal ${l1_loan__} = ${loanID}`);
      hubspotClient.crm.deals.searchApi.doSearch({
        filterGroups: [{
          filters: [{
            propertyName: 'loan_id',
            operator: 'EQ',
            value: loanID
          }]
        }]
      }).then(searchResults => {
        let idsToAssociate = searchResults.results.map(object => object.id)
          .filter(vid => Number(vid) !== Number(event.object.objectId));

        if (idsToAssociate.length === 0) {
          callback({ outputFields: { result: 'noMatchingDeal' } });
          return;
        } else if (idsToAssociate.length > 1) {
          callback({ outputFields: { result: 'ambiguousAssociate', ambiguousIds: idsToAssociate } });
          return;
        }

        let idToAssociate = idsToAssociate[0];
        console.log(`Associating ticket ${event.object.objectId} with deal ${idToAssociate}`);
        hubspotClient.apiRequest({
          method: 'PUT',
          path: `/crm/v4/objects/ticket/${event.object.objectId}/associations/default/deal/${idToAssociate}`
        }).then(() => {
          callback({ outputFields: { result: 'l1LoanKnown' } });
        });
      });
    })
    .catch(error => {
      console.error(error);
      callback({ outputFields: { result: 'error' } });
    });
};
