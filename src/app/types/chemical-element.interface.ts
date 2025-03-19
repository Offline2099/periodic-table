export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  group: number;
  period: number;
  discovery: number;
  weight: number;
  density: number;
  melt: number;
  boil: number;
  noImage?: boolean;
  noImageText?: string;
}
