import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Fornecedor } from '../model/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-modal-fornecedor-details',
  templateUrl: './modal-fornecedor-details.component.html',
  styleUrls: ['./modal-fornecedor-details.component.scss'],
})
export class ModalFornecedorDetailsComponent implements OnInit {
  @Input() fornecedor!: Fornecedor;

  constructor(private modalCtrl: ModalController,
    private service: FornecedorService,
    private router: Router) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

  edit(id:number) {

    this.router.navigate(['/tabs/editar2', id]);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  delete(id:number) {
    this.service.deleteFornecedor(id).subscribe({
      next: () => {
        this.modalCtrl.dismiss(null, 'cancel');
      },
      error: () => {
        console.error(console.error);
      },
    });
  }
}
