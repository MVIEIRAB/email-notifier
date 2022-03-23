# email-notifier

- AWS: SES
- RabbitMQ

## Um simples sistema de cadastro de usuários

- Para a criação o usuário irá enviar um e-mail através do SES (AWS) com um "link" de acesso ao sistema.
- Ao entrar irá definir uma senha, mas o processo gira em torno de mais um envio de e-mail, desta vez contendo um código aleatória para verificação.
- Com o código em mãos, iremos enviar uma requisição na rota 'set-password', passando o código e uma senha que queremos definir. 
