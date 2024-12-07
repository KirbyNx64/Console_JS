const scriptArea = document.getElementById('scriptArea');
const executeButton = document.getElementById('executeButton');
const clearConsoleButton = document.getElementById('clearConsoleButton');
const consoleOutput = document.getElementById('consoleOutput');
const downloadButton = document.getElementById('downloadButton');

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

executeButton.addEventListener('click', () => {
    const scriptContent = scriptArea.value;
    consoleOutput.innerHTML += `<p>&gt; <span style="color: #1f9; font-weight: bold;">Ejecutando script...</span></p>`;
    try {
        const result = eval(scriptContent);
        if (result !== undefined) {
            consoleOutput.innerHTML += `<p>${result}</p>`;
        }
    } catch (error) {
        consoleOutput.innerHTML += `<p style="color: #f33;">Error: ${error.message}</p>`;
    }
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
});

clearConsoleButton.addEventListener('click', () => {
    consoleOutput.innerHTML = '<p>Consola de salida:</p>';
});

downloadButton.addEventListener('click', () => {
    const scriptContent = scriptArea.value;
    const blob = new Blob([scriptContent], { type: 'application/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'script.js';
    link.click();
});

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
