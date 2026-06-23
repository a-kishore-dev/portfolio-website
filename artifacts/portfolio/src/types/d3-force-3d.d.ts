declare module "d3-force-3d" {
  export * from "d3-force";

  export function forceSimulation<NodeDatum extends object = any, LinkDatum extends object = any>(
    nodes?: NodeDatum[],
    numDimensions?: number
  ): any;
}
