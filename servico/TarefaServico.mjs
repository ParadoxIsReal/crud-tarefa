import { Tarefa } from '../modelo/Tarefa.mjs';

const KEY = 'tarefa';

export class TarefaServico {
  listar() {
    const dados = localStorage.getItem(KEY);
    return dados ? JSON.parse(dados) : [];
  }

  buscarPorId(id) {
    return this.listar().find(u => u.id === id) ?? null;
  }

  salvar(dados) {
    const erros = Tarefa.validar(dados);
    if (erros.length) throw new Error(erros.join(' | '));
    const lista = this.listar();
    const tarefa = new Tarefa(dados);
    lista.push(tarefa);
    localStorage.setItem(KEY, JSON.stringify(lista));
    return tarefa;
  }

  atualizar(id, dados) {
    const erros = Tarefa.validar(dados);
    if (erros.length) throw new Error(erros.join(' | '));
    const lista = this.listar().map(u =>
    u.id === id ? { ...u, ...dados, id } : u
    );
    localStorage.setItem(KEY, JSON.stringify(lista));
    return lista.find(u => u.id === id);
  }
 
  excluir(id) {
    const lista = this.listar().filter(u => u.id !== id);
    localStorage.setItem(KEY, JSON.stringify(lista));
  }

}