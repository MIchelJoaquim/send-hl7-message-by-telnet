const net = require('net');
const criarMensagemADT = require('./adt.js')

const client = net.createConnection({ port: 21000, host: '127.0.0.1' }, () => {
  console.log('Conexão estabelecida com o servidor Telnet');
  // Lógica para lidar com a conexão Telnet
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
    "12345",
    "João da Silva",
    "19800101",
    "M",
    "Rua Principal, 123",
    "(555)555-5555",
    "Solteiro",
    "Ala A",
    "I",
    "Dr. José",
    "Plano de Saúde XYZ"
  );
  
  console.log(mensagem);
  client.write(mensagem);
});

client.on('data', (data) => {
  console.log('Resposta do servidor Telnet:', data.toString());
  // Lógica para lidar com a resposta do servidor Telnet

  
  
  client.end();
});

client.on('end', () => {
  console.log('Conexão encerrada com o servidor Telnet');
});

client.on('error', (error) => {
    console.log('Error, ',error);
  });
    
  // Exemplo de uso:
