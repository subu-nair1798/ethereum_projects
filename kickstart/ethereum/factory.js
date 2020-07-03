import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json"

const contractAddress = "0x9F87B6f489aE16C98132699E7B9f537ce28Fe5f8"

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    contractAddress
);

export default instance;
