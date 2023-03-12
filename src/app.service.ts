import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigNumber, ethers } from 'ethers';
import * as tokenJson from "./assets/MyToken.json";

@Injectable()
export class AppService {
    constructor(protected configService: ConfigService) {}

    getContractAddress(): string {
        return this.configService.get<string>('CONTRACT_ADDRESS');
    }

    async getTotalSupply(): Promise<number> {
        // connect to the token contract
        const contract = this.buildContract();
    
        // get total supply
        const totalSupplyBN = await contract.totalSupply();
        const totalSupplyString = ethers.utils.formatEther(totalSupplyBN);
    
        // convert total supply and return
        const totalSupplyNumber = parseFloat(totalSupplyString);
        return totalSupplyNumber;
    }

    async getAllowance(from: string, to: string): Promise<number> {
        // connect to the token contract
        const contract = this.buildContract();
        
        // get allowance
        const allowanceBN = await contract.allowance(from, to);
        const allowanceString = ethers.utils.formatEther(allowanceBN);
        const allowanceNumber = parseFloat(allowanceString);
        console.log(`Allowance: ${allowanceNumber}`);
        return allowanceNumber;
      }

    async getTransactionStatus(hash: string): Promise<string> {
        const tx = await this.generateProvider().getTransaction(hash);
        const txRecipt = await tx.wait();
        return txRecipt.status == 1 ? "Completed" : "Reverted";
    }

    async mintTokens(address: string, tokens: number): Promise<string> {
        // connect to the token contract
        const contract = this.buildContract();
    
        // mint tokens for all accounts
        const mintTx = await contract.mint(
            address,
            BigNumber.from(
                ethers.utils.parseUnits(tokens.toString(), 18)
            )
        );
        const mintTxReceipt = await mintTx.wait();
        
        // get token balance
        const tokenBalance = await contract.balanceOf(address);
        const formattedTokenBalance = ethers.utils.formatEther(tokenBalance);
        console.log(`${formattedTokenBalance} tokens minted for account: (${address}) at block ${mintTxReceipt.blockNumber}`);
        return formattedTokenBalance;
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
}
