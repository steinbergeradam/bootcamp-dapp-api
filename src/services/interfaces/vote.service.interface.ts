import { Vote } from "../../models/vote.model";

export interface IVoteService {
  castVote(vote: Vote): Promise<string>;
  getVotingPower(address: string): Promise<number>;
}