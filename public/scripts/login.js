document.getElementById("login").addEventListener("click", (event) => {
  event.preventDefault();
  let data = {
    email: document.querySelector("#mail").value,
    password: document.querySelector("#password").value,
  };
  console.log(data);
  fetch(`http://localhost:8080/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => console.log(res)) //en lugar de imprimir en consola: mostrar mensaje de alerta
    .catch((err) => console.log(err)); //en lugar de imprimir en consola: mostrar mensaje de alerta
});
