export interface IResultController {
  getWinningProposal(): Promise<string>;
  getTransactionStatus(hash: string): Promise<string>;
  getProviderNetwork(): string;
  getTokenContractAddress(): string;
  getBallotContractAddress(): string;
}