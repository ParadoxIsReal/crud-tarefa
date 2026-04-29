import { TarefaServico } from '../servico/TarefaServico.mjs';

const svc = new TarefaServico();

export function renderTabela() {
 const tbody = document.getElementById('tbl-tarefa');
 const lista = svc.listar();
 tbody.innerHTML = lista.length === 0
 ? `<tr><td colspan="4" class="text-center text-muted">Nenhuma Tarefa cadastrada.</td></tr>`
 : lista.map(u => `
 <tr>
 <td>${u.descricao}</td>
 <td>${u.concluida ? 'Sim' : 'Não'}</td>
 <td>
 ${!u.concluida ? `<button class="btn btn-sm btn-outline-success me-1"
 onclick="marcarConcluida('${u.id}')">Concluir</button>` : ''}
 <button class="btn btn-sm btn-outline-primary me-1"
 onclick="editarTarefa('${u.id}')">Editar</button>
 <button class="btn btn-sm btn-outline-danger"
 onclick="excluirTarefa('${u.id}')">Excluir</button>
 </td>
 </tr>`
 ).join('');
}

export function salvarTarefa(form) {
 const dados = Object.fromEntries(new FormData(form));
 try {
 const id = form.dataset.editId;
 dados.concluida = !!form.concluida.checked;
 id ? svc.atualizar(id, dados) : svc.salvar(dados);
 form.reset();
 delete form.dataset.editId;
 renderTabela();
 mostrarAlerta('Tarefa salva com sucesso!', 'success');
 } catch (e) {
 mostrarAlerta(e.message, 'danger');
 }
}

export function editarTarefa(id) {
  const u = svc.buscarPorId(id);
 if (!u) return;
 const form = document.getElementById('form-tarefa');
 form.descricao.value = u.descricao;
 form.concluida.checked = u.concluida;
 form.dataset.editId = id;
 form.scrollIntoView({ behavior: 'smooth' });
}

export function excluirTarefa(id) {
 if (!confirm('Confirma a exclusão?')) return;
 svc.excluir(id);
 renderTabela();
}

function mostrarAlerta(msg, tipo) {
 const div = document.getElementById('alerta');
 div.className = `alert alert-${tipo}`;
 div.textContent = msg;
 div.classList.remove('d-none');
 setTimeout(() => div.classList.add('d-none'), 3000);
}