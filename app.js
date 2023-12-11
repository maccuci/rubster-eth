const ethers = require("ethers");
const contractCode = require("./bin/Main.json");
const dotenv = require("dotenv");

async function deploy() {
  dotenv.config();

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const pkey = process.env.PRIVATE_KEY ?? "";

  const wallet = new ethers.Wallet(pkey, provider);
  const factory = new ethers.ContractFactory(
    contractCode.abi,
    contractCode.bytecode,
    wallet
  );
  const contract = await factory.deploy();

  if (contract.deploymentTransaction()) {
    contract.on("Transfer", (from, to, value, event) => {
      let transferEvent = {
        from: from,
        to: to,
        value: value,
        eventData: event,
      };
    });
    
      contract.getAddress().then((address) => {
        console.log("O contrato foi implantado com sucesso em:", address);
      })
  } else {
    console.error("O contrato não foi implantado com sucesso.");
  }
}

deploy();
