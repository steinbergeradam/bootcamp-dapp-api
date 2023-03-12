export interface IDeployService {
  deployContracts(proposals: string[]): Promise<string[]>;
}