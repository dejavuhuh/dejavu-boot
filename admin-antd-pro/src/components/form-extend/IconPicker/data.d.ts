export interface IconPickerProps {
  value?: IconPickerValueType;
  onChange?: (value?: IconPickerValueType) => void;
}

export interface IconPickerState {
  value?: IconPickerValueType;
  open: boolean;
}

export type IconPickerValueType = string;
