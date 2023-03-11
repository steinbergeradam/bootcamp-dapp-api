import { BigNumber } from "ethers";
import { Minter } from "../../models/minter.model";

export interface IMintController {
  mintTokens(body: Minter): Promise<BigNumber>;
}