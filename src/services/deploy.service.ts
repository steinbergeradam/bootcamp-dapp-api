import { ContractFactory, ethers } from "ethers";
import { BaseService } from "./abstract/base.service";
import { IDeployService } from './interfaces/deploy.service.interface';
import * as tokenJson from "../assets/MyToken.json";
import * as ballotJson from "../assets/Ballot.json";

export class DeployService extends BaseService implements IDeployService {
  async deployContracts(proposals: string[]): Promise<string[]> {
    // deploy token contract
    const tokenContractOwnerPrivateKey = this.configService.get<string>('TOKEN_CONTRACT_OWNER_PRIVATE_KEY');
    const tokenContractOwnerWallet = this.connectToWallet(tokenContractOwnerPrivateKey);
    const tokenContractFactory = new ContractFactory(
      tokenJson.abi,
      tokenJson.bytecode,
      tokenContractOwnerWallet
    );
    const tokenContract = await tokenContractFactory.deploy();
    const tokenContractTxReceipt = await tokenContract.deployTransaction.wait();
    console.log(`Deployed token contract at address ${tokenContract.address}`);

    // generate inputs for ballot contract
    const proposalsByte32String = this.convertStringArrayToBytes32(proposals);
    const tokenContractAddress = tokenContract.address;
    const tokenContractBlockNumber = tokenContractTxReceipt.blockNumber;

    // deploy ballot contract
    const ballotContractOwnerPrivateKey = this.configService.get<string>('BALLOT_CONTRACT_OWNER_PRIVATE_KEY');
    const ballotContractOwnerWallet = this.connectToWallet(ballotContractOwnerPrivateKey);
    const ballotContractFactory = new ContractFactory(
      ballotJson.abi,
      ballotJson.bytecode,
      ballotContractOwnerWallet
    );
    const ballotContract = await ballotContractFactory.deploy(
      proposalsByte32String,
      tokenContractAddress,
      tokenContractBlockNumber
    );
    await ballotContract.deployTransaction.wait();
    const ballotContractAddress = ballotContract.address;
    console.log(`Deployed ballot contract at address ${ballotContract.address}`);

    // return contract addresses
    const deploymentAddresses = [
      tokenContractAddress,
      ballotContractAddress
    ];
    return deploymentAddresses;
  }
}
