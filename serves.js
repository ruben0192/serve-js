const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let users = [
  { id: 1, nome: 'João' },
  { id: 2, nome: 'Maria' }
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/usuarios', (req, res) => {
  res.json(users)
})

app.post('/usuarios', (req, res) => {
  const { nome } = req.body
  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' })
  const newUser = { id: users.length + 1, nome }
  users.push(newUser)
  res.status(201).json(newUser)
})

app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params
  const { nome } = req.body
  const user = users.find(u => u.id == id)
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })
  if (nome) user.nome = nome
  res.json(user)
})

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params
  const index = users.findIndex(u => u.id == id)
  if (index === -1) return res.status(404).json({ error: 'Usuário não encontrado' })
  users.splice(index, 1)
  res.status(204).send()
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '123') {
    res.json({ success: true, token: 'fake-jwt-token' })
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



