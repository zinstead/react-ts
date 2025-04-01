import { Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const RightList = () => {
  const [data, setData] = useState();
  const columns = [
    {
      dataIndex: 'id',
      title: 'ID',
    },
    {
      dataIndex: 'title',
      title: '权限名称',
    },
    {
      dataIndex: '权限路径',
      title: 'key',
    },
    {
      dataIndex: 'operator',
      title: '操作',
    },
  ];

  useEffect(() => {
    // axios.get()
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default RightList;
