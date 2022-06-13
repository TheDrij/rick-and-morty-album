export interface ICharacter extends IResourceBase {
    id: number
    status: 'Dead' | 'Alive' | 'unknown'
    species: string
    type: string
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
    image: string
}

export interface IResourceBase {
    id: number
    name: string
    url: string
    created: string
  }
