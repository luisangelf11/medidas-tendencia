const $input = document.getElementById('number'),
    $xi = document.getElementById('conjunto'),
    $media = document.getElementById('media'),
    $mediana = document.getElementById('mediana'),
    $g = document.getElementById('g'),
    $h = document.getElementById('h'),
    $moda = document.getElementById('moda'),
    $insert = document.getElementById('insert'),
    $delete = document.getElementById('delete'),
    $clear = document.getElementById('clear'),
    $success = document.getElementById('success');

let xi = [];

//Functions App Controls
const insertData = () => {
    let element = parseFloat($input.value);
    if(isNaN(element)){
     alert('Por favor, solo introduzca valores numéricos');
    }else{
        xi.push(element);
        if ($xi.textContent === "") $xi.textContent += `${element.toString()}`;
        else $xi.textContent += `, ${element.toString()}`
        $input.value = '';
    }
}

const deleteElement = () => {
    xi.pop();
    $xi.textContent = '';
    xi.forEach(element => {
        if ($xi.textContent === "") $xi.textContent += `${element.toString()}`;
        else $xi.textContent += `, ${element.toString()}`
    })
}

const clearApp = () => {
    $xi.textContent = "";
    xi = [];
    $input.value = "";
    $media.textContent = "0";
    $mediana.textContent = "0";
    $g.textContent = "0";
    $h.textContent = "0";
    $moda.textContent = "0";
}

//Fucntions (Medidas De Tendencia)
const getMedia = () => {
    let result = 0,
        sum = 0;
    for (let i = 0; i < xi.length; i++) {
        sum += xi[i];
    }
    result = sum / xi.length;
    $media.textContent = result;
}

const getMediana = () => {
  // Ordenar el arreglo
  let arregloOrdenado = xi.slice().sort((a, b)=> {
    return a - b;
  });
  let longitud = arregloOrdenado.length;
  let mediana;
  // Si la longitud del arreglo es impar, la mediana es el valor central
  if (longitud % 2 !== 0) {
    mediana = arregloOrdenado[Math.floor(longitud / 2)];
  } else {
    // Si la longitud del arreglo es par, la mediana es el promedio de los dos valores centrales
    let indiceMedio1 = longitud / 2 - 1;
    let indiceMedio2 = longitud / 2;
    mediana = (arregloOrdenado[indiceMedio1] + arregloOrdenado[indiceMedio2]) / 2;
  }
  $mediana.textContent = mediana;
}

const getMediaGeometrica = () => {
    let raiz = 0,
        datosMultiplicados = 0;
    //Validar si hay un elemnto con valor 0    
    for (let i = 0; i < xi.length; i++) {
        if (xi[i] === 0) return $g.textContent = `No se puede calcular`;
    }
    for (let i = 0; i < xi.length; i++) {
        if (datosMultiplicados === 0) datosMultiplicados = xi[i];
        else datosMultiplicados = datosMultiplicados * xi[i];
    }
    raiz = Math.pow(datosMultiplicados, 1 / xi.length);
    $g.textContent = raiz.toFixed(4);
}

const getMediaArmonica = () => {
    let result = 0,
        elementSum = 0;
    //Validar si hay un elemnto con valor 0    
    for (let i = 0; i < xi.length; i++) {
        if (xi[i] === 0) return $h.textContent = `No se puede calcular`;
    }
    for (let i = 0; i < xi.length; i++) {
        elementSum += (1 / xi[i])
    }
    result = xi.length / elementSum;
    $h.textContent = result.toFixed(4);
}

const getModa = () => {
    let frecuencia = {};
    // Contador para encontrar la frecuencia máxima
    let maxFrecuencia = 0;
    // Iterar sobre los datos y contar la frecuencia de cada elemento
    xi.forEach(element => {
        frecuencia[element] = (frecuencia[element] || 0) + 1;
        if (frecuencia[element] > maxFrecuencia) {
            maxFrecuencia = frecuencia[element];
        }
    });
    // Encontrar elementos con la frecuencia máxima (puede haber más de uno si hay empate)
    let moda = [];
    for (let element in frecuencia) {
        if (frecuencia[element] === maxFrecuencia) {
            moda.push(element);
        }
    }
    moda.map(el => $moda.textContent += `${el.toString()} `);
}

//Events
document.addEventListener('click', (e) => {
    if (e.target === $insert) insertData();
    if (e.target === $delete) deleteElement();
    if (e.target === $clear) clearApp();
    if (e.target === $success) {
        getMedia();
        getMediana();
        getMediaGeometrica();
        getMediaArmonica();
        getModa();
    }
});