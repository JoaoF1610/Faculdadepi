import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../entities/aluno';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.scss']
})
export class AtualizarComponent implements OnInit {
  aluno: Aluno = {
    nome: '',
    ativo: true,
    dataCadastro: new Date(),
  };

  constructor(private router: Router, 
    private servico: AlunoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.aluno.ra = this.route.snapshot.paramMap.get("id")!
    this.pesquisarRA()
  }

  pesquisarRA(): void {
    this.servico.pesquisarRA(this.aluno.ra).subscribe((resposta) => {
      this.aluno = resposta
    })
  }

  cancelar(): void {
    this.router.navigate([''])
  }

  formataData(): void {
    let data = new Date(this.aluno.dataCadastro).toISOString()
  }

  atualizar(): void {
    this.formataData()
    this.servico.atualizar(this.aluno).subscribe((resposta) => {
      this.servico.message("Aluno atualizado com sucesso.")
      this.router.navigate([''])
    }, err => {
      this.servico.message("Erro ao atualizar!")
    })
  }
}
