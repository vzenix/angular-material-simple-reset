import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { GeneralRestService } from './general-rest.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'general-rest',
  templateUrl: './general-rest.component.html',
  styleUrls: ['./general-rest.component.scss']
})
export class GeneralRestComponent implements OnChanges, OnDestroy {

  @Input() method: string;
  @Input() url: string;
  @Input() content: any;

  @Output() out = new EventEmitter<GeneralRestResponse>();
  @Output() err = new EventEmitter<GeneralRestResponse>();

  private sub;

  public isSending: boolean;

  public fUrl: string;
  public fMethod: string;
  public fContent: string;

  public fOutput: string;
  public fOutputType: string;
  public fOutputDate: Date;

  public methods: string[] = ['GET', 'POST', 'PUT', 'DELETE'];

  public constructor(
    private rest: GeneralRestService
  ) { }


  public ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  public ngOnChanges() {
    this.fUrl = this.url;
    this.fMethod = this.method.toUpperCase();
    this.fContent = JSON.stringify(this.content);
  }

  public save() {
    if (this.isSending) { return; }

    if (this.sub) { this.sub.unsubscribe(); }

    let rest = null;
    switch (this.method) {
      case 'GET': rest = this.rest.get(this.fUrl); break;
      case 'POST': rest = this.rest.get(this.fUrl); break;
      case 'PUT': rest = this.rest.get(this.fUrl); break;
      case 'DELETE': rest = this.rest.get(this.fUrl); break;
      default:
        return false;
    }

    this.isSending = true;
    rest.subscribe(
      (r) => {
        this.isSending = false;
        this.fOutputType = 'Ok';
        this.fOutput = r;
        this.fOutputDate = new Date();
        this.out.emit({ type: 'ok', out: r, date: this.fOutputDate } as GeneralRestResponse);
      }, (e) => {
        this.isSending = false;
        this.fOutputType = 'Error';
        this.fOutput = e;
        this.fOutputDate = new Date();
        this.err.emit({ type: 'error', out: e, date: this.fOutputDate } as GeneralRestResponse);
      }
    );
  }

}

class GeneralRestResponse {
  type: string;
  out: any;
  date: Date;
}
