export interface IPagination<Data> {
  pagination: {
    items: number,
    limit: number,
    page: number,
    skip: number,
    perPage: number,
    total: number,
  }
  list: Data,
}