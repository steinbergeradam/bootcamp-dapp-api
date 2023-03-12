export interface IDeployController {
  deployContracts(body: string[]): Promise<string[]>;
}