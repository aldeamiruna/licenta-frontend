import { Component, OnInit, Input } from '@angular/core';
import { DocumentService } from 'src/app/services/DocumentService/document.service';
import { DocViewComponent } from '../doc-view/doc-view.component';
import ItemProtocol from 'src/app/models/ItemProtocol';

@Component({
  selector: 'app-edit-doc',
  templateUrl: './edit-doc.component.html',
  styleUrls: ['./edit-doc.component.css']
})
export class EditDocComponent implements OnInit {

  base: ItemProtocol;
  allowTitleEdit: boolean = false;

  constructor(private service: DocumentService, private docView: DocViewComponent) { }

  ngOnInit() {
    this.base = this.docView.templateClone;
  }

  save(){
    this.docView.currentTemplate = this.base;
    this.docView.reload();
    this.closeModal();
  }

  closeModal(){
    this.docView.editDoc = false;
  }

  showTitleEdit(){
    this.allowTitleEdit = true;
  }

  saveTitle(){
    this.allowTitleEdit = false;
  }

  newField(){
    var field = {
      text: "",
      params: []
    };
    this.base.fields.push(field);
  }
}
