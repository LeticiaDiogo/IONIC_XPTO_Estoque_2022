import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModalFornecedorDetailsModule } from '../modal-fornecedor-details/modal-fornecedor-details.module';
import { FornecedorService } from '../services/fornecedor.service';
import { Tab4PageRoutingModule } from './tab4-routing.module';
import { Tab4Page } from './tab4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    HttpClientModule,
    ModalFornecedorDetailsModule
  ],
  declarations: [Tab4Page],
  providers: [FornecedorService]
})
export class Tab4PageModule {}
