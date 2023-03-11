export interface IResultService {
  getWinningProposal(): Promise<string>;
}