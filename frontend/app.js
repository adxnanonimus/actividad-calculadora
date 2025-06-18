function enviar() {
  var contenido = document.querySelector('#contenido');
  var v1 = document.querySelector('#t1').value;
  var v2 = document.querySelector('#t2').value;
  var url = "";

  // Verificar que al menos una opción esté seleccionada
  if (document.querySelector('#opcion1').checked) {
    url = 'http://127.0.0.1:5000/' + v1 + '/' + v2;
  } else if (document.querySelector('#opcion2').checked) {
    url = 'http://127.0.0.1:5000/resta/' + v1 + '/' + v2;
  } else if (document.querySelector('#opcion3').checked) {
    url = 'http://127.0.0.1:5000/multiplicacion/' + v1 + '/' + v2;
  } else if (document.querySelector('#opcion4').checked) {
    url = 'http://127.0.0.1:5000/division/' + v1 + '/' + v2;
  } else if (document.querySelector('#opcion5').checked) {
    url = 'http://127.0.0.1:5000/potenciacion/' + v1 + '/' + v2;
  } else if (document.querySelector('#opcion6').checked) {
    url = 'http://127.0.0.1:5000/seno/' + v1;
  } else if (document.querySelector('#opcion7').checked) {
    url = 'http://127.0.0.1:5000/coseno/' + v1;
  } else {
    swal("Mensaje", "Seleccione una opción", "warning");
    return; // Salir de la función si no hay opción seleccionada
  }

  // Validar que los valores no estén vacíos (opcional pero recomendable)
  if (!v1 || (url.includes(v2) && !v2)) {
    swal("Mensaje", "Ingrese los valores requeridos", "warning");
    return;
  }

  fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json(); // Suponiendo que el backend devuelve JSON
      } else {
        throw new Error("Error en la llamada al servidor: " + response.statusText);
      }
    })
    .then(function(data) {
      console.log(data);
      // Validar que data tenga las propiedades esperadas
      if (data.Resultado !== undefined && data.Operacion !== undefined) {
        var cadena = `<h3>Resultado: ${data.Resultado} ${data.Operacion}</h3>`;
        contenido.innerHTML = cadena;
        // swal("Mensaje", "Proceso realizado correctamente", "success");
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    })
    .catch(function(error) {
      console.error(error);
      // No uses document.write, puede borrar todo el DOM y no es recomendable
      swal({
        title: "Advertencia",
        text: error.message || error,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    });
}
