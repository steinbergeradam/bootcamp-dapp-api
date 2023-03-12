export interface IResultService {
  getWinningProposal(): Promise<string>;
  getTransactionStatus(hash: string): Promise<string>;
  getProviderNetwork(): string;
  getTokenContractAddress(): string;
  getBallotContractAddress(): string;
}