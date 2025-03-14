import { Terminal as Term } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links'
import { ClipboardAddon } from '@xterm/addon-clipboard'
import { SerializeAddon } from '@xterm/addon-serialize'
export class Terminal extends HTMLElement {
    fitAddon = new FitAddon();
    webLinksAddon = new WebLinksAddon();
    clipboardAddon = new ClipboardAddon();
    serializeAddon = new SerializeAddon();
    xterm: Term | undefined
    ws: WebSocket | undefined
    connectedCallback() {
        console.log('connected')
        this.xterm = new Term({
            cols: 80,
            rows: 24,
        });
        this.xterm.open(this);
        this.xterm.attachCustomKeyEventHandler(e => {
            return this.attachCustomKeyEventHandler(e);
        })
        this.loadAddons();
        this.xterm.onData((data) => {
            this.ws && this.ws.send(JSON.stringify({
                type: 'input',
                data
            }));
        });
        this.fit();

    }
    fit() {
        if (!this.xterm) return;
        this.fitAddon.fit();
        if (!this.ws || !this.ws.readyState) return;
        this.ws.send(JSON.stringify({
            type: 'resize',
            data: {
                cols: this.xterm.cols,
                rows: this.xterm.rows
            }
        }));

    }
    loadAddons() {
        if (!this.xterm) return;
        this.xterm.loadAddon(this.clipboardAddon);
        this.xterm.loadAddon(this.webLinksAddon);
        this.xterm.loadAddon(this.fitAddon);
        this.xterm.loadAddon(this.serializeAddon);
    }
    write(data: string) {
        if (!this.xterm) return;
        this.xterm.write(data, () => this.dispatchEvent(new CustomEvent('change')));
    }
    attachCustomKeyEventHandler(_: KeyboardEvent) {
        return true;
    }

}