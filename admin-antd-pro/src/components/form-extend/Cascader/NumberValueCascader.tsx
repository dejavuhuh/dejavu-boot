import React from 'react';
import { Cascader } from 'antd';
import { CascaderOptionType } from 'antd/lib/cascader';
import { Arrays } from '@/utils/array';
import { Directory } from '@/models/global.d';

type CascaderValueType = number;

export interface NumberValueCascaderOptionType extends Directory<CascaderValueType> {}

// component props
interface NumberValueCascaderProps {
  dataSource: NumberValueCascaderOptionType[];
  value?: CascaderValueType;
  onChange?: (value: CascaderValueType) => void;
}

// type converter
function convert(source: NumberValueCascaderOptionType): CascaderOptionType {
  return {
    value: source.id?.toString(),
    label: source.name,
    children: source.children?.map((child) => convert(child)),
  };
}

// iterate dataSource and use callback fn on each one
function iterate(
  iterator: NumberValueCascaderOptionType[],
  doWithEach: (each: NumberValueCascaderOptionType) => void,
) {
  iterator.forEach((parent) => {
    doWithEach(parent);
    if (parent.children) {
      iterate(parent.children, doWithEach);
    }
  });
}

const NumberValueCascader: React.FC<NumberValueCascaderProps> = (props) => {
  const { dataSource, value, onChange } = props;
  const options = dataSource.map((each) => convert(each));
  const mapIdToSelf: NumberValueCascaderOptionType[] = [];
  function doWithEach(each: NumberValueCascaderOptionType) {
    mapIdToSelf[each.id] = each;
  }
  iterate(dataSource, doWithEach);
  const defaultValue: string[] = [];
  if (value) {
    let currentNode = mapIdToSelf[value];
    if (currentNode) {
      defaultValue.unshift(currentNode.id.toString());
      while (currentNode.parentId) {
        currentNode = mapIdToSelf[currentNode.parentId];
        defaultValue.unshift(currentNode.id.toString());
      }
    }
  }

  return (
    <Cascader
      options={options}
      defaultValue={defaultValue}
      onChange={(values) => {
        // eslint-disable-next-line no-unused-expressions
        onChange && onChange(Number(Arrays.lastOf(values)));
      }}
      changeOnSelect
    />
  );
};

export default NumberValueCascader;
