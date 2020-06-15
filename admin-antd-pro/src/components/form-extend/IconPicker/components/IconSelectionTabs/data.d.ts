import { IconPickerValueType } from '@/components/form-extend/IconPicker/data.d';

export interface IconSelectionTabsProps {
  onSelect: (value: IconPickerValueType) => void;
  defaultSelectedValue?: IconPickerValueType;
}

export interface IconSelectionTabsState {
  mapIndexToActive: boolean[];
  currentSelectedValue: IconPickerValueType;
}

export enum IconType {
  Direction = 'DIRECTION',
  Symbol = 'SYMBOL',
  Edit = 'EDIT',
  Data = 'DATA',
  Site = 'SITE',
  Logo = 'LOGO',
}
