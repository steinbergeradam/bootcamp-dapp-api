import { Delegation } from "../models/delegation.model";
import { BaseService } from "./abstract/base.service";
import { IDelegateService } from './interfaces/delegate.service.interface';

export class DelegateService extends BaseService implements IDelegateService {
  async delegateVote(delegation: Delegation): Promise<string> {
    // connect to the token contract
    const tokenContract = this.buildTokenContract();

    // connect to delegator wallet
    const delegatorWallet = this.connectToWallet(delegation.senderPrivateKey);
    console.log(`Got delegator ${delegatorWallet.address}`);

    // delegate the vote
    const delegateTx = await tokenContract.delegate(delegation.recipientAddress);
    await delegateTx.wait();

    // get delegates
    const delegates = await tokenContract.delegates(delegatorWallet.address);
    console.log(`Delegates: ${delegates}`);
    return delegates;
  }
}
