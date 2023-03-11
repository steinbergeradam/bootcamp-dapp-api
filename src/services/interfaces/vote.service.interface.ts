import { BigNumber } from "ethers";
import { Vote } from "../../models/vote.model";

export interface IVoteService {
  castVote(vote: Vote): Promise<BigNumber>;
}