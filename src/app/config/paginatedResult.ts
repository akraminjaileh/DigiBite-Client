export interface PaginatedResult<T> {
    items: T[];
    totalRecords: number;
}