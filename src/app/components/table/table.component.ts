import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataService } from '../../data.service';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';
import { UserFormDialogComponent } from '../../dialogs/user-form-dialog/user-form-dialog.component';
import { FirestoreDbService, Person } from '../../services/firestore-db.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatTableModule, MatIconModule, ReactiveFormsModule, MatInputModule, NgFor]
})
export class TableComponent {

  dataSource: Person[] = [];
  filteredDataSource: Person[] = [];
  displayedColumns: string[] = ['ID', 'name', 'city', 'age', 'edit', 'delete'];

  isLoading: boolean = true;


  constructor(private data: DataService, public dialog: MatDialog, private fireStoreDBService: FirestoreDbService) {

  }



  ngOnInit() {
    this.getEmpDetailsFromFireStore();
  }

  getEmpDetailsFromFireStore() {
    this.fireStoreDBService.getPeople()
      .pipe(
        map((users: Person[]) => {
          return users.sort((a, b) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          });
        })
      )
      .subscribe((sortedUsers: Person[]) => {
        console.log(sortedUsers);
        this.dataSource = sortedUsers;
        this.filteredDataSource = [...this.dataSource];
        this.isLoading = false;
      });
  }


  redirectToAdd(): void {

    // use this once you need to add multiple dummy users
    // const test = {"name": "9thuser","age" : 12,"city": "test","timestamp": "9/2/2024, 5:20:33 PM"}
    // this.fireStoreDBService.addPeople(test).subscribe(() => {
    //   console.log("User added successfully");
    //   this.getEmpDetailsFromFireStore();
    // });


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

  redirectToEdit(inp: string | undefined) {
    if (!inp) {
      console.error('Cannot edit user with undefined id');
      return;
    }
    console.log(inp);
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '350px',
      height: '400px',
      data: {
        editDialog: true,
        userId: inp
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      if (data?.clicked === 'submit' && data.userData?.value) {
        console.log('Submit button clicked');
        console.log("input form data", data.userData.value);
        // Here we know inp is not undefined due to the check at the beginning of the method
        this.fireStoreDBService.updatePeople(inp, data.userData.value).subscribe(() => {
          console.log("user updated successfully");
          this.getEmpDetailsFromFireStore();
        });
      }
    });
  }

  redirectToDelete(inp: string | undefined) {
    if (!inp) {
      console.error('Cannot delete user with undefined id');
      return;
    }
    console.log('selected id', inp);
    const ref = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '210px',
      data: {
        message: 'Are you sure you want to delete user?',
      },
      backdropClass: 'confirmDialogComponent',
      hasBackdrop: true,
    });

    ref.afterClosed().subscribe((data: any) => {
      console.log(data);
      if (data?.clicked === "submit") {
        // Here we know inp is not undefined due to the check at the beginning of the method
        this.fireStoreDBService.deletePeople(inp).subscribe(() => {
          console.log("delete success");
          this.getEmpDetailsFromFireStore();
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDataSource = this.dataSource.filter(user =>
      user.name.toLowerCase().includes(filterValue) ||
      user.city.toLowerCase().includes(filterValue) ||
      user.age.toString().includes(filterValue)
    );
  }
}
