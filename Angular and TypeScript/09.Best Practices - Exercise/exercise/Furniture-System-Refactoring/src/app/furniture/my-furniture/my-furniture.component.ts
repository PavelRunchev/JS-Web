import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { FurnitureModel } from '../models/furniture.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-furniture',
  templateUrl: './my-furniture.component.html',
  styleUrls: ['./my-furniture.component.css']
})
export class MyFurnitureComponent implements OnInit {
  furnitures: Observable<FurnitureModel[]>;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(private furnitureService: FurnitureService,
    private route: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.furnitures = this.furnitureService.getMyFurniture();
  }

  deleteItem(id: string) {
    this.furnitureService
      .deleteFurniture(id)
      .subscribe(() => {
        this.toastr.success('Deleted furniture successful!');
        this.route.navigate(['/furniture/all']);
    });
  }

  changePage(page) {
    this.currentPage = page;
  }

}
