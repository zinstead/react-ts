import { create } from "zustand";

interface SidebarStoreProps {
    refreshMenuList:()=>void;
    setRefreshMenuList: (refreshMenuList: ()=>void) => void;
}

export const useSidebarStore = create<SidebarStoreProps>(set => ({
    refreshMenuList: function(){},
    setRefreshMenuList: refreshMenuList => set({ refreshMenuList })
}))