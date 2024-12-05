import { Component } from '@angular/core';
import { NoImage } from 'src/app/config/No-Image';
import { ItemsDTO } from 'src/app/dtos/itemsDTO';
import { ItemService } from 'src/app/Services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  items: ItemsDTO[] = [];
  noImage: string = NoImage.item;

  constructor(private service: ItemService) { }

  ngOnInit(): void {
    this.service.getAllItem().subscribe(res => {
      this.items = res
      console.log(res)
    });
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.noImage;
  }

}
