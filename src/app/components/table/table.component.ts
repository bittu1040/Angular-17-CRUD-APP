import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataService } from '../../data.service';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';
import { UserFormDialogComponent } from '../../dialogs/user-form-dialog/user-form-dialog.component';
import { FirestoreDbService } from '../../services/firestore-db.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatTableModule, MatIconModule, ReactiveFormsModule, MatInputModule, NgFor]
})
export class TableComponent {

  dataSource = new MatTableDataSource<any>();

  constructor(private data: DataService, public dialog: MatDialog, private fireStoreDBService: FirestoreDbService){

  }



  displayedColumns: string[] = ['name', 'city', 'age', 'edit', 'delete'];

  ngOnInit(){

    this.getEmpDetailsFromFireStore();
  }


  getEmpDetailsFromFireStore(){
    this.fireStoreDBService.getPeople().subscribe((dd:any)=>{
      console.log(dd);
      this.dataSource= new MatTableDataSource<any>(dd)
      this.dataSource.data= dd;
    })
  }

  redirectToAdd(): void {
    console.log("Add user dialog opened");
  
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '350px',
      height: '400px',
      data: { editDialog: false }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.clicked === 'submit') {
        console.log('Submit button clicked');
        console.log("Input form data", result.userData.value);
  
        this.fireStoreDBService.addPeople(result.userData.value).subscribe(() => {
          console.log("User added successfully");
          this.getEmpDetailsFromFireStore();
        });
      }
    });
  }

  redirectToEdit(inp:any){
    console.log(inp)
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '350px',
      height: '400px',
      data: {
        editDialog: true,
        userId: inp
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data)
      if (data.clicked === 'submit') {
        console.log('Sumbit button clicked');
        console.log("input form data", data.userData.value)
        this.fireStoreDBService.updatePeople(inp, data.userData.value).subscribe((data)=>{
          console.log("user updated successfully")
          this.getEmpDetailsFromFireStore();
        })
      }
    });
  }

  redirectToDelete(inp:any){
    console.log('selected id', inp);
    const ref: MatDialogRef<DeleteDialogComponent> = this.dialog.open(
      DeleteDialogComponent,
      {
        width: '400px',
        height: '210px',
        data: {
          message: 'Are you sure you want to delete user?',
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );

    ref.afterClosed().subscribe((data) => {
      console.log(data);
      if(data.clicked==="submit"){
        this.fireStoreDBService.deletePeople(inp).subscribe((data)=>{
          console.log("delete sucess");
          this.getEmpDetailsFromFireStore();
        })
      }

    });

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
