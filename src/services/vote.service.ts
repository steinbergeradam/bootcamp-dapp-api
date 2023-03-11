import { BigNumber } from "ethers";
import { Vote } from "../models/vote.model";
import { BaseService } from "./abstract/base.service";
import { IVoteService } from './interfaces/vote.service.interface';

export class VoteService extends BaseService implements IVoteService {
  async castVote(vote: Vote): Promise<BigNumber> {
    // connect to ballot contract
    const ballotContract = this.buildBallotContract();

    // connect to voter wallet
    const voterWallet = this.connectToWallet(vote.voterPrivateKey);
    console.log(`Got voter ${voterWallet.address}`);

    // cast vote
    const voteTx = await ballotContract.vote(vote.proposalNumber, vote.numberOfVotes);
    const voteReceipt = await voteTx.wait();
    console.log(
      `${voterWallet.address} voted at block ${voteReceipt.blockNumber} with the txID ${voteReceipt.transactionHash}`
    );

    // get voting power spent
    const votingPowerSpent = await ballotContract.votingPowerSpent(voterWallet.address);
    console.log(
      `wallet ${voterWallet.address} has spent ${votingPowerSpent} voting power`
    );
    return votingPowerSpent;
  }
}
