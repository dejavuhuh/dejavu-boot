// 基本实体类型
export interface Entity {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
  sort?: number;
}

// 基本多值类型
export type BiStatus = 0 | 1;
export type TriStatus = -1 | 0 | 1;

// 基本ID类型
export type ID = number;

// http methods 枚举
export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

// 定义嵌套目录类型
export interface Directory<ID> {
  id: ID;
  name: string;
  parentId?: ID;
  children?: Directory<ID>[];
  [key: string]: any;
}

// constant value of string type
export enum StringValue {
  Empty = '',
  Space = ' ',
  Double_Space = '  ',
}
