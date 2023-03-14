import { Injectable } from '@angular/core';
import { IId, ITerm } from './iterm';
import { TERMS } from './terms';

const STORAGE_KEY = 'statistics';

export interface IStatistic {
  wrong: number;
  correct: number;
  streak: number;
}

interface IStatistics {
  [id: string]: IStatistic;
}

@Injectable({
  providedIn: 'root',
})
export class TermsService {
  public getStat(term: ITerm): IStatistic {
    let stat = this.statistics[term.accept_language.id];
    if (!stat) {
      stat = { correct: 0, wrong: 0, streak: 0 };
      this.statistics[term.accept_language.id] = stat;
    }
    return stat;
  }

  wronglyAnswered(term: ITerm) {
    const stat = this.getStat(term);
    stat.wrong++;
    stat.streak = 0;
    this.storeStatistics();
  }
  correctlyAnswered(term: ITerm) {
    const stat = this.getStat(term);
    stat.correct++;
    stat.streak++;
    this.storeStatistics();
  }
  getTermById(id: IId): ITerm {
    return TERMS[id];
  }

  private statistics: IStatistics;

  private storeStatistics(): void {
    const value = JSON.stringify(this.statistics);
    localStorage.setItem(STORAGE_KEY, value);
  }

  private loadStatistics(): IStatistics {
    const item = localStorage.getItem(STORAGE_KEY);
    const statistics: IStatistics = JSON.parse(item || '{}');
    return statistics;
  }

  private ids = Object.keys(TERMS) as IId[];

  public next(): IId {
    const weights = this.ids.map((id) => {
      const stati = this.statistics[id];
      if (!stati) {
        return 1;
      }

      return 1 + (stati.wrong + 1) / (stati.correct + 1) / (stati.streak + 1);
    });

    const steps = weights.map((w) => w);
    for (let i = 1; i < steps.length; i++) {
      steps[i] += steps[i - 1];
    }

    const random = Math.random() * steps[steps.length - 1];
    for (let j = 0; j < steps.length; j++) {
      if (steps[j] > random) {
        return this.ids[j];
      }
    }
    debugger;
    return this.ids[Math.floor(Math.random() * this.ids.length)];
  }

  constructor() {
    this.statistics = this.loadStatistics();
  }
}