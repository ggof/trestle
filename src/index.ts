import { IncomingMessage, ServerResponse } from "http";

export type HttpHandler = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  params: Partial<Record<string, string>>,
  store?: Partial<Record<string, string>>
) => Promise<void>;

export type Filter = (next: HttpHandler) => HttpHandler;

export type Pipeline = (...filters: Filter[]) => Filter;

export const createPipeline: Pipeline =
  (...filters: Filter[]): Filter =>
  (next: HttpHandler): HttpHandler =>
    filters.reduceRight((acc, cur) => cur(acc), next);
