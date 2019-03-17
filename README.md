# angular-material-simple-reset

Simple reset component for develop bodies of application.

# Sample import

```

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatCardModule } from '@angular/material/card';
import { GeneralRestModule } from './general-rest/general-rest.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    GeneralRestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

# Sample of use

## Component where use it

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public content = {
    algo: 'vale',
    es: true,
    num: 5
  };
}


## Template

```

<h1>GET</h1>
<div style="max-width: calc(100vw - 100px); padding: 50px;">
  <mat-card style="margin: auto;">
    <mat-card-content>
      <general-rest method="GET" url="https://es.gravatar.com/205e460b479e2e5b48aec07710c08d50.json"></general-rest>
    </mat-card-content>
  </mat-card>
</div>

<h1>POST</h1>
<div style="max-width: calc(100vw - 100px); padding: 50px;">
  <mat-card style="margin: auto;">
    <mat-card-content>
      <general-rest method="POST" url="https://httpbin.org/post" [content]='content'></general-rest>
    </mat-card-content>
  </mat-card>
</div>

<h1>DELETE</h1>
<div style="max-width: calc(100vw - 100px); padding: 50px;">
  <mat-card style="margin: auto;">
    <mat-card-content>
      <general-rest method="DELETE" url="https://httpbin.org/delete"></general-rest>
    </mat-card-content>
  </mat-card>
</div>

```
