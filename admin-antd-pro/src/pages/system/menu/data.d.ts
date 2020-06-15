import { Entity } from '@/models/global.d';

export enum MenuType {
  TopMenu = 'TOP_MENU',
  SubMenu = 'SUB_MENU',
  ButtonOrAuthority = 'BUTTON_OR_AUTHORITY',
}

export interface SystemMenu extends Entity {
  parentId?: SystemMenu['id'];
  name: string;
  type: MenuType;
  icon?: string;
  component?: string;
  path: string;
  route?: boolean;
  hidden?: boolean;
  showIfAuthorized?: boolean;
  valid?: boolean;
}

export interface TableListItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  title: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
