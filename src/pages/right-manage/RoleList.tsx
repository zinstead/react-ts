import { apiPrefix } from '@/api';
import { convertLabelToTitle } from '@/utils';
import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Button,
  Modal,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tree,
} from 'antd';
import axios from 'axios';
import { useState } from 'react';

interface DataType {
  id: number;
  roleName: string;
  roleType: number;
  rights: string[];
}

const RoleList = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { data: roleList, refresh: refreshRoleList } = useRequest(async () => {
    const res = await axios.get(`${apiPrefix}/roles`);
    return res.data;
  });

  const { data: rightList } = useRequest(async () => {
    const res = await axios.get(`${apiPrefix}/rights?_embed=children`);
    return res.data;
  });

  const [checkedRightKeys, setCheckedRightKeys] = useState<React.Key[]>();
  const [curRightId, setCurRightId] = useState<number>();

  const handleDelete = async (id: number) => {
    await axios.delete(`${apiPrefix}/roles/${id}`);
    refreshRoleList();
  };

  const handleEditRights = async () => {
    setModalVisible(false);
    await axios.patch(`${apiPrefix}/roles/${curRightId}`, {
      rights: checkedRightKeys,
    });
    refreshRoleList();
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      dataIndex: 'id',
      title: 'ID',
      render(value) {
        return <b>{value}</b>;
      },
    },
    {
      dataIndex: 'roleName',
      title: '角色名称',
    },
    {
      title: '操作',
      render(value, record, index) {
        return (
          <Space>
            <Popconfirm
              title={'删除角色'}
              description={'你确定要删除该角色吗？'}
              onConfirm={() => handleDelete(record.id)}
            >
              <Button danger shape="circle">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
            <Button
              type="primary"
              shape="circle"
              onClick={() => {
                setModalVisible(true);
                setCheckedRightKeys(record.rights);
                setCurRightId(record.id);
              }}
            >
              <UnorderedListOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table dataSource={roleList} columns={columns} />
      <Modal
        title="权限分配"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleEditRights}
      >
        <Tree
          treeData={convertLabelToTitle(rightList ?? []) as any}
          checkable
          checkStrictly
          checkedKeys={checkedRightKeys}
          onCheck={checkedKeys => {
            setCheckedRightKeys(checkedKeys as React.Key[]);
          }}
        />
      </Modal>
    </div>
  );
};

export default RoleList;
