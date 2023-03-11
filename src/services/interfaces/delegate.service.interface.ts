import { Delegation } from "../../models/delegation.model";

export interface IDelegateService {
  delegateVote(delegation: Delegation): Promise<string>;
}