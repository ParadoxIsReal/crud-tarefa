export class Tarefa {
  constructor({id = null, descricao, concluida}){
    this.id = id ?? crypto.randomUUID();
    this.descricao = descricao;
    this.concluida = concluida;
  }

  static validar(dados){
    const erros = [];
    if (!dados.descricao?.trim()) erros.push('Descrição é obrigatória');
    if (typeof dados.concluida !== 'boolean') erros.push('Estado de conclusão é obrigatório');
    return erros;
  }
}