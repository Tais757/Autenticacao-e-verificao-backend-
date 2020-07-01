const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Usuario = require('../model/Usuario');


/**
 * Método para definir salt e hash a senha de um usuário
 * O método setPassword cria primeiro um salt exclusivo para cada usuário 
 * depois mistura o sal com a senha do usuário e cria um hash 
 * esse hash é armazenado no banco de dados como senha do usuário 
 */
const criaUsuario = (nome, email, senha) => {
    //Criando um salt exclusivo para um usuário específico
    const salt = crypto.randomBytes(16).toString('hex');
    /**Hashing sal e senha do usuário com 1000 iterações, 
     * 64 comprimento e sha512 digest */
    const hash = crypto.pbkdf2Sync(senha, salt, 1000, 64, 'sha512')
        .toString('hex');
    
    const usuario = new Usuario(nome, email, salt, hash);
    return usuario;
};

/**
 * Verificar a senha digitada está correto ou não
 * O método de senha válido verifica se o usuário senha está correta ou não
 * Leva a senha do usuário da solicitação e salt da entrada do banco de dados do usuário
 * Em seguida, hashes a senha do usuário e o salt depois verifica se esse hash gerado
 * é igual ao hash do usuário no banco de dados ou não
 * Se o hash do usuário for igual ao hash gerado a senha está correta, caso contrário não
 */
const validarSenha = (email, senha) => {
    let hash = crypto.pbkdf2Sync(senha, email, salt, 1000, 64, 'sha512')
        .toString('hex');
        return hash === hash;
};

// Chave secreta
const config = 'segredo';

/**
 * Gera o token JWT no e-mail do usuário e a palavra
 * secreta do sistem (que você difiniu)
 */
const gerarJWT = usuario => jwt.sign(
    {
        usuario: usuario.email
    },
    config,
    {
        expiresIn: '5m'
    }
);

/**
 * Verifica se o token do usuário expirou
 */
const tokenExpirou = token => {
    if(token){

        const tokenDecodificado = jwt.verify(token, config);

        if(tokenDecodificado.exp < Date.now()){
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }
};

module.exports = {
    criaUsuario,
    validarSenha,
    gerarJWT,
    tokenExpirou
}