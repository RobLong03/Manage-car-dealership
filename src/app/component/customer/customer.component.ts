import { Component, inject, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Telephone } from '../../../_model/Telephone';
import { Costumer } from '../../../_model/Costumer';
import { ServiceService } from '../../services/_service/-service.service';
import { MaterialModule } from '../../../_module/Material.Module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuheaderComponent } from '../menuheader/menuheader.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from "xlsx";
import { MatInputPromptComponent } from '../../../prompts/mat-input-prompt/mat-input-prompt.component';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule,RouterLink,
    RouterLinkActive,MenuheaderComponent,MatDialogModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
downloadFile(arg0: MatTableDataSource<Costumer,MatPaginator>) {
throw new Error('Method not implemented.');
}
  postdata!: Costumer[];

  displayedColumns: string[] = ["Actions","ID", "Name", "Surname","Email","Password","Partita IVA","Città"];
  public dataSource!: MatTableDataSource<Costumer>;
  myform!: FormGroup;
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;
  dataFromDialog: any;
  searchText: string="";
  constructor(private Apiservice: ServiceService , private dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.LoadInitialData();
    // this.LoadTelephone();
  }


  Telephonedata!: Telephone[];

  LoadInitialData() {
    this.Apiservice.getallcostumers().subscribe(x => {
      this.postdata = x;
      this.dataSource = new MatTableDataSource<Costumer>(this.postdata);
      this.dataSource.paginator = this.paginator;


  })
  }
  eliminate(id: number) {
    this.Apiservice.deletecostumerbyid(id).subscribe(
        response => {
            this.LoadInitialData();
        },
        error => {
            console.error('Error deleting customer:', error);
        }
    );
}

  edit(id: number) {

    this.dialog.open(MatInputPromptComponent, {
      width: '450px',
      height: '400px',
      data: { id: id },

    });


    }
    applyFilter(event: Event) {

      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();


  }
  exportTable(tableId: string, name?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = name || "ExportResult";
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById(tableId);
    if (!(targetTableElm instanceof HTMLTableElement)) {
      console.error(`Element with id ${tableId} is not a table.`);
      return;
    }
    let clonedTable = targetTableElm.cloneNode(true) as HTMLTableElement;
    for (let row of Array.from(clonedTable.rows)) {
      row.deleteCell(0);
    }
    let wb = XLSX.utils.table_to_book(clonedTable, <XLSX.Table2SheetOpts>{ sheet: prefix });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}


// dialogRef.afterClosed().subscribe((data) => {
    //   this.dataFromDialog = data.form;
    //   if (data.clicked === 'submit') {
    //     console.log('Sumbit button clicked');
    //   }
    // });



   // LoadTelephone() {
  //   this.Apiservice.getAllCostumer().subscribe(x => {
  //     this.Telephonedata = x;
  //     this.dataSource = new MatTableDataSource<Telephone>(this.Telephonedata);
  //     this.dataSource.paginator=this.paginator;
  //   });
  // }
/*openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    }); */
