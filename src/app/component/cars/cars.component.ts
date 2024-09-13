import { Component, OnInit, ViewChild } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { MatFooterRow, MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../_module/Material.Module';
import { ToastService } from '../../services/toastservice/toast.service';
import { MenuheaderComponent } from '../menuheader/menuheader.component';
import { ServiceService } from '../../services/_service/-service.service';
import { Car } from '../../../_model/Car';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Costumer } from '../../../_model/Costumer';
import { DecimalPipe } from '@angular/common';
import { StringpipePipe } from '../../Pipes/stringpipe.pipe';
@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [MaterialModule, MenuheaderComponent, MatFooterRow, MatError,StringpipePipe],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit{



  displayedColumns: string[] = ["Price","ID", "Nome", "Cognome","Email","Password","Partita IVA","Città"];
  public dataSource!: MatTableDataSource<Costumer>;
@ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;
  data!: Array<Car>;
  constructor(private service: ServiceService) {

  }
  ngOnInit(): void {
    this.getallcars();
  }
  getallcars() {
    this.service.getAllCars().subscribe((x)=>{
      this.data=x;
    })
  }



}
