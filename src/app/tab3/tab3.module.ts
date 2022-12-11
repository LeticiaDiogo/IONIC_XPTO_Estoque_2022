import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FornecedorService } from '../services/fornecedor.service';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { Tab3Page } from './tab3.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page],
  providers: [FornecedorService]
})
export class Tab3PageModule {}
