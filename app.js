const { ethers } = require("ethers");
const contractCode = require("./bin/TokensContract.json");
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

  if (contract.deploymentTransaction) {
    const nonce = await provider.getTransactionCount(wallet.address);

    const tx = await wallet.sendTransaction({
      to: contract.address,
      value: ethers.parseEther("1.0"),
      nonce: nonce + 1,
    });

    await tx.wait();

    console.log(`Transferência implementada: Contrato recebeu ${ethers.utils.formatEther(newValue)} ETH.`);
    
    const saldoContrato = await provider.getBalance(contract.address);
    console.log(`Saldo atual do contrato: ${ethers.utils.formatEther(saldoContrato)} ETH.`);
  } else {
    console.error("O contrato não foi implantado com sucesso.");
  }
}

deploy();
