function login(req, res) {
  const { email, password } = req.body;

  // Validação básica
  if (!email || !password) {
    return res.status(400).json({
      error: 'Email e senha são obrigatórios'
    });
  }

  // SIMULAÇÃO (sem banco ainda)
  if (email === 'teste@dayflow.com' && password === '123456') {
    return res.status(200).json({
      message: 'Login realizado com sucesso',
      user: {
        name: 'Karen',
        email
      }
    });
  }

  return res.status(401).json({
    error: 'Email ou senha inválidos'
  });
}

module.exports = {
  login
};
