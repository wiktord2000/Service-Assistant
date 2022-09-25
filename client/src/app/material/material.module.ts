import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 

const material = [
  MatButtonModule,
  MatIconModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
