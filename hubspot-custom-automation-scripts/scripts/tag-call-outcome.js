const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.SECRET_NAME // Your api key secret
  });

  const properties = {
    "hs_call_disposition": "530045de-48f2-49e3-b8a1-a5f4b0e49fca"
  };

  const callId = event.inputFields['call_record_id'];
  const timeofcall = parseInt(event.inputFields['timeofcall']);
  const estTime = new Date(timeofcall);
  estTime.setUTCHours(estTime.getUTCHours() - 5);
  const hourOfDay = estTime.getHours();

  if (hourOfDay < 9 || hourOfDay >= 17) {
    try {
      await hubspotClient.crm.objects.calls.basicApi.update(callId, { properties });
    } catch (e) {
      console.error("Error updating call outcome:", e);
    }
  }
};
