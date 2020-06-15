import React from 'react';
import BooleanValueSwitch, { BasicSwitchProps } from './BooleanValueSwitch';

const YesOrNoSwitch: React.FC<BasicSwitchProps> = (props) => {
  return <BooleanValueSwitch {...props} checkedChildren="是" unCheckedChildren="否" />;
};

export default YesOrNoSwitch;
