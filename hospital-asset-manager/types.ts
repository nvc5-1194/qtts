export type AssetStatus = 'active' | 'maintenance' | 'broken' | 'disposed';
export type AssetType = 'fixed' | 'tool'; // fixed: Tài sản cố định, tool: Công cụ dụng cụ

export interface Asset {
  id: string;
  name: string;
  category: string;
  department: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  status: AssetStatus;
  assetType: AssetType;
  image: string;
  supplierId?: string;
  originalPrice?: number; // Trường mới: Nguyên giá
}

export enum Page {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  ASSET_LIST = 'ASSET_LIST',
  ASSET_DETAIL = 'ASSET_DETAIL',
  BATCH_IMPORT = 'BATCH_IMPORT',
  SETTINGS = 'SETTINGS',
  MAINTENANCE_REPAIR = 'MAINTENANCE_REPAIR'
}

export type UserRole = 'ADMIN' | 'MANAGER' | 'USER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  debt: number;
  address: string;
}

export interface DepartmentConfig {
  id: string;
  name: string;
}