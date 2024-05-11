export interface BaseApiResponse<T> {
    count: number;
    result: T[];
}