import { getRightList } from '@/utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableProps, Tag } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const RightList = () => {
  const [data, setData] = useState<any[]>();
  const columns: TableProps['columns'] = [
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
      render: () => {
        return (
          <Space>
            <Button danger icon={<DeleteOutlined />} shape="circle"></Button>
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

  useEffect(() => {
    axios.get('http://localhost:3000/rights?_embed=children').then(res => {
      const rightList = getRightList(res.data);
      setData(rightList);
    });
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default RightList;
