import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import SubmitForm, { SubmitFormProps } from './components/SubmitForm';
import { SystemMenu } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({
      desc: fields.desc,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: SystemMenu[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [formVisible, setFormVisible] = useState<boolean>(true);
  const [formInitialData, setFormInitialData] = useState<SubmitFormProps['initialData']>();
  const actionRef = useRef<ActionType>();
  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={() => setFormInitialData({ parentId: 211 })}>添加下级</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  const columns: ProColumns<SystemMenu>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '菜单类型',
      dataIndex: 'type',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
    },
    {
      title: '组件',
      dataIndex: 'component',
    },
    {
      title: '路径',
      dataIndex: 'path',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      sorter: true,
      render: (text) => (text === '-' ? -1 : text),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => setFormInitialData(record)}>编辑</a>
          <Divider type="vertical" />
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              更多&nbsp;
              <DownOutlined />
            </a>
          </Dropdown>
        </>
      ),
    },
  ];
  const createButton = (
    <Button icon={<PlusOutlined />} type="primary" onClick={() => setFormVisible(true)}>
      新建
    </Button>
  );

  return (
    <PageHeaderWrapper>
      <ProTable<SystemMenu>
        headerTitle={createButton}
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          </div>
        )}
        request={(params) => queryRule(params)}
        columns={columns}
        rowSelection={{}}
      />
      <SubmitForm
        onSubmit={async (value) => {
          console.log(value);
          // const success = await handleAdd(value);
          // if (success) {
          //   handleModalVisible(false);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          // }
        }}
        onCancel={() => {
          setFormVisible(false);
          setFormInitialData(undefined);
        }}
        visible={formVisible}
        initialData={formInitialData}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
