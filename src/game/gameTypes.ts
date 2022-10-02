import { GuideId } from "./utils/getGuideCopy"

export type TileData = { id: string; x: number; y: number; vorgId?: string }

export enum VorgType {
  Seed = "Seed",
  Collector = "Collector",
  Extractor = "Extractor",
  Colony = "Colony",
  Flower = "Flower",
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
  health: number
}

export enum ResourceType {
  Energy = "Energy",
  Compound = "Compound",
  Exotic = "Exotic",
  Seed = "Seed",
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
  guides: GuideId[]
  guideTarget: { x: number; y: number; withArrow: boolean }
  currentGuide: GuideId | null
  countdown: number
  turn: number
  score: number
}

export type GameEvent =
  | { type: "RESOURCE_DROP"; x: number; y: number; id: string }
  | {
      type: "RESOURCE_TILE_DROP"
      x: number
      y: number
      id: string
    }
  | {
      type: "GUIDE_CLOSED"
      x: number
      y: number
      id: string
    }
