import { Picture } from "./picture.type";

export type Loading = { kind: 'LOADING' };
export type Success<T = Picture[]> = { kind: 'SUCCESS'; pictures: T };
export type Failure = { kind: 'FAILURE'; error: string };