import { NgModule } from '@angular/core';
import { furnitureComponents } from './index';
import { FormsModule } from '@angular/forms';
import { FurnitureService } from './furniture.service';
import { FurnitureRoutingModule } from './furniture-routing.module';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditFurnitureComponent } from './edit-furniture/edit-furniture.component';

@NgModule({
    declarations: [
        ...furnitureComponents,
        EditFurnitureComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        FormsModule,
        FurnitureRoutingModule
    ],
    providers: [
        FurnitureService
    ],
    exports: [
        CommonModule
    ]
})
export class FurnitureModule { }