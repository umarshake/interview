const express = require('express');

var app = express();


const adsSdk = require('facebook-nodejs-business-sdk');
const accessToken = 'EAAHUV0Dh80oBAInrNIo5akPB5Oz8oGr8fLw17PrniXqVdswxCNiLxo9rZBhcaSnVanP3fWNltdg1du7jDZB1rxpLQO4egqB6qyEL9w4fbv37aVMrZCSS8nNG0bfn0CYvv8gNfqLfdpt8Y7ismwaCifiDILDYyNZC4MVdnThxDMmQZBY3IHh3S';
const api = adsSdk.FacebookAdsApi.init(accessToken);
const AdAccount = adsSdk.AdAccount;
const account = new AdAccount('act_259368835091716');
const app_id = '514946192503626';
const Campaign = adsSdk.Campaign;


app.listen(4000,function(req,res){
	console.log("listening");
	console.log(account.id);
});

app.get('/',function(req,res){

account
  .read([AdAccount.Fields.name])
  .then((account) => {
  	console.log(account);
    res.send(account);
  })
  .catch((error) => {
  	console.log("Errors===>",error);
  });

});


app.get('/get_campaign',function(req,res){


	account
		.getCampaigns([Campaign.Fields.name])
		.then((campaigns) => {

			console.log(campaigns);
			res.send(campaigns);
		})
		.catch((err) => {
			console.log("Error==>",err);
		});

// let fields, params;
// fields = [
//   'name',
//   'objective',
// ];
// params = {
//   'effective_status' : ['ACTIVE','PAUSED'],
// };
// const campaignss = account.getCampaigns(
//   fields,
//   params
// );
// logApiCallResult('campaignss api call complete.', campaignss);


});

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
    console.log('Data:' + JSON.stringify(data));
  
};

app.get('/add_campaign',function(req,res){
	console.log("adding add_campaign");

	account
  .createCampaign(
    [],
    {
      [Campaign.Fields.name]: 'Umar likes campaign',
      [Campaign.Fields.status]: Campaign.Status.paused,
      [Campaign.Fields.objective]: Campaign.Objective.page_likes,
      [Campaign.Fields.special_ad_category] : "NONE",
    }
  )
  .then((campaign) => {
  	res.send("Created successfully");
  })
  .catch((error) => {
  	console.log(error);
  });

});

app.get('/update_campaign/:camp_id',function(req,res){
  console.log("update add_campaign");
  const campaignId = (req.params.camp_id);
  new Campaign(campaignId, {
    [Campaign.Fields.id]: Campaign.id,
    [Campaign.Fields.name]: 'Campaign - Updated' })
    .update();

    res.send("Updated the campaign");

});

app.get('/delete_campaign/:camp_id',function(req,res){
  
  
  const campaignId = (req.params.camp_id);
  new Campaign(campaignId).delete(); 

  res.send("Campaign deleted");

});

