import { BigNumber, ethers } from "ethers";
import { Minter } from "../models/minter.model";
import { BaseService } from "./abstract/base.service";
import { IMintService } from './interfaces/mint.service.interface';

export class MintService extends BaseService implements IMintService {
  async mintTokens(minter: Minter): Promise<BigNumber> {
    // connect to the token contract
    const tokenContract = this.buildTokenContract();

    // mint tokens for all accounts
    const mintTx = await tokenContract.mint(minter.accountAddress, minter.numberOfTokens);
    const mintTxReceipt = await mintTx.wait();
    
    // get token balance
    const tokenBalance = await tokenContract.balanceOf(minter.accountAddress);
    console.log(`${ethers.utils.formatEther(tokenBalance)} tokens minted for account: (${minter.accountAddress}) at block ${mintTxReceipt.blockNumber}`);
    return tokenBalance;
  }
}
