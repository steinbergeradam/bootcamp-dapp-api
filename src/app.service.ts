import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigNumber, ContractFactory, ethers } from 'ethers';
import * as tokenJson from "./assets/MyToken.json";
import * as ballotJson from "./assets/Ballot.json";

@Injectable()
export class AppService {
    constructor(protected configService: ConfigService) {}

    getContractAddress(): string {
        return this.configService.get<string>('CONTRACT_ADDRESS');
    }

    getBallotAddress(): string {
        return this.configService.get<string>('BALLOT_ADDRESS');
    }

    async getTotalSupply(): Promise<{total: number}> {
        // connect to the token contract
        const contract = this.buildContract();
    
        // get total supply
        const totalSupplyBN = await contract.totalSupply();
        const totalSupplyString = ethers.utils.formatEther(totalSupplyBN);
    
        // convert total supply and return
        const totalSupplyNumber = parseFloat(totalSupplyString);
        return {total: totalSupplyNumber};
    }

    async getTransactionStatus(hash: string): Promise<{status: string}> {
        const tx = await this.generateProvider().getTransaction(hash);
        const txRecipt = await tx.wait();
        const status = txRecipt.status == 1 ? "Completed" : "Reverted";
        return {status: status};
    }

    async requestTokens(address: string, amount: number): Promise<{balance: string}> {
        // connect to the token contract
        const contract = this.buildContract();
    
        // mint tokens for all accounts
        const mintTx = await contract.mint(
            address,
            BigNumber.from(
                ethers.utils.parseUnits(amount.toString(), 18)
            )
        );
        const mintTxReceipt = await mintTx.wait();
        
        // get token balance
        const tokenBalance = await contract.balanceOf(address);
        const formattedTokenBalance = ethers.utils.formatEther(tokenBalance);
        console.log(`${formattedTokenBalance} tokens minted for account: (${address}) at block ${mintTxReceipt.blockNumber}`);
        return {balance: formattedTokenBalance};
    }

    async deployBallot(proposals: string[]): Promise<{address: string, blockNumber: number}> {
        // generate inputs for ballot contract
        const proposalsByte32String = this.convertStringArrayToBytes32(proposals);
        const tokenContractAddress = this.configService.get<string>('CONTRACT_ADDRESS');
    
        // deploy ballot contract
        const ballotContractOwnerPrivateKey = this.configService.get<string>('CONTRACT_PRIVATE_KEY');
        const ballotContractOwnerWallet = this.connectToWallet(ballotContractOwnerPrivateKey);
        const ballotContractFactory = new ContractFactory(
            ballotJson.abi,
            ballotJson.bytecode,
            ballotContractOwnerWallet
        );
        const latestBlock = await this.generateProvider().getBlock("latest");
        const ballotContract = await ballotContractFactory.deploy(
            proposalsByte32String,
            tokenContractAddress,
            latestBlock.number
        );
        await ballotContract.deployTransaction.wait();
        const ballotContractAddress = ballotContract.address;
        console.log(`Deployed ballot contract at address ${ballotContract.address}`);
    
        // return contract addresses
        const deployment = {
            address: ballotContractAddress,
            blockNumber: latestBlock.number
        };
        return deployment;
    }

    async getWinningProposal(): Promise<{winner: string}> {
        // connect to ballot contract
        const ballotContract = this.buildBallot();
    
        // get winning proposal
        const winningProposal = await ballotContract.winningProposal();
        const winningProposalNameBytes = await ballotContract.winnerName();
        const winningProposalName = ethers.utils.parseBytes32String(winningProposalNameBytes);
        console.log(`The Winner Proporsal is ${winningProposal}: ${winningProposalName}`);
        return {winner: winningProposalName};
      }

    private generateProvider(): ethers.providers.AlchemyProvider {
        return new ethers.providers.AlchemyProvider(
            this.configService.get<string>('PROVIDER_NETWORK'),
            this.configService.get<string>('ALCHEMY_API_KEY')
        );
    }

    private connectToWallet(privateKey: string): ethers.Wallet {
        const provider = this.generateProvider();
        const wallet = new ethers.Wallet(privateKey, provider);
        return wallet.connect(provider);
    }

    private buildContract(): ethers.Contract {
        const privateKey = this.configService.get<string>('CONTRACT_PRIVATE_KEY');
        const signer = this.connectToWallet(privateKey);
        const contract = new ethers.Contract(
            this.configService.get<string>('CONTRACT_ADDRESS'),
            tokenJson.abi,
            signer
        );
        console.log(`Connect to contract ${contract.address}`);
        return contract;
    }

    private buildBallot(): ethers.Contract {
        const privateKey = this.configService.get<string>('CONTRACT_PRIVATE_KEY');
        const signer = this.connectToWallet(privateKey);
        const contract = new ethers.Contract(
            this.configService.get<string>('BALLOT_ADDRESS'),
            ballotJson.abi,
            signer
        );
        console.log(`Connect to ballot ${contract.address}`);
        return contract;
    }

    private convertStringArrayToBytes32(array: string[]) {
        return array.map((element, index) => { return ethers.utils.formatBytes32String(element) });
    }
}
