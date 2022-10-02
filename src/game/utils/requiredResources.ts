import { VorgType, ResourceType } from "../gameTypes"

export type ConstructedVorgType = Exclude<VorgType, VorgType.Seed>

const requiresMappedToType: Record<
  ConstructedVorgType,
  { type: ResourceType; amount: number }[]
> = {
  [VorgType.Collector]: [{ type: ResourceType.Compound, amount: 1 }],
  [VorgType.Extractor]: [{ type: ResourceType.Energy, amount: 1 }],
  [VorgType.Colony]: [
    { type: ResourceType.Energy, amount: 1 },
    { type: ResourceType.Compound, amount: 1 },
  ],
  [VorgType.Flower]: [
    { type: ResourceType.Exotic, amount: 1 },
    { type: ResourceType.Energy, amount: 1 },
  ],
}

export const getRequiresByType = (type: ConstructedVorgType) =>
  requiresMappedToType[type]
