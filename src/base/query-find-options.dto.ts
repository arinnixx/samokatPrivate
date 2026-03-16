export class QueryFindOptions {
    skip?: number;
    take?: number;
    where?: any;
    order?: any;
    relations?: string[];
    offset?: string;
    page?: string;
    search?: string;
    aggregatorId?: number;
}