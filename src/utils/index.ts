import { MenuItem } from '@/types';
import { isEmpty } from 'lodash';

export const getPageMenuList = (menuList: MenuItem[]): any[] => {
    return menuList
      .filter(item => item.pagePermission === 1)
      .map(({ pagePermission, children, ...restItem }) => ({
        ...restItem,
        children: isEmpty(children) ? null : getPageMenuList(children) 
      }));
  };
