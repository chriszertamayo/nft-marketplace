export type Trait = "attack" | "health" | "speed"

export type NFtAttribute = {
    trait_type: Trait
    value: string
}

export type NftMeta = {
    name: string
    description: string
    image: string
    attributes: NFtAttribute[]
}
