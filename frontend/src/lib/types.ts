export type PaginatedInput = {
  take: number;
  skip: number;
}

export type PaginatedOutput<T> = PaginatedInput & {
  total: number;
  data: T[];
}
