export function append(role, content){
  const container = document.getElementById('log')
  const p = document.createElement('p')
  p.className='msg'
  const strong = document.createElement('span')
  strong.className = role==='utente' ? 'user' : 'assistant'
  strong.textContent = role+' : '
  p.appendChild(strong)
  p.append(document.createTextNode(content))
  container.appendChild(p)
  container.scrollTop = container.scrollHeight
}
