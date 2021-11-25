import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-pyshical',
  templateUrl: './content-pyshical.component.html',
  styleUrls: ['./content-pyshical.component.scss'],
})
export class ContentPyshicalComponent implements OnInit {
  constructor() {}

  public detailedPath: any;
  ngOnInit(): void {
    this.detailedPath = window.location.origin + '/concepts-physicals/';
  }
}
