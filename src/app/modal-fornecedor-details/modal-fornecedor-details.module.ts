import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ModalFornecedorDetailsComponent } from './modal-fornecedor-details.component';



@NgModule({
  declarations: [ModalFornecedorDetailsComponent],
  imports: [CommonModule, IonicModule],
  exports: [ModalFornecedorDetailsComponent]
})
export class ModalFornecedorDetailsModule { }
