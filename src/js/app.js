document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('msg').textContent = 'Deployed at ' + new Date().toLocaleString();
});
