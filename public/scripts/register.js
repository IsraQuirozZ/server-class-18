document.getElementById("register").addEventListener("click", (event) => {
  event.preventDefault();
  let data = {
    name: document.querySelector("#name").value,
    photo: document.querySelector("#photo").value,
    age: document.querySelector("#age").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  fetch(`http://localhost:8080/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      document.getElementById("registerForm").reset();
    }) //en lugar de imprimir en consola: mostrar mensaje de alerta
    .catch((err) => alert(err)); //en lugar de imprimir en consola: mostrar mensaje de alerta
});
