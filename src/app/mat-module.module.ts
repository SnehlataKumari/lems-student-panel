import { NgModule } from '@angular/core';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule,} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
//  import {MatNativeDateModule, } from '@angular/material/native-date';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort'


@NgModule({
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    //  MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    MatMomentDateModule,
    MatSortModule
  ],
  exports: [
  
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    //  MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
  ],
  
})
export class MatModuleModule { }
