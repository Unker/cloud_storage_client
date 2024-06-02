
export interface IUser {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  is_active: number,
  is_staff: number,
  is_superuser: number,
}

export interface IUsers {
  id: number;
  next: string;
  previous: string;
  results: IUser[];
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
  id: number;
  next: string;
  previous: string;
  results: IFile[];
}
