function criarSegmentoMSH(identificadorRemetente, sistemaInformacaoRemetente, identificadorDestinatario, sistemaInformacaoDestinatario, dataHoraMensagem, tipoMensagem, identificadorMensagem, prioridade, versao) {
    const valores = [identificadorRemetente, sistemaInformacaoRemetente, identificadorDestinatario, sistemaInformacaoDestinatario, dataHoraMensagem, '', tipoMensagem, identificadorMensagem, prioridade, versao];
    return {
      nome: 'MSH',
      valores: valores
    };
}
  
function criarSegmentoEVN(dataHoraMensagem) {
return {
    nome: 'EVN',
    valores: ['A01', dataHoraMensagem]
};
}

function criarSegmentoPID(numeroIdentificacao, nomePaciente, dataNascimento, sexo, endereco, telefone, estadoCivil) {
const valores = ['1', numeroIdentificacao, '', nomePaciente, '', dataNascimento, sexo, '', '', endereco, '', '', telefone, '', '', estadoCivil];
return {
    nome: 'PID',
    valores: valores
};
}

function criarSegmentoPV1(tipoPaciente, localAdmissao, medicoResponsavel) {
const valores = ['1', tipoPaciente, '', '', '', localAdmissao, '', '', '', '', '', '', '', '', '', '', '', '', '', medicoResponsavel];
return {
    nome: 'PV1',
    valores: valores
};
}

function criarSegmentoIN1(planoSaude) {
return {
    nome: 'IN1',
    valores: ['1', planoSaude]
};
}

function criarMensagemADT(
identificadorRemetente,
sistemaInformacaoRemetente,
identificadorDestinatario,
sistemaInformacaoDestinatario,
dataHoraMensagem,
tipoMensagem,
identificadorMensagem,
prioridade,
versao,
numeroIdentificacao,
nomePaciente,
dataNascimento,
sexo,
endereco,
telefone,
estadoCivil,
localAdmissao,
tipoPaciente,
medicoResponsavel,
planoSaude
) {
    const segmentoMSH = criarSegmentoMSH(identificadorRemetente, sistemaInformacaoRemetente, identificadorDestinatario, sistemaInformacaoDestinatario, dataHoraMensagem, tipoMensagem, identificadorMensagem, prioridade, versao);
    const segmentoEVN = criarSegmentoEVN(dataHoraMensagem);
    const segmentoPID = criarSegmentoPID(numeroIdentificacao, nomePaciente, dataNascimento, sexo, endereco, telefone, estadoCivil);
    const segmentoPV1 = criarSegmentoPV1(tipoPaciente, localAdmissao, medicoResponsavel);
    const segmentoIN1 = criarSegmentoIN1(planoSaude);

    const segmentos = [segmentoMSH, segmentoEVN, segmentoPID, segmentoPV1, segmentoIN1];

    const mensagem = segmentos.map(segmento => `${segmento.nome}|${segmento.valores.join('|')}`).join('\n');
    return mensagem;
}

module.exports = criarMensagemADT;
