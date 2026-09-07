export class PaginationDto {
    private constructor(
        public readonly page: number,
        public readonly limit: number
    ) { }
    static create(obj: { page: number, limit: number } = { page: 1, limit: 10 }): { error?: string, dto?: PaginationDto } {

        const { page, limit } = obj;

        if (isNaN(page) || isNaN(limit)) return { error: 'Page and limit must be numbers' };

        if (page <= 0 || limit <= 0) return { error: 'Page and limit must be grater than 0' };

        return { dto: new PaginationDto(page, limit) };

    };

};