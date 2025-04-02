export interface MenuItem{
    key:string;
    label:string;
    children:MenuItem[]
    pagePermission:number;
}

export interface RightItem{
    id:string;
    key:string;
    label:string;
    children:RightItem[]
}