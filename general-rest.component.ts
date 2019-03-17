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
    this.fUrl = typeof this.url === 'string' ? this.url : '';
    this.fMethod = typeof this.method === 'string' ? this.method.toUpperCase() : '';
    this.fContent = typeof this.content === 'string' ? this.content : JSON.stringify(this.content);
  }

  public save() {
    if (this.isSending) { return; }

    if (this.sub) { this.sub.unsubscribe(); }

    let rest = null;
    switch (this.method) {
      case 'GET': rest = this.rest.get(this.fUrl); break;
      case 'POST': rest = this.rest.post(this.fUrl, this.fContent); break;
      case 'PUT': rest = this.rest.put(this.fUrl, this.fContent); break;
      case 'DELETE': rest = this.rest.delete(this.fUrl); break;
      default:
        return false;
    }

    this.isSending = true;
    this.sub = rest.subscribe(
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
