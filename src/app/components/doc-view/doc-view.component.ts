import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/DocumentService/document.service';
import { DomSanitizer } from '@angular/platform-browser';
import ItemProtocol from 'src/app/models/ItemProtocol';
import Document from 'src/app/models/Document';
import { InventoryComponent } from '../inventory/inventory.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppComponent } from 'src/app/app.component';
import Item from 'src/app/models/Item';


@Component({
  selector: 'app-doc-view',
  templateUrl: './doc-view.component.html',
  styleUrls: ['./doc-view.component.css']
})
export class DocViewComponent implements OnInit {

  dataSource: any;
  currentTemplate: ItemProtocol;
  templateClone: ItemProtocol;
  selectedType: Document;
  docTypes: Document[];
  displayParams: boolean = false;
  editDoc: boolean = false;
  draftName: string = "";
  saveDoc: boolean = false;
  inventoryNr: string = "";
  hasItem: boolean = false;
  item: Item;


  constructor(private service: DocumentService, private sanitizer: DomSanitizer, private appComponent: AppComponent) { }

  async ngOnInit() {
    this.docTypes = await this.existingTemplates();
    this.selectedType = this.docTypes[0];
    await this.updateView();
  }

  async generateTemplate(type: string): Promise<any> {
    return await this.service.fetchTemplate(type).then((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      return fileURL;
    });
  }

  async generateCurrent(): Promise<any> {
    return await this.service.fetchDocumentByTemplate(this.currentTemplate).then((response) => {
      let file = new Blob([response], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      return fileURL;
    });
  }

  async updateView() {
    this.detachItem();
    this.dataSource = await this.generateTemplate(this.selectedType.name);
    this.currentTemplate = await this.setCurrentTemplate();

  }

  async existingTemplates(): Promise<Document[]> {
    let response = await this.service.fetchAllTemplates();
    console.log(response);
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      console.log(response["output"]);
      return response["output"];
    }
  }

  async setCurrentTemplate(): Promise<ItemProtocol> {
    let response = await this.service.fetchCurrentTemplate();
    console.log(response);
    if (response["message"] == "Success") {
      console.log(response["output"][0]);
      return response["output"][0];
    }
  }

  closeModal() {
    this.detachItem();
    this.appComponent.displayDoc = false;
  }

  async reload() {
    this.dataSource = await this.generateCurrent();
  }

  showParamView() {
    this.templateClone = JSON.parse(JSON.stringify(this.currentTemplate));
    this.displayParams = true;
  }

  download() {
    this.service.downloadCurrent();
  }

  async showNewDocView() {
    this.selectedType = this.docTypes[0];
    this.currentTemplate.title = "No title";
    this.currentTemplate.subtitle = { text: "No subtitle", params: [] };
    this.currentTemplate.fields = [];
    await this.reload();
    this.showEditDocView();
  }

  showEditDocView() {
    this.templateClone = JSON.parse(JSON.stringify(this.currentTemplate));
    this.editDoc = true;
  }

  showSaveDialog() {
    this.saveDoc = true;
  }

  cancelSave() {
    this.saveDoc = false;
  }

  exists(name: string): boolean {
    for (let doc of this.docTypes) {
      if (doc.name === name)
        return true;
    }
    return false;
  }

  async saveTemplate() {
    if (this.draftName.length != 0 && !this.exists(this.draftName)) {
      this.currentTemplate.subtitle.params = [];
      this.currentTemplate.fields.forEach(function (field) {
        field.params = [];
      });
      var doc: Document = {
        id: null,
        name: this.draftName,
        template: JSON.stringify(this.currentTemplate)
      };
      await this.service.saveTemplate(doc);
      this.refreshList();
      this.saveDoc = false;
    }
    else {
      this.draftName = "";
    }
  }

  async refreshList() {
    this.docTypes = await this.existingTemplates();
  }

  async editItemBox() {
    await this.detachItem();
    await this.reload();
  }

  async lockItemBox() {
    this.hasItem = true;
    this.item = await this.findItemByInventoryNumber(this.inventoryNr);
    await this.service.setCurrentItem(this.item);
    await this.reload();
    console.log(this.item);
  }

  async findItemByInventoryNumber(input: string): Promise<Item> {
    let response = await this.service.getItemByInventoryNumber(input);
    if (response["message"] == "Success") {
      console.log(response["output"][0]);
      return response["output"][0];
    }
  }

  async detachItem() {
    this.hasItem = false;
    this.item = new Item();
    await this.service.detachItem();
  }

}
