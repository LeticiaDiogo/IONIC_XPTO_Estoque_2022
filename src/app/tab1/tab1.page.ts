import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from '../model/fornecedor.model';

import { Produto } from '../model/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  produtoForm!: FormGroup;
  produto!: Produto;
  editable:boolean = false;
  porcentagem!: number;
  porcentagens!:number;
  valorCompra!: number;
  resultado!: number;


  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.produtoForm = this.formBuilder.group({
        nome: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100)
          ]
        ],
        quantidade: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.pattern(/^[0-9]+$/)
          ]
        ],
        valorCompra: [
          '',
          [
            Validators.required,
          ]
        ],
        porcentagem: [
          '',
          [
            Validators.required,
          ]
        ],
        valorVenda: [
          '',
          [
            Validators.required,
          ]
        ],

        fornecedor: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100)
          ]
        ],

      });

      this.route.paramMap.subscribe(params => {
        const produtoId = +params.get('id')!;

        if(produtoId) {
          this.produtoService.findProduto(produtoId).subscribe({
            next: (produtoDB: Produto) => {
            this.produto = produtoDB;
            this.produto.id = produtoId;
            this.editable = true;
            this.loadForm();
            },
            error: (err) => console.log(err)
          });
        }
      });
    }
    addProduto() {
      const newProduto = this.produtoForm.getRawValue() as Produto;

     this.produtoService.insertProduto(newProduto)
      .subscribe({
        next: (result:any) => {
          this.produtoForm.reset();
          this.router.navigateByUrl('/tabs/tab2');
        },
        error: (error:any) => { console.log(error)}
      });
    }
    loadForm() {
      this.produtoForm.patchValue({
        nome: this.produto.nome,
        quantidade: this.produto.quantidade,
        valorCompra: this.produto.valorCompra,
        porcentagem:this.produto['porcentagem'],
        valorVenda: this.produto.valorVenda,
        fornecedor: this.produto.fornecedor,
      });
    }
      editProduto() {
        const editProduto = this.produtoForm.getRawValue() as Produto;
        editProduto.id = this.produto.id;

        this.produtoService.updateProduto(editProduto).subscribe({
          next: () => {
            this.router.navigateByUrl('/tabs/tab2');
            this.produtoForm.reset();
          },
          error: (err) => {
            console.error(err);
            this.produtoForm.reset();
          }
        });
    }
      calc(): void {
        let valorCompra = this.produtoForm.get('valorCompra')?.value;
        let porcentagem = this.produtoForm.get('porcentagem')?.value;

        let calcVenda = valorCompra + (valorCompra * (porcentagem / 100));

        this.produtoForm.patchValue({
          valorVenda: calcVenda
        })
      }
  }
