import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStatistic, TermsService } from '../terms.service';
import { IId, ILanguage, ITerm } from './../iterm';

let INDEX = 0;
let WRONGS = 0;
let CORRECTS = 0;
function shuffle<T>(array: T[]) {
  const copy: T[] = [];
  let n = array.length;
  let i = 0;

  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}
interface IOption {
  id: number;
  definition: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly termsService: TermsService
  ) {}

  private _statistic: IStatistic | undefined;
  public get statistic(): IStatistic | undefined {
    return this._statistic;
  }

  private _selectedAnswer: number | undefined;
  public get selectedAnswer(): number | undefined {
    return this._selectedAnswer;
  }
  public set selectedAnswer(v: number | undefined) {
    this._selectedAnswer = v;
  }

  public next(): void {
    this.router.navigateByUrl('term/' + this.termsService.next());
  }

  private _answered: boolean = false;
  public get answered(): boolean {
    return this._answered;
  }

  public answer(): void {
    this._answered = true;
    if (!this.term) {
      debugger;
      return;
    }
    if (this.selectedAnswer === this.acceptLanguage?.id) {
      CORRECTS++;
      this.termsService.correctlyAnswered(this.term);
    } else {
      WRONGS++;
      this.termsService.wronglyAnswered(this.term);
    }
  }

  public get wrongs(): number {
    return WRONGS;
  }
  public get corrects(): number {
    return CORRECTS;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as IId;
    if (id) {
      INDEX++;
      this._term = this.termsService.getTermById(id);
      this._statistic = this.termsService.getStat(this._term);
      this.createOptions(this._term);
    } else {
      this.next();
    }
  }

  private createOptions(current: ITerm): void {
    const optionIds = new Set<IId>();
    while (optionIds.size < 3) {
      const newId = this.termsService.next();
      if (newId !== `${current.accept_language.id}`) {
        optionIds.add(newId);
      }
    }
    const terms = [...optionIds].map((id) => this.termsService.getTermById(id));
    terms.push(current);

    this._options = shuffle(terms).map((t) => ({
      id: t.accept_language.id,
      definition: t.accept_language.definition,
    }));
  }

  public get index(): number {
    return INDEX;
  }

  public get acceptLanguage(): ILanguage | undefined {
    return this.term?.accept_language;
  }

  private _options: IOption[] | undefined;
  public get options(): IOption[] | undefined {
    return this._options;
  }

  private _term: ITerm | undefined;
  public get term(): ITerm | undefined {
    return this._term;
  }

  public solve(): void {}
}
