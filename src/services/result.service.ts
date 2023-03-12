import { ethers } from "ethers";
import { BaseService } from "./abstract/base.service";
import { IResultService } from './interfaces/result.service.interface';

export class ResultService extends BaseService implements IResultService {
  async getWinningProposal(): Promise<string> {
    // connect to ballot contract
    const ballotContract = this.buildBallotContract();
    
    // get winning proposal
    const winningProposal = await ballotContract.winningProposal();
    const winningProposalNameBytes = await ballotContract.winnerName();
    const winningProposalName = ethers.utils.parseBytes32String(winningProposalNameBytes);
    console.log(`The Winner Proposal is ${winningProposal}: ${winningProposalName}`);
    return winningProposalName;
  }

  async getTransactionStatus(hash: string): Promise<string> {
    const tx = await this.generateProvider().getTransaction(hash);
    const txRecipt = await tx.wait();
    return txRecipt.status == 1 ? "Completed" : "Reverted";
  }

  getProviderNetwork(): string {
    return this.configService.get<string>('PROVIDER_NETWORK');
  }

  getTokenContractAddress(): string {
    return this.configService.get<string>('TOKEN_CONTRACT_ADDRESS');
  }
  
  getBallotContractAddress(): string {
    return this.configService.get<string>('BALLOT_CONTRACT_ADDRESS');
  }
}
