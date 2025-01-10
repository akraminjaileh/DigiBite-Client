import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageHandler } from 'src/app/config/imageHandler';
import { ItemsDTO } from 'src/app/dtos/itemsDTO';
import { BehaviorService } from 'src/app/Services/behavior.service';
import { ItemService } from 'src/app/Services/item.service';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  items: ItemsDTO[] = [];
  layout: string = 'list';
  sortOptions: { label: string, value: boolean }[];
  totalRecords: number = 0;
  pageSize: number = 5;
  first: number = 0;
  sortBy: string | undefined;
  isDescending: boolean = false;
  skip: number = 0;
  take: number = 10;
  isSorted: boolean = false;
  categoryId: number = 0;
  ref: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    private service: ItemService,
    private translate: TranslateService,
    private behavior: BehaviorService,
    public dialogService: DialogService) {
    this.sortOptions = [
      { label: 'Price High to Low', value: true },
      { label: 'Price Low to High', value: false }
    ];
  }

  ngOnInit() {
    this.translate.get('Price High to Low').subscribe((translation: string) => {
      this.sortOptions.at(0)!.label = translation;
    });
    this.translate.get('Price Low to High').subscribe((tran: string) => {
      this.sortOptions.at(1)!.label = tran;
    });

    this.behavior.getCategoryId().subscribe(res => {
      if (res !== null) {
        this.categoryId = res;
        this.loadData()
      }
    });

  }

  onSortChange(event?: any): void {
    if (event.value == null) {
      this.isSorted = false;
      this.loadData();
    } else {
      this.isSorted = true;
      this.isDescending = event.value;
      this.sortBy = "Price"
      this.loadData();
    }
  }

  loadData(event?: any): void {

    if (event) {
      this.skip = event.first || 0;
      this.take = event.rows || 10;
    }

    let params: any = {
      skip: this.skip,
      take: this.take
    };
    if (this.isSorted) {
      params.sortBy = this.sortBy;
      params.isDescending = this.isDescending;
    }
    if (this.categoryId > 0) {
      params.categoryId = this.categoryId
    }


    this.service.getAllItem(params).subscribe((res) => {
      this.items = res.items;
      this.totalRecords = res.totalRecords;
    });
  }

  itemDetails(id: number) {
    if (Number.isInteger(id)) {
      this.ref = this.dialogService.open(ItemDetailsComponent,
        {
          data: {
            id: id
          },
          header: 'Item Details',
          width: '70%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
        });
    }
  }

  imageHandler(url: string | undefined) {
    return ImageHandler.url(url);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = ImageHandler.noImage;
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
