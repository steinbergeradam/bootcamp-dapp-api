import { BigNumber } from "ethers";
import { Minter } from "../../models/minter.model";

export interface IMintService {
  mintTokens(minter: Minter): Promise<BigNumber>;
}