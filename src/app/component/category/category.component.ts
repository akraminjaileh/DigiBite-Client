import { Component } from '@angular/core';
import { ImageHandler } from 'src/app/config/imageHandler';
import { CategoryDTO } from 'src/app/dtos/categoryDTO';
import { BehaviorService } from 'src/app/Services/behavior.service';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categories: CategoryDTO[] = [];
  categoryId: number = 0;

  constructor(
    private service: CategoryService,
    private behavior: BehaviorService) { }

  ngOnInit() {
    this.service.getAllCategory().subscribe(res => {
      this.categories = res;
    })
  }

  onClickCategory(catId: number) {
    this.behavior.setCategoryId(catId);
    this.categoryId = catId;
  }

  imageHandler(url: string | undefined) {
    return ImageHandler.url(url);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = ImageHandler.noImage;
  }

}
