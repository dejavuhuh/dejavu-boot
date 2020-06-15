/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Form, Input, Drawer, Button, Card, Radio, InputNumber, Modal } from 'antd';
import { BASIC_FORM_LAYOUT } from '@/styles/constants';
import { Directory } from '@/models/global.d';
import {
  IconPicker,
  NumberValueCascader,
  YesOrNoSwitch,
  BooleanValueSwitch,
} from '@/components/form-extend';
import { SystemMenu, MenuType } from '../data.d';

export interface SubmitFormProps {
  visible: boolean;
  initialData?: Partial<SystemMenu>;
  onSubmit: (formValues: SystemMenu) => void;
  onCancel: () => void;
}

const SubmitForm: React.FC<SubmitFormProps> = (props) => {
  const [iconSelectionModalVisible, setIconSelectionModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { getFieldValue, resetFields, setFieldsValue } = form;
  const { visible, initialData, onSubmit, onCancel } = props;
  const formInitialValues: Partial<SystemMenu> = {
    type: MenuType.TopMenu,
    sort: 0,
    route: true,
    showIfAuthorized: true,
    valid: true,
    icon: 'UpCircleOutlined',
  };
  const options: Directory<number>[] = [
    {
      id: 1,
      name: 'Zhejiang',
      children: [
        {
          id: 11,
          name: 'Hanzhou',
          parentId: 1,
          children: [
            {
              id: 111,
              name: 'West Lake',
              parentId: 11,
            },
            {
              id: 112,
              name: 'West Lake',
              parentId: 11,
            },
          ],
        },
        {
          id: 12,
          name: 'Hanzhou',
          parentId: 1,
          children: [
            {
              id: 121,
              name: 'West Lake',
              parentId: 12,
            },
            {
              id: 122,
              name: 'West Lake',
              parentId: 12,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Jiangsu',
      children: [
        {
          id: 21,
          name: 'Nanjing',
          parentId: 2,
          children: [
            {
              id: 211,
              name: 'Zhong Hua Men',
              parentId: 21,
            },
          ],
        },
      ],
    },
  ];
  const onClose = () => {
    resetFields();
    onCancel();
  };
  useEffect(() => {
    setFieldsValue({
      ...initialData,
      type: initialData?.parentId ? MenuType.SubMenu : MenuType.TopMenu,
    });
  });
  return (
    <Drawer
      title="新增菜单"
      width={700}
      onClose={onClose}
      visible={visible || initialData !== undefined}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button
            onClick={async () => {
              const formValues = await form.validateFields();
              onSubmit(formValues as SystemMenu);
            }}
            type="primary"
          >
            提交
          </Button>
        </div>
      }
    >
      <Card>
        <Form {...BASIC_FORM_LAYOUT} form={form} initialValues={formInitialValues}>
          <Form.Item name="type" label="菜单类型">
            <Radio.Group>
              <Radio value={MenuType.TopMenu}>一级菜单</Radio>
              <Radio value={MenuType.SubMenu}>子菜单</Radio>
              <Radio value={MenuType.ButtonOrAuthority}>按钮/权限</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {() => {
              return getFieldValue('type') === MenuType.ButtonOrAuthority ? (
                <Form.Item name="name" label="按钮/权限" rules={[{ required: true }]}>
                  <Input placeholder="请输入菜单名称" />
                </Form.Item>
              ) : (
                <Form.Item name="name" label="菜单名称" rules={[{ required: true }]}>
                  <Input placeholder="请输入菜单名称" />
                </Form.Item>
              );
            }}
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {() => {
              return [MenuType.SubMenu, MenuType.ButtonOrAuthority].includes(
                getFieldValue('type'),
              ) ? (
                <Form.Item name="parentId" label="上级菜单" rules={[{ required: true }]}>
                  <NumberValueCascader dataSource={options} />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {() => {
              return (
                <Form.Item
                  name="path"
                  label="菜单路径"
                  rules={[{ required: getFieldValue('type') !== MenuType.ButtonOrAuthority }]}
                >
                  <Input placeholder="请输入菜单路径" />
                </Form.Item>
              );
            }}
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {() => {
              return getFieldValue('type') !== MenuType.ButtonOrAuthority ? (
                <Form.Item name="component" label="前端组件" rules={[{ required: true }]}>
                  <Input placeholder="请输入前端组件" />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {() => {
              return getFieldValue('type') === MenuType.TopMenu ? (
                <Form.Item name="defaultRedirect" label="默认跳转地址">
                  <Input placeholder="请输入路由参数redirect" />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {() => {
              return getFieldValue('type') !== MenuType.ButtonOrAuthority ? (
                <>
                  <Form.Item name="icon" label="菜单图标">
                    <IconPicker />
                  </Form.Item>
                  <Form.Item name="sort" label="排序">
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item name="route" label="是否路由菜单">
                    <YesOrNoSwitch />
                  </Form.Item>
                  <Form.Item name="hidden" label="隐藏路由">
                    <YesOrNoSwitch />
                  </Form.Item>
                  <Form.Item name="internalLink" label="打开方式">
                    <BooleanValueSwitch checkedChildren="外部" unCheckedChildren="内部" />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item name="permissions" label="授权标识">
                    <Input placeholder="多个用逗号分隔，如：user:list, user:create" />
                  </Form.Item>
                  <Form.Item name="showIfAuthorized" label="授权策略">
                    <Radio.Group>
                      <Radio value={true!}>可见/可访问(授权后可见/可访问)</Radio>
                      <Radio value={false}>可编辑(未授权时禁用)</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="valid" label="状态">
                    <BooleanValueSwitch checkedChildren="有效" unCheckedChildren="无效" />
                  </Form.Item>
                </>
              );
            }}
          </Form.Item>
        </Form>
      </Card>
      <Modal
        width={900}
        visible={iconSelectionModalVisible}
        centered
        closable={false}
        okText="确认"
        cancelText="取消"
        onCancel={() => setIconSelectionModalVisible(false)}
      >
        <IconPicker />
      </Modal>
    </Drawer>
  );
};

export default SubmitForm;
