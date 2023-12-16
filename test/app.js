const { ethers } = require("ethers");
const contractCode = require("../bin/TokensContract.json");
const { networks } = require("../truffle");

const dotenv = require("dotenv");

async function deploy() {
  dotenv.config();
  const dev = networks.development;

  const provider = new ethers.JsonRpcProvider(`http://${dev.host}:${dev.port}`);
  const pkey = process.env.PRIVATE_KEY ?? "";

  const wallet = new ethers.Wallet(pkey, provider);
  const factory = new ethers.ContractFactory(
    contractCode.abi,
    contractCode.bytecode,
    wallet
  );
  const contract = await factory.deploy();

  if (contract.deploymentTransaction) {
    const nv = ethers.parseEther("1.0");
    const nonce = await provider.getTransactionCount(wallet.address);

    const tx = await wallet.sendTransaction({
      to: contract.address,
      value: ethers.parseEther("1.0"),
      nonce: nonce + 1,
    });

    await tx.wait();

    console.log(
      `Transferência implementada: Contrato recebeu ${ethers.formatEther(
        nv
      )} ETH.`
    );
  } else {
    console.error("O contrato não foi implantado com sucesso.");
  }
}

deploy();
