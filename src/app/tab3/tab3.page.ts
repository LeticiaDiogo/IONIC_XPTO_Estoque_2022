import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EnderecoModel } from '../model/endereco.model';
import { Fornecedor } from '../model/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit  {
  fornecedorForm!: FormGroup;
  fornecedor!: Fornecedor;
  editable:boolean = false;

  constructor(private formBuilder: FormBuilder, private service: FornecedorService, private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.fornecedorForm = this.formBuilder.group({
        razaoSocial: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)
          ]
        ],
        cnpj: [
          '',
          [
            Validators.required,
          ]
        ],
        telefone: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(15)
          ]
        ],
        endereco:this.formBuilder.group({
          cep:['',[Validators.required,Validators.pattern(/^\d{5}\-?\d{3}$/)]],
          logradouro:['',[Validators.required]],
          complemento:['',],
          bairro:['',[Validators.required]],
          localidade:['',[Validators.required]],
          uf:['',[Validators.required]]
        }),
      });

      this.route.paramMap.subscribe(params => {
        const fornecedorId = +params.get('id')!;

        if(fornecedorId) {
          this.service.findFornecedor(fornecedorId).subscribe({
            next: (fornecedorDB: Fornecedor) => {
            this.fornecedor = fornecedorDB;
            this.fornecedor.id = fornecedorId;
            this.editable = true;
            this.loadForm();
            },
            error: (err) => console.log(err)
          });
        }
      });
    }
    addFornecedor() {
      const newFornecedor = this.fornecedorForm.getRawValue() as Fornecedor;


     this.service.insertFornecedor(newFornecedor)
      .subscribe({
        next: (result:any) => {
          this.fornecedorForm.reset();
          this.router.navigateByUrl('/tabs/tab4');
        },
        error: (error:any) => { console.log(error)}
      });
    }
    loadForm() {
      this.fornecedorForm.patchValue({
        razaoSocial: this.fornecedor.razaoSocial,
        cnpj: this.fornecedor.cnpj,
        telefone: this.fornecedor.telefone,
        endereco: this.fornecedor.endereco,
      });

    }

      editFornecedor() {
        const editFornecedor = this.fornecedorForm.getRawValue() as Fornecedor;
        editFornecedor.id = this.fornecedor.id;

        this.service.updateFornecedor(editFornecedor).subscribe({
          next: () => {
            this.router.navigateByUrl('/tabs/tab4');
            this.fornecedorForm.reset();
          },
          error: (err) => {
            console.error(err);
            this.fornecedorForm.reset();
          }
        });
    }

    verifyCEP(){
      const cep = this.fornecedorForm.get('endereco')?.getRawValue() as EnderecoModel;
      console.log(cep)
      const receivedCEP = this.service.getCEP(cep.cep);
      receivedCEP.subscribe({
        next:(cep)=>{
          this.refresForm(cep)
        },
        error: (err)=>{
          console.log(err)
        }
      })
      console.log(receivedCEP)
    }

    refresForm(endereco:EnderecoModel){
      this.fornecedorForm.get("endereco")?.patchValue({
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        localidade:endereco.localidade,
        uf: endereco.uf
      })
  }


  get razaoSocial(){return this.fornecedorForm.get("razaoSocial")!}
  get cnpj(){return this.fornecedorForm.get("cnpj")!}
  get telefone(){return this.fornecedorForm.get("telefone")!}

  get cep(){return this.fornecedorForm.get("endereco")?.get("cep")!}
  get logradouro(){return this.fornecedorForm.get("endereco")?.get("logradouro")!}
  get complemento(){return this.fornecedorForm.get("endereco")?.get("complemento")!}

  get bairro(){return this.fornecedorForm.get("endereco")?.get("bairro")!}
  get localidade(){return this.fornecedorForm.get("endereco")?.get("localidade")!}
  get uf(){return this.fornecedorForm.get("endereco")?.get("uf")!}
}

