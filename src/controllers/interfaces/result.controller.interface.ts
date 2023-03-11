export interface IResultController {
  getWinningProposal(): Promise<string>;
}