const net = require('net');

const server = net.createServer((socket) => {
  // Lógica para lidar com as conexões Telnet
  socket.write('Bem-vindo ao servidor Telnet!\r\n');
  socket.pipe(socket);

  socket.on('data', data => {
    const mensagem = data.toString();
    console.log('Mensagem recebida:', mensagem);

    // Faça o processamento da mensagem aqui

    // Envie uma resposta ao cliente (opcional)
    socket.write('Mensagem recebida com sucesso!\r\n');
  });
});

server.listen(21000, '127.0.0.1', () => {
  console.log('Servidor Telnet iniciado na porta 23');
});
