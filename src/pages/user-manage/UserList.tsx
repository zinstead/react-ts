import { apiPrefix } from '@/api';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Space, Switch, Table, TableProps } from 'antd';
import axios from 'axios';

enum RoleType {
  superAdmin = '超级管理员',
  areaAdmin = '区域管理员',
  areaEditor = '区域编辑',
}

interface DataType {
  id: number;
  username: string;
  region: string;
  roleId: number;
  roleState: boolean;
  default: boolean;
}

const UserList = () => {
  const { data: userList } = useRequest(async () => {
    const res = await axios.get(`${apiPrefix}/users`);
    return res.data;
  });

  const columns: TableProps<DataType>['columns'] = [
    {
      dataIndex: 'username',
      title: '用户名',
    },
    {
      dataIndex: 'region',
      title: '区域',
      render(value, record, index) {
        return value ? value : '全球';
      },
    },
    {
      dataIndex: 'roleId',
      title: '角色',
      render(value, record, index) {
        if (value === 1) {
          return RoleType.superAdmin;
        } else if (value === 2) {
          return RoleType.areaAdmin;
        } else {
          return RoleType.areaEditor;
        }
      },
    },
    {
      dataIndex: 'roleState',
      title: '用户状态',
      render(value, record, index) {
        return <Switch defaultChecked={value} />;
      },
    },
    {
      title: '操作',
      render(value, record, index) {
        return (
          <Space>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              disabled={record.default}
            ></Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              shape="circle"
              disabled={record.default}
            ></Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={userList} />
    </div>
  );
};

export default UserList;
