export interface IPaginationUser<T> {
    totalItems: number;
    size: number;
    totalPages: number;
    currentPage: number;
    data: T[];
    message: string;
  }
  
  export interface UserPagination {
    id: string;
    email: string;
    userName: string;
    isActive: boolean;
  }