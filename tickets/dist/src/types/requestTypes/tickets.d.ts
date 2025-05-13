interface ITicketCreationRequestBody {
    title: string;
    price: number;
}
interface ITicketUpdateRequestBody {
    title?: string;
    price?: number;
    orderId?: string;
}
interface ITicketUpdateRequestParams {
    id: string;
}
interface ITicketFetchRequestParams {
    id: string;
    userId: string;
}
export { ITicketCreationRequestBody, ITicketUpdateRequestBody, ITicketUpdateRequestParams, ITicketFetchRequestParams };
