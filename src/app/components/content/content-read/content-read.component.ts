import { Component, OnInit } from '@angular/core';
import { Gadgets } from 'src/app/model/gadgets.model';
import { GadgetsService } from 'src/app/services/gadgets.service';

@Component({
  selector: 'app-content-read',
  templateUrl: './content-read.component.html',
  styleUrls: ['./content-read.component.scss'],
})
export class ContentReadComponent implements OnInit {
  ngOnInit(): void {}
}
