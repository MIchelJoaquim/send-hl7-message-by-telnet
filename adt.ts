interface Segmento {
    nome: string;
    valores: string[];
  }
  
  function criarSegmentoMSH(identificadorRemetente: string, sistemaInformacaoRemetente: string, identificadorDestinatario: string, sistemaInformacaoDestinatario: string, dataHoraMensagem: string, tipoMensagem: string, identificadorMensagem: string, prioridade: string, versao: string): Segmento {
    const valores = [identificadorRemetente, sistemaInformacaoRemetente, identificadorDestinatario, sistemaInformacaoDestinatario, dataHoraMensagem, '', tipoMensagem, identificadorMensagem, prioridade, versao];
    return {
      nome: 'MSH',
      valores: valores
    };
  }
  
  function criarSegmentoEVN(dataHoraMensagem: string): Segmento {
    return {
      nome: 'EVN',
      valores: ['A01', dataHoraMensagem]
    };
  }
  
  function criarSegmentoPID(numeroIdentificacao: string, nomePaciente: string, dataNascimento: string, sexo: string, endereco: string, telefone: string, estadoCivil: string): Segmento {
    const valores = ['1', numeroIdentificacao, '', nomePaciente, '', dataNascimento, sexo, '', '', endereco, '', '', telefone, '', '', estadoCivil];
    return {
      nome: 'PID',
      valores: valores
    };
  }
  
  function criarSegmentoPV1(tipoPaciente: string, localAdmissao: string, medicoResponsavel: string): Segmento {
    const valores = ['1', tipoPaciente, '', '', '', localAdmissao, '', '', '', '', '', '', '', '', '', '', '', '', '', medicoResponsavel];
    return {
      nome: 'PV1',
      valores: valores
    };
  }
  
  function criarSegmentoIN1(planoSaude: string): Segmento {
    return {
      nome: 'IN1',
      valores: ['1', planoSaude]
    };
  }
  

function criarMensagemADT(
    identificadorRemetente: string,
    sistemaInformacaoRemetente: string,
    identificadorDestinatario: string,
    sistemaInformacaoDestinatario: string,
    dataHoraMensagem: string,
    tipoMensagem: string,
    identificadorMensagem: string,
    prioridade: string,
    versao: string,
    paciente: {
      numeroIdentificacao: string,
      nome: string,
      dataNascimento: string,
      sexo: string,
      endereco: string,
      telefone: string,
      estadoCivil: string
    },
    localAdmissao: string,
    tipoPaciente: string,
    medicoResponsavel: string,
    planoSaude: string
  ): string {
    const segmentoMSH = criarSegmentoMSH(identificadorRemetente, sistemaInformacaoRemetente, identificadorDestinatario, sistemaInformacaoDestinatario, dataHoraMensagem, tipoMensagem, identificadorMensagem, prioridade, versao);
    const segmentoEVN = criarSegmentoEVN(dataHoraMensagem);
    const segmentoPID = criarSegmentoPID(paciente.numeroIdentificacao, paciente.nome, paciente.dataNascimento, paciente.sexo, paciente.endereco, paciente.telefone, paciente.estadoCivil);
    const segmentoPV1 = criarSegmentoPV1(tipoPaciente, localAdmissao, medicoResponsavel);
    const segmentoIN1 = criarSegmentoIN1(planoSaude);
  
    const segmentos: Segmento[] = [segmentoMSH, segmentoEVN, segmentoPID, segmentoPV1, segmentoIN1];
  
    const mensagem = segmentos.map(segmento => `${segmento.nome}|${segmento.valores.join('|')}`).join('\n');
    return mensagem;
  }
  
  // Exemplo de uso:
  const mensagem = criarMensagemADT(
    "HOSPITAL",
    "HIS",
    "LAB",
    "LIS",
    "20231108074347",
    "ADT^A01",
    "MSG000001",
    "P",
    "2.5",
    {
      numeroIdentificacao: "12345",
      nome: "João da Silva",
      dataNascimento: "19800101",
      sexo: "M",
      endereco: "Rua Principal, 123",
      telefone: "(555)555-5555",
      estadoCivil: "Solteiro"
    },
    "Ala A",
    "I",
    "Dr. José",
    "Plano de Saúde XYZ"
  );
  
  console.log(mensagem);
