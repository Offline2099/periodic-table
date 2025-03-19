import { Property } from '../constants/chemistry/element-properties';

export interface ElementProperty {
  id: Property;
  name: string;
  unit: string;
  description: string[];
  value?: string | number;
}