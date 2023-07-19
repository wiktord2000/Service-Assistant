import { Product } from 'src/app/core/models/Product';
import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-product-profile-link',
  templateUrl: './product-profile-link.component.html',
  styleUrls: ['./product-profile-link.component.scss']
})
export class ProductProfileLinkComponent implements OnInit {
  @Input() product: Product;
  @Input() includeLabel: boolean = false;
  routerLink: string;

  constructor(private utils: UtilsService) {}

  ngOnInit(): void {
    this.routerLink = this.utils.getProductRouterLink(this.product);
  }
}
