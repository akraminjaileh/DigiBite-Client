import { Component } from '@angular/core';
import { NoImage } from 'src/app/config/no-Image';
import { ItemsDTO } from 'src/app/dtos/itemsDTO';
import { ItemService } from 'src/app/Services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  //prime test start

  layout: string = 'list';
  totalRecords: number = 0;
  pageSize: number = 10;
  first: number = 0;

  loadData(event: any): void {
    const pageIndex = event.first / event.rows;

    this.service.getAllItem(pageIndex, event.rows).subscribe((response) => {
      this.items = response.items;
      this.totalRecords = response.totalRecords;
      console.log(response)
    });
  }
  //prime test end
  items: ItemsDTO[] = [];
  noImage: string = NoImage.item;

  constructor(private service: ItemService) { }

  ngOnInit(): void {
    // this.service.getAllItem().subscribe(res => {
    //   this.items = res
    //   console.log(res)
    // });
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.noImage;
  }

}
