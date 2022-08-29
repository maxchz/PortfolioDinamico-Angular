import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {
  datosUsuario: any;
  @Input()
  miPortfolio: any;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

}
