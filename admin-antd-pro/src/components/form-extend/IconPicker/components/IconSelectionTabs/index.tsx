import React, { useState, useEffect } from 'react';
import { Tabs, message, Button } from 'antd';
import {
  UpCircleOutlined,
  VerticalLeftOutlined,
  QuestionOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import IconSelector from '@/components/form-extend/IconPicker/components/IconSelector';
import classNames from 'classnames/bind';
import { StringValue } from '@/models/global.d';
import styles from './index.less';
import { IconSelectionTabsProps, IconSelectionTabsState, IconType } from './data.d';

const { TabPane } = Tabs;

const classNamesBind = classNames.bind(styles);

// 图标库
const IconGroup = [
  {
    name: 'UpCircleOutlined',
    type: 'direction',
    icon: <UpCircleOutlined />,
  },
  {
    name: 'VerticalLeftOutlined',
    type: 'direction',
    icon: <VerticalLeftOutlined />,
  },
  {
    name: 'QuestionOutlined',
    type: 'symbol',
    icon: <QuestionOutlined />,
  },
  {
    name: 'QuestionCircleOutlined',
    type: 'symbol',
    icon: <QuestionCircleOutlined />,
  },
];

const firstSymbolIconIndex = IconGroup.findIndex((icon) => icon.type === 'symbol');

/**
 * IconPicker组件的下拉菜单
 *
 * @param onSelect callback function on icon selected
 * @param defaultSelectedValue default selected value in `IconGroup.name`
 */
const IconSelectionTabs: React.FC<IconSelectionTabsProps> = ({
  onSelect,
  defaultSelectedValue,
}) => {
  // constant value
  const defaultActiveIndex = IconGroup.findIndex((icon) => icon.name === defaultSelectedValue);
  const defaultActivePaneKey = IconGroup[defaultActiveIndex]?.type.toUpperCase();
  const mapIndexToActiveInitState = IconGroup.map(() => false);

  // state
  const [state, setState] = useState<IconSelectionTabsState>({
    mapIndexToActive: mapIndexToActiveInitState,
    currentSelectedValue: StringValue.Empty,
  });

  // effect
  useEffect(() => {
    if (defaultSelectedValue) {
      const mapIndexToActiveNextState = mapIndexToActiveInitState;
      mapIndexToActiveNextState[defaultActiveIndex] = true;
      setState({
        ...state,
        mapIndexToActive: mapIndexToActiveNextState,
        currentSelectedValue: defaultSelectedValue,
      });
    }
  }, [defaultSelectedValue]);

  // render function of children in `<TabPane>{children}</TabPane>`
  const renderTabPaneChildren = (startIndex: number, endIndex: number) =>
    IconGroup.map(({ name, icon }, index) =>
      index >= startIndex && index <= endIndex ? (
        <IconSelector
          key={name}
          icon={icon}
          active={state.mapIndexToActive[index]}
          onClick={() => {
            const mapIndexToActiveNextState = mapIndexToActiveInitState;
            mapIndexToActiveNextState[index] = true;
            setState({
              ...state,
              mapIndexToActive: mapIndexToActiveNextState,
              currentSelectedValue: name,
            });
            message.success(`选中 ${name}`);
          }}
        />
      ) : null,
    );

  // classNames
  const classes = classNamesBind({ 'icon-selection-tabs-tabpane': true });

  // handle function on cancel button click
  const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setState({
      ...state,
      mapIndexToActive: mapIndexToActiveInitState,
      currentSelectedValue: StringValue.Empty,
    });
    onSelect(StringValue.Empty);
  };

  // handle function on confirm button click
  const handleSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (state.currentSelectedValue === StringValue.Empty) {
      message.warn('请选择一个图标');
      return;
    }
    onSelect(state.currentSelectedValue);
  };

  // render
  return (
    <>
      <Tabs defaultActiveKey={defaultActivePaneKey}>
        <TabPane className={classes} tab="方向性图标" key={IconType.Direction}>
          {renderTabPaneChildren(0, firstSymbolIconIndex - 1)}
        </TabPane>
        <TabPane className={classes} tab="符号类图标" key={IconType.Symbol}>
          {renderTabPaneChildren(firstSymbolIconIndex, IconGroup.length - 1)}
        </TabPane>
        <TabPane className={classes} tab="编辑类图标" key={IconType.Edit}>
          Content of Tab Pane 3
        </TabPane>
        <TabPane className={classes} tab="数据类图标" key={IconType.Data}>
          Content of Tab Pane 3
        </TabPane>
        <TabPane className={classes} tab="网站通用图标" key={IconType.Site}>
          Content of Tab Pane 3
        </TabPane>
        <TabPane className={classes} tab="品牌和标识" key={IconType.Logo}>
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <div className={styles['icon-selection-tabs-footer']}>
        <Button onClick={handleCancel}>取消</Button>
        <Button onClick={handleSelect} type="primary">
          选择
        </Button>
      </div>
    </>
  );
};

export default IconSelectionTabs;
