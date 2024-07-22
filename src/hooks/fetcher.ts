import { processNoAuth, processWithAuth } from "@utils/http";

export const fetcher = (url:string) => processNoAuth("get", url).then((res) => res?.data);
export const fetcherWithAuth = (url:string) => processWithAuth("get", url).then((res) => res?.data);

