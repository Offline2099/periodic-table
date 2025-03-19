import { NUMBER_OF_GROUPS, F_BLOCK_SERIES_LENGTH } from './chemistry/table-parameters';

export enum VisibleRange {
  mobile = NUMBER_OF_GROUPS / 6,
  tablet = NUMBER_OF_GROUPS / 3,
  desktop = NUMBER_OF_GROUPS / 2,
  default = NUMBER_OF_GROUPS
}

export enum FBlockRowLength {
  mobile = F_BLOCK_SERIES_LENGTH / 7,
  tablet = F_BLOCK_SERIES_LENGTH / 2,
  desktop = F_BLOCK_SERIES_LENGTH
}
