import { TERMS } from './terms';

export interface ILanguage {
  id: number;
  name: string;
  abbreviation: string;
  version: number;
  definition: string;
  slug: string;
}
export interface ITerm {
  accept_language: ILanguage;
  secondary_language: ILanguage | null;
}

export type IId = keyof typeof TERMS;
