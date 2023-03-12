import { ethers } from "ethers";
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

    // connect voter to token contract
    tokenContract.connect(delegatorWallet);

    // delegate the vote
    const delegateTx = await tokenContract.delegate(delegation.recipientAddress);
    await delegateTx.wait();

    // get delegates
    const delegates = await tokenContract.delegates(delegatorWallet.address);
    console.log(`Delegates: ${delegates}`);
    return delegates;
  }

  async getAllowance(from: string, to: string): Promise<number> {
    // connect to the token contract
    const tokenContract = this.buildTokenContract();
    
    // get allowance
    const allowanceBN = await tokenContract.allowance(from, to);
    const allowanceString = ethers.utils.formatEther(allowanceBN);
    const allowanceNumber = parseFloat(allowanceString);
    console.log(`Allowance: ${allowanceNumber}`);
    return allowanceNumber;
  }
}
