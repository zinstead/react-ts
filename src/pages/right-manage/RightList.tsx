import { getRightList } from '@/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
} from 'antd';
import axios from 'axios';
import { useRequest } from 'ahooks';
import { useSidebarStore } from '@/zustand/store';

const apiPrefix = 'http://localhost:3000';

interface DataType {
  id: number;
  label: string;
  key: string;
  grade: number;
  pagePermission: number;
  rightId: number;
  children: DataType[] | null;
}

const RightList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const refreshMenuList = useSidebarStore(state => state.refreshMenuList);

  const columns: TableProps<DataType>['columns'] = [
    {
      dataIndex: 'id',
      title: 'ID',
      render: id => {
        return <b>{id}</b>;
      },
    },
    {
      dataIndex: 'label',
      title: '权限名称',
    },
    {
      dataIndex: 'key',
      title: '权限路径',
      render: key => {
        return <Tag color="orange">{key}</Tag>;
      },
    },
    {
      dataIndex: 'operator',
      title: '操作',
      render: (_, item) => {
        const { id, grade } = item;

        return (
          <Space>
            <Popconfirm
              title="删除权限"
              description="你确定要删除该权限吗？"
              onConfirm={() => handleDelete(id, grade)}
            >
              <Button danger shape="circle" icon={<DeleteOutlined />}></Button>
            </Popconfirm>
            <Button
              type="primary"
              icon={<EditOutlined />}
              shape="circle"
            ></Button>
          </Space>
        );
      },
    },
  ];

  const { data: rightList, refresh: refreshRightList } = useRequest(
    async () => {
      const res = await axios.get(`${apiPrefix}/rights?_embed=children`);
      return getRightList(res.data);
    },
  );

  const handleDelete = async (id: number, grade: number) => {
    if (grade === 1) {
      // 这样做会同时删除包含该外键的记录
      await axios.delete(`${apiPrefix}/rights/${id}`);
    } else if (grade === 2) {
      await axios.delete(`${apiPrefix}/children/${id}`);
    }
    messageApi.success('删除成功');
    refreshRightList();
    refreshMenuList();
  };

  return (
    <div>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={rightList}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default RightList;
