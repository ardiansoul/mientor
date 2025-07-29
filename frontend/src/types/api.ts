type Pagination = {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
};

export type Response<T> = {
  message: string;
  data: T;
  meta: Partial<Pagination>;
};
