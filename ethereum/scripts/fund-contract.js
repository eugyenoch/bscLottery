const { ethers } = require("ethers");
const fs = require("fs");
const Randomness = artifacts.require("Randomness");
const Lottery = artifacts.require("Lottery");
const payment = process.env.TRUFFLE_CL_BOX_PAYMENT || "1000000000000000000" || "10000000000000000000000" || "10000";
let raw = fs.readFileSync("../abis/LinkToken.json");
const ABI = JSON.parse(raw);

module.exports = async function(callback) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  // Hard coded for ropsten
  const linkAddress = "0x9EA8d6272B724AfB813A9E7C4eaF07C7aF4FE996";
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const linkContract = new ethers.Contract(linkAddress, ABI, wallet);

  var randomnessContract = await Randomness.deployed();
  var lotteryContract = await Lottery.deployed();
  console.log(lotteryContract.address);
  console.log(randomnessContract.address);

  await linkContract
    .transfer(randomnessContract.address, payment)
    .then(function(tx) {
      console.log(tx);
    });
  callback();
};
