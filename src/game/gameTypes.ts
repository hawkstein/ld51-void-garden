export type TileData = { id: string; x: number; y: number }

export enum VorgType {
  Seed = "Seed",
  Collector = "Collector",
  Extractor = "Extractor",
}

export interface ResourceSpawn {
  offsetX: number
  offsetY: number
  type: ResourceType
}

export type VorgData = {
  id: string
  x: number
  y: number
  type: VorgType
  resourceSpawns: ResourceSpawn[]
  storedResources?: { type: ResourceType; amount: number }[]
}

export enum ResourceType {
  Energy = "Energy",
  Compound = "Compound",
  Exotic = "Exotic",
}

export type ResourceData = {
  id: string
  x: number
  y: number
  type: ResourceType
  parent?: string
}

export type GameContext = {
  tiles: TileData[]
  vorgs: VorgData[]
  resources: ResourceData[]
  tileResources: ResourceData[]
}

export type GameEvent =
  | { type: "RESOURCE_DROP"; x: number; y: number; id: string }
  | {
      type: "RESOURCE_TILE_DROP"
      x: number
      y: number
      id: string
    }
