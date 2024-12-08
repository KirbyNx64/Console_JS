// Variables globales
let contador = 0;
let intervalo = null; // Controla el intervalo
let isRunning = false; // Estado del botón

const scriptArea = document.getElementById('scriptArea');
const executeButton = document.getElementById('executeButton');
const clearConsoleButton = document.getElementById('clearConsoleButton');
const consoleOutput = document.getElementById('consoleOutput');
const downloadButton = document.getElementById('downloadButton');

// Redefinir console.log para mostrar en la consola personalizada
(function () {
    const originalLog = console.log;
    console.log = function (...args) {
        args.forEach(arg => {
            consoleOutput.innerHTML += `<p>&gt; ${arg}</p>`;
        });
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
        originalLog.apply(console, args);
    };
})();

// Botón de ejecutar/detener
executeButton.addEventListener('click', () => {
    if (isRunning) {
        // Detener el contador
        clearInterval(intervalo);
        intervalo = null;
        isRunning = false;
        executeButton.textContent = 'Ejecutar';
        executeButton.style.backgroundColor = 'rgb(117, 183, 41)';
        consoleOutput.innerHTML += `<p>&gt; <span style="color: #f33; font-weight: bold;">Ejecución detenida.</span></p>`;
    } else {
        // Iniciar el contador
        isRunning = true;
        executeButton.textContent = 'Detener';
        executeButton.style.backgroundColor = '#f33';
        consoleOutput.innerHTML += `<p>&gt; <span style="color: #1f9; font-weight: bold;">Iniciando contador...</span></p>`;
        contador = 0; // Reiniciar el contador
        intervalo = setInterval(() => {
            contador++;
            console.log(`Contador: ${contador}`);
        }, 1000);
    }
});

// Botón para limpiar la consola
clearConsoleButton.addEventListener('click', () => {
    consoleOutput.innerHTML = '<p>Consola de salida:</p>';
});

// Botón para descargar el código del textarea como archivo .js
downloadButton.addEventListener('click', () => {
    const scriptContent = scriptArea.value;
    const blob = new Blob([scriptContent], { type: 'application/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'script.js';
    link.click();
});

// Agregar tabulación en el textarea
scriptArea.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        const cursorPos = scriptArea.selectionStart;
        const textBeforeCursor = scriptArea.value.slice(0, cursorPos);
        const textAfterCursor = scriptArea.value.slice(cursorPos);
        scriptArea.value = textBeforeCursor + '    ' + textAfterCursor;
        scriptArea.selectionStart = scriptArea.selectionEnd = cursorPos + 4;
    }
});
