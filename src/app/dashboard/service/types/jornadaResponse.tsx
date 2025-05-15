import type { Linguagem } from "./linguagens";

export type JornadaResponse = {
  uid: string;
  linguagem: Linguagem;
  progresso_percent: number;
};
