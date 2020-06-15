import React from 'react';
import { Switch } from 'antd';

type SwitchValueType = boolean;

export interface BasicSwitchProps {
  value?: SwitchValueType;
  onChange?: (value: SwitchValueType) => void;
}

interface BooleanValueSwitchProps extends BasicSwitchProps {
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
}

const BooleanValueSwitch: React.FC<BooleanValueSwitchProps> = (props) => {
  const { value, onChange, ...restProps } = props;
  return (
    <Switch
      defaultChecked={value}
      onChange={(checked) => {
        // eslint-disable-next-line no-unused-expressions
        onChange && onChange(checked);
      }}
      {...restProps}
    />
  );
};

export default BooleanValueSwitch;
