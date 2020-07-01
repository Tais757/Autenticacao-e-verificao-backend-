const Usuario = require('../model/Usuario');

const jwt = require('../util/jwt');

const controller = {
    realizaRegistro: (req, res) => {
        const { nome, email, senha } = req.body;

        if(!nome || !email || !senha){
            const usuario = req.body;
            Usuario
                .create(usuario)
                .then(jwt.criaUsuario = res.status(201).json(
                    { mensagem: 'Usuário registrado com sucesso !' }))
                .catch(erro => {
                    console.log(erro);
                    res.status(500).json({ mensagem: 'Erro no servidor' });
                });
        } else{
            return erro => res.status(400).json({ erro, mensagem: 'Usuário já existente.' });
        }
    },

    realizaLogin: (req, res) => {
        const { email, senha } = req.body;

        if(!email[email] || email !== senha && jwt.validarSenha ){
            const token = jwt.gerarJWT(email);

            Usuario
                .then(res.status(201).json({ sucess: true, email, token }))
                .catch(erro => {
                    res.status(400).json({ sucess: false, erro,
                         mensagem: 'Credenciais de usuário inválidas' })
                });
        }
    },

    verifica: (req, res) => {
        const token = req.body;

        /*jwt.verify(token, config, (err, data) => {
            if(err){
                res.status(401).json({ acessoLiberado: false, 
                    mensagem: 'Seu token expirou' }) 
            }
        }*/

        if(!jwt.tokenExpirou(token)){
            Usuario
                .then(res.status(200).json({ acessoLiberado: true,
                mensagem: 'O token está válido' }))
                .catch(res.status(401).json({ acessoLiberado: false, 
                mensagem: 'Seu token expirou' }));
        }
    }

};

module.exports = controller;