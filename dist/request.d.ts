interface RequestOptions {
    method: string;
    user?: string;
    period?: string;
    limit?: string;
}
declare const request: <Response_1>(options: RequestOptions) => Promise<Response_1>;
export default request;
