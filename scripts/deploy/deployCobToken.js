// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { BigNumber } = require("ethers");
const hre = require("hardhat");
const { addresses } = require("../addresses");
const ethers = hre.ethers;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // constructor args


  // We get the contract to deploy
  const CobToken = await ethers.getContractFactory("BobToken");

  const gnosisSafe = addresses.cornTreasury;

  const cobToken = await CobToken.deploy("0xEb0529fF4DE9d8458EDfbE0E52386193A166b335");
  
  const cob = await cobToken.deployed();


  console.log(`
    Cob Token deployed at ${cob.address}
  `);

  await new Promise(r => setTimeout(r, 20000));


  await hre.run("verify:verify", {
    address: cob.address,
    constructorArguments: [
      addresses.cornTreasury
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



