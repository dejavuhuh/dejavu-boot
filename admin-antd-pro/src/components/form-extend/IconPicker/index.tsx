/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import IconSelectionTabs from './components/IconSelectionTabs';
import { IconPickerProps, IconPickerState, IconPickerValueType } from './data.d';

/**
 * IconPicker组件（图标选择器）
 * 用法：包裹在<Form.Item></Form.Item>标签内
 *
 * @example
 * <Form.Item name="icon" label="图标">
 *    <IconPicker />
 * </Form.Item>
 * @param value value of form item
 * @param onChange onchange callback function of form item
 */
const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  // state
  const [state, setState] = useState<IconPickerState>({ open: false, value });

  // refs
  let self: Select<IconPickerValueType> | null;
  let divWrapper: HTMLDivElement | null;

  // 隐藏下拉菜单
  const hideDropdownMenu = (callbackValue?: IconPickerValueType) => {
    const actualValue = callbackValue === '' ? undefined : callbackValue;
    setState({
      open: false,
      value: callbackValue === undefined ? state.value : actualValue,
    });
    return actualValue;
  };

  // 展开下拉菜单
  const showDropdownMenu = () => {
    setState({
      ...state,
      open: true,
    });
  };

  // 选中图标时回调
  const handleSelect = (val: IconPickerValueType) => {
    const actualValue = hideDropdownMenu(val);
    self && self.blur();
    onChange && onChange(actualValue);
  };

  // effect
  useEffect(() => {
    // 当鼠标点击下拉菜单外的区域时，隐藏下拉菜单
    const outsideOfSelfClickHandler = () => {
      if (divWrapper !== null) {
        hideDropdownMenu();
      }
    };
    if (state.open) {
      document.addEventListener('click', outsideOfSelfClickHandler);
    }
    return () => {
      document.removeEventListener('click', outsideOfSelfClickHandler);
    };
  }, [state.open]);

  return (
    <div
      ref={(divRef) => {
        divWrapper = divRef;
      }}
      onClick={showDropdownMenu}
    >
      <Select<IconPickerValueType>
        ref={(selectRef) => {
          self = selectRef;
        }}
        defaultValue={value}
        notFoundContent={<IconSelectionTabs onSelect={handleSelect} defaultSelectedValue={value} />}
        suffixIcon={<SettingOutlined />}
        {...state}
      />
    </div>
  );
};

export default IconPicker;
