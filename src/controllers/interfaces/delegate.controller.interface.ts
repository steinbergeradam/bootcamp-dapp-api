import { Delegation } from "../../models/delegation.model";

export interface IDelegateController {
  delegateVote(delegation: Delegation): Promise<string>;
  getAllowance(from: string, to: string): Promise<number>;
}