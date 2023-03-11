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
}
