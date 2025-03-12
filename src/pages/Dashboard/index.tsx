import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  theme,
} from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.less';
import axios from 'axios';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    axios.get('http://localhost:3000/posts').then(res => {
      console.log(res.data);
    });
    axios.post('http://localhost:3000/posts', {
      title: 'test',
      author: 'alan',
    });
  }, []);

  const items: MenuProps['items'] = [
    {
      key: 'admin',
      label: '超级管理员',
    },
    {
      key: 'logout',
      label: '退出',
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.title}>全球新闻发布管理系统</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div style={{ padding: '0 24px' }}>
              <Space>
                <span>欢迎你，alan</span>
                <Dropdown menu={{ items }}>
                  <Avatar size={32} icon={<UserOutlined />} />
                </Dropdown>
              </Space>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
