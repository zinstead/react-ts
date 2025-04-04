import { MenuItem, RightItem } from '@/types';
import { isEmpty } from 'lodash';

export const getPageMenuList = (menuList: MenuItem[]): any[] => {
    return menuList
      .filter(item => item.pagePermission === 1)
      .map(({ pagePermission, children, ...restItem }) => ({
        ...restItem,
        children: isEmpty(children) ? null : getPageMenuList(children) 
      }));
  };

export const getRightList=(rightList:RightItem[]):any[]=>{
  return rightList.map(({children,...restItem})=>{
    return {
      ...restItem,
      children:isEmpty(children)?null:getRightList(children)
    }
  })
}
