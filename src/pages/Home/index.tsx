import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
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
import { getPageMenuList } from '@/utils';

const { Header, Sider, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [menuList, setMenuList] = useState([]);

  const handleClick = () => {};

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

  useEffect(() => {
    axios.get('http://localhost:5000/rights?_embed=children').then(res => {
      setMenuList(res.data);
    });
  }, []);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.siderContainer}>
          <div className={styles.siderTitle}>全球新闻发布管理系统</div>
          <div className={styles.siderMenu}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={getPageMenuList(menuList)}
            />
          </div>
        </div>
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
          <Button type="primary" onClick={handleClick}>
            Button
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
