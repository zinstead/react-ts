export interface MenuItem{
    key:string;
    label:string;
    children:MenuItem[]
    pagePermission:number;
}