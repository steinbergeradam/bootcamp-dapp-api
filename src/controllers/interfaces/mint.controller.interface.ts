import { Minter } from "../../models/minter.model";

export interface IMintController {
  mintTokens(body: Minter): Promise<string>;
}