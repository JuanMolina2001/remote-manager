export class Screen extends HTMLElement {
    canvas = document.createElement('canvas');
    ctx = this.canvas.getContext('2d');
    img = new Image();
    connectedCallback() {
        this.classList.add('w-fit', 'h-fit', 'block');
        this.appendChild(this.canvas);

    }
    render(data: string) {
        const blob = this.base64ToBlob(data, 'image/png');
        const url = URL.createObjectURL(blob);
        this.img.src = url;
        this.img.onload = () => {
            console.log(this.img.width, this.img.height);
            this.canvas.width = this.img.width / 1.5;
            this.canvas.height = this.img.height / 1.5;
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx?.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
        }


    }
    base64ToBlob(base64: Base64URLString, mimeType: string): Blob {
        const byteCharacters = atob(base64);
        const byteNumbers = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        return new Blob([byteNumbers], { type: mimeType });
    }
}