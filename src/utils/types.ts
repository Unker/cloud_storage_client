
export interface IUser {
  id: number,
  email: string,
  username: string,
  first_name: string,
  last_name: string,
  is_active: number,
  is_staff: number,
  is_superuser: number,
}

export interface IUsers {
  count: number;
  next: string;
  previous: string;
  results: IUser[];
}
export interface IRegisterFormData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password1: string;
  password2: string;
}

export interface IRegistrationResponse {
  status: string;
  errors?: string;
  message?: string;
}

export interface IRegisterServerError {
  message: string;
  code: string;
}

export interface IRegisterErrors {
  [key: string]: IRegisterServerError[];
}

export interface IFile {
  id: number;
  original_name: string,
  file: string,
  size: number,
  upload_date: string,
  last_update_date: string,
  last_download_date: string,
  comment: string,
  short_link: string,
  owner: number,
}

export interface IStorageFiles {
  count: number;
  next: string;
  previous: string;
  results: IFile[];
}

export interface LoginResponse {
  token: string,
  user_id: number,
  is_staff: boolean,
  is_superuser: boolean,
  username: string,
}
