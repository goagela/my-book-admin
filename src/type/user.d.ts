export interface UserQueryType {
  name?: string,
  status?: string,
  current?: number
  pageSize?: number
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female'
}
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}
export enum UserStatus {
  ON = 'on',
  OFF = 'off'
}

export interface UserCreateType {
  name?: string,   // 账号
  nickName?: string,  // 昵称
  gender?: UserGender, // 性别
  password?: string,  // 密码
  status?: UserStatus, // 状态
  role?: UserRole     // 角色
}
