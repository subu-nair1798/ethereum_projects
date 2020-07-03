import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json"

const contractAddress = "0x7660C5d6c9845fBBc06fb8D003Ee8fb82c7AD0fc"

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    contractAddress
);

export default instance;
