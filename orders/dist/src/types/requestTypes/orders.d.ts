interface IOrderCreationRequestBody {
    ticketId: string;
}
interface IOrderFetchRequestQueryParams {
    orderId: string;
}
interface IOrderDeleteRequestQueryParams {
    orderId: string;
}
export { IOrderCreationRequestBody, IOrderFetchRequestQueryParams, IOrderDeleteRequestQueryParams, };
