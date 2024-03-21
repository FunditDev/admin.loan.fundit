import { processNoAuth } from "@utils/http";

export const fetcher = (url:string) => processNoAuth("get", url).then((res) => res?.data);
