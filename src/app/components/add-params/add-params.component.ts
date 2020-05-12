import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/DocumentService/document.service';
import { DocViewComponent } from '../doc-view/doc-view.component';
import ItemProtocol from 'src/app/models/ItemProtocol';
import PDFField from 'src/app/models/PDFField';

@Component({
  selector: 'app-add-params',
  templateUrl: './add-params.component.html',
  styleUrls: ['./add-params.component.css']
})
export class AddParamsComponent implements OnInit {

  template: ItemProtocol;
  fields: PDFField[];
  subtitle: PDFField;


  constructor(private service: DocumentService, private docView: DocViewComponent) { }

  ngOnInit() {
    this.template = this.docView.templateClone;
    this.fields = this.template.fields;
    this.subtitle = this.template.subtitle;
  }


  
  closeModal(){
    this.docView.displayParams = false;
  }

  done(){
    this.docView.currentTemplate = this.template;
    this.docView.reload();
    this.closeModal();
  }

}
