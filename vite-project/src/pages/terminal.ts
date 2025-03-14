
import { Terminal } from '@/components/terminal'
import { Base64 } from '@xterm/addon-clipboard';
window.customElements.define('terminal-component', Terminal);

export function terminalPage(app: HTMLElement) {
    function base64ToBlob(base64: Base64URLString, mimeType: string): Blob {
        const byteCharacters = atob(base64); // Decodificar Base64
        const byteNumbers = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        return new Blob([byteNumbers], { type: mimeType });
    }
    // const terminal = document.createElement('terminal-component') as Terminal;
    // app.appendChild(terminal);
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    app.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const ws = new WebSocket('ws://localhost:5000/');
    // terminal.ws = ws;
    const img = new Image();
    let load = false
    
    ws.onmessage = (e) => {
        const message = JSON.parse(e.data);
        if (message.type === 'image') {
            const blob = base64ToBlob(message.data, 'image/png');
            const url = URL.createObjectURL(blob);
            img.src = url;
            
            img.onload = () => {
                ctx?.clearRect(0, 0,canvas.width, canvas.height);
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
          
        }
        // if (message.type === 'output') {
        //     terminal.write(message.data);
        // }
    }
    ws.onerror = (e) => {
        console.error('Error en WebSocket:', e);
    };

    ws.onclose = (e) => {
        console.log('WebSocket cerrado:', e);
    };
    window.onresize = () => {
        // terminal.fit();
    }

}