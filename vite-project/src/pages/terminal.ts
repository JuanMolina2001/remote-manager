
import { Terminal, Screen } from '@/components'
window.customElements.define('terminal-component', Terminal);
window.customElements.define('screen-component', Screen);

export function terminalPage(app: HTMLElement) {

    // const terminal = document.createElement('terminal-component') as Terminal;
    // app.appendChild(terminal);
    const ws = new WebSocket('ws://192.168.18.248:5000/');
    const screen = document.createElement('screen-component') as Screen;
    app.appendChild(screen);
    
    screen.addEventListener('mousemove', (event) => {
        // Obtener la posición del elemento en la página
        const rect = screen.getBoundingClientRect();

        // Calcular la posición del mouse relativa al elemento
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        ws.send(JSON.stringify({ type: 'mouse', data: { x, y } }));
    });
    ws.onmessage = (e) => {
        const message = JSON.parse(e.data);
        if (message.type === 'image') {
            screen.render(message.data);
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