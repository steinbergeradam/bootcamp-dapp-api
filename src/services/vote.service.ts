import { BigNumber, ethers } from "ethers";
import { Vote } from "../models/vote.model";
import { BaseService } from "./abstract/base.service";
import { IVoteService } from './interfaces/vote.service.interface';

export class VoteService extends BaseService implements IVoteService {
  async castVote(vote: Vote): Promise<string> {
    // connect to ballot contract
    const ballotContract = this.buildBallotContract();

    // connect to voter wallet
    const voterWallet = this.connectToWallet(vote.voterPrivateKey);
    console.log(`Got voter ${voterWallet.address}`);

    // connect voter to ballot contract
    ballotContract.connect(voterWallet);

    // cast vote
    const voteTx = await ballotContract.vote(
      BigNumber.from(vote.proposalNumber.toString()),
      BigNumber.from(vote.numberOfVotes.toString())
    );
    const voteReceipt = await voteTx.wait();
    console.log(
      `${voterWallet.address} voted at block ${voteReceipt.blockNumber} with the txID ${voteReceipt.transactionHash}`
    );

    // get voting power spent
    const votingPowerSpent = await ballotContract.votingPowerSpent(voterWallet.address);
    console.log(
      `wallet ${voterWallet.address} has spent ${votingPowerSpent} voting power`
    );
    return ethers.utils.formatEther(votingPowerSpent);
  }
}
