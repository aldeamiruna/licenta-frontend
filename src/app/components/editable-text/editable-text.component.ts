import { Component, OnInit, Input } from '@angular/core';
import PDFField from 'src/app/models/PDFField';
import { EditDocComponent } from '../edit-doc/edit-doc.component';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.css']
})
export class EditableTextComponent implements OnInit {

  @Input()
  field: PDFField;

  text: string;
  edit: boolean = false;

  constructor(private editView: EditDocComponent) { }

  ngOnInit() {
  }

  showEdit(){
    this.edit = true;
  }

  save(){
    this.updateParams();
    this.edit = false;
  }

  updateParams(){
    var nrOfParams = (this.field.text.split("<").length - 1);
    if(nrOfParams != this.field.params.length){
      this.field.params = [];
      for(var counter = 0; counter < nrOfParams; counter++){
        this.field.params.push("");
      }
    }
  }

  remove(){
    var index = this.editView.base.fields.indexOf(this.field);
    if(index > -1){
      this.editView.base.fields.splice(index, 1);
    }
  }

}
