import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-webpage',
  templateUrl: './webpage.component.html',
  styleUrls: ['./webpage.component.css']
})
export class WebpageComponent implements OnInit {

  constructor(private service:AdminServiceService) { }

  ngOnInit(): void {
  }

  generateExcel():void{
    this.service.getall().subscribe((data)=>{
      console.log(data);
      const workbook=XLSX.utils.book_new();
      const worksheet=XLSX.utils.json_to_sheet(data.updated_data)
      console.log(worksheet);
      XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet1');
      const excelBuffer=XLSX.write(workbook,{bookType:'xlsx',type:'array'})
      const excelBlob=new Blob([excelBuffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      saveAs(excelBlob,'data.xlsx')
    });
  }

}
