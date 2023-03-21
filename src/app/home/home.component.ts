import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TERMS } from '../terms';
import { TermsService } from '../terms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private readonly router: Router,
    private readonly termsService: TermsService
  ) {
    const values = Object.values(this.termsService.statistics);
    this._seen = values.length;
    this._unseen = Object.values(TERMS).length-this._seen;
    const stat = values.reduce(
      (p, c) => ({
        correct: p.correct + c.correct,
        wrong: p.wrong + c.wrong,
      }),
      { correct: 0, wrong: 0 }
    );
    this._correct = stat.correct;
    this._wrong = stat.wrong;
  }



  private _unseen : number;
  public get unseen() : number {
    return this._unseen;
  }


  private _seen : number;
  public get seen() : number {
    return this._seen;
  }

  public newSession(): void {
    this.termsService.newSession()
    this.router.navigateByUrl('term/' + this.termsService.next());
  }

  private _correct: number;
  public get correct(): number {
    return this._correct;
  }

  private _wrong: number;
  public get wrong(): number {
    return this._wrong;
  }
}
