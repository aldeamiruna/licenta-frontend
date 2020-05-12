import PDFField from './PDFField';

export default class ItemProtocol{
    name: string;
    title: string;
    subtitle: PDFField;
    titleFontSize: number;
    textFontSize: number;
    lineSpacing: number;
    fields: PDFField[];
}