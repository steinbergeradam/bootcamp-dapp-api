import { BigNumber, ethers } from "ethers";
import * as tokenJson from "../../assets/MyToken.json";
import * as ballotJson from "../../assets/Ballot.json";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BaseService {
    constructor(private configService: ConfigService) {}

    protected connectToWallet(privateKey: string): ethers.Wallet {
        const provider = ethers.getDefaultProvider('goerli');
        const wallet = new ethers.Wallet(privateKey, provider);
        return wallet.connect(provider);
    }

    protected buildTokenContract(): ethers.Contract {
        const tokenContractOwnerPrivateKey = this.configService.get<string>('TOKEN_CONTRACT_OWNER_PRIVATE_KEY');
        const signer = this.connectToWallet(tokenContractOwnerPrivateKey);
        const tokenContract = new ethers.Contract(
            this.configService.get<string>('TOKEN_CONTRACT_ADDRESS'),
            tokenJson.abi,
            signer
        );
        console.log(`Connect to token contract ${tokenContract.address}`);
        return tokenContract;
    }

    protected buildBallotContract(): ethers.Contract {
        const ballotContractOwnerPrivateKey = this.configService.get<string>('BALLOT_CONTRACT_OWNER_PRIVATE_KEY');
        const signer = this.connectToWallet(ballotContractOwnerPrivateKey);
        const ballotContract = new ethers.Contract(
            this.configService.get<string>('BALLOT_CONTRACT_ADDRESS'),
            ballotJson.abi,
            signer
        );
        console.log(`Connect to ballot contract ${ballotContract.address}`);
        return ballotContract;
    }

    protected convertStringArrayToBytes32(array: string[]) {
        return array.map((element, index) => { return ethers.utils.formatBytes32String(element) });
    }
}