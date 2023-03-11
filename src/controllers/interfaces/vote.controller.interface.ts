import { BigNumber } from "ethers";
import { Vote } from "../../models/vote.model";

export interface IVoteController {
  castVote(body: Vote): Promise<BigNumber>;
}