const scriptArea = document.getElementById('scriptArea');
const executeButton = document.getElementById('executeButton');
const clearConsoleButton = document.getElementById('clearConsoleButton');
const consoleOutput = document.getElementById('consoleOutput');
const downloadButton = document.getElementById('downloadButton');

// Variables para controlar la ejecución
let isRunning = false;
let intervalId = null;
let contador = 0;

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
    const scriptContent = scriptArea.value;
    
    if (isRunning) {
        // Detener el contador si está corriendo
        clearInterval(intervalId);
        intervalId = null;
        isRunning = false;
        executeButton.textContent = 'Ejecutar';
        executeButton.style.backgroundColor = 'rgb(117, 183, 41)';
        console.log('<span style="color: #223E69; font-weight: bold;">Ejecución detenida.</span>');
    } else {
        // Ejecutar el script del textarea
        console.log('<span style="color: #90EE90; font-weight: bold;">Ejecutando script...</span>');
        try {
            // Usar eval para ejecutar el código introducido en el textarea
            eval(scriptContent);
        } catch (error) {
            console.log(`<span style="color: #f33;"> Error: ${error.message}</span>`);
        }
        
        // Cambiar el estado del botón
        isRunning = true;
        executeButton.textContent = 'Detener';
        executeButton.style.backgroundColor = '#f33';
        
        // Iniciar el contador si no está corriendo
        if (intervalId === null) {
            contador = 0; // Reiniciar contador
            intervalId = setInterval(() => {
                contador++;
            }, 1000);
        }
    }
});

// Limpiar la consola
clearConsoleButton.addEventListener('click', () => {
    consoleOutput.innerHTML = '<p>Consola de salida:</p>';
});

// Descargar el script
downloadButton.addEventListener('click', () => {
    const scriptContent = scriptArea.value;
    const blob = new Blob([scriptContent], { type: 'application/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'script.js';
    link.click();
});

// Agregar tabulación al textarea
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
