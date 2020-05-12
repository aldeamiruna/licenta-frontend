import { Component, OnInit, Input } from '@angular/core';
import PDFField from 'src/app/models/PDFField';
import { AddParamsComponent } from '../add-params/add-params.component';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.css']
})
export class ParamComponent implements OnInit {
  
  @Input()
  field: PDFField;
  @Input()
  parentIndex: number;

  inputText:string[];

  constructor(private paramView:AddParamsComponent) { }

  ngOnInit() {
    this.inputText = [];
  }

  update(i: number){
    this.field.params[i] = this.inputText[i];
  }

}
