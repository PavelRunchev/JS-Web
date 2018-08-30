import { Component, OnInit } from '@angular/core';
import { FurnitureModel } from '../models/furniture.model';
import { FurnitureService } from '../furniture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-furniture',
  templateUrl: './edit-furniture.component.html',
  styleUrls: ['./edit-furniture.component.css']
})
export class EditFurnitureComponent implements OnInit {
  bindingModel: FurnitureModel;

  constructor(
    private furnitureService: FurnitureService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService, 
    private router: Router) { }

  ngOnInit() {
    this.furnitureService.getFurnitureById(
      this.route.snapshot.params['id']
    ).subscribe(data => {
      this.bindingModel = data;
    })
  }

  edit() {
    this.furnitureService
      .editFurniture(this.bindingModel.id, this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Edited furniture Successful!');
        this.router.navigate(['/furniture/all']);
      });
  }

}
