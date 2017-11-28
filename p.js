function ZyCompress(t, e) {
    this.t = t;
    this.format = e.format;
    this.size = e.size;
    this.width = e.width;
    this.imgPercent = 1;
}

ZyCompress.prototype = {
    constructor: ZyCompress,
    asyncCompress() {
        return new Promise((resolve) => {
            this.readFile().then(t => resolve(t));
        });
    },
    readFile() {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                const type = reader.result.split(';')[0].split('/')[1];
                img.src = reader.result;
                this.src = reader.result;
                this.type = type;
                this.readerLength = reader.result.length;
                this.total = e.total;
                this.img = img;
                resolve(this);
            };
            if (this.t.files && this.t.files[0]) {
                reader.readAsDataURL(this.t.files[0]);
            }
        });
    },
    judge() {
        return new Promise((resolve) => {
            if (this.width) {
                this.imgPercent = this.img.width > this.width ?
                    this.width / this.img.width : 1;
                this.imgCompress();
            } else if (this.type === this.format) {
                this.imgPercent = this.total > this.size * 1024 ?
                    Math.sqrt((this.size * 1024 * 0.88) / this.total) : 1;
                this.imgCompress();
            } else {
                this.imgCompress().then((l) => {
                    const size = (l * this.total) / this.readerLength;
                    if (size > this.size * 1024) {
                        this.img.src = this.src;
                        this.imgPercent = Math.sqrt((this.size * 1024 * 0.88) / size);
                        this.imgCompress();
                    }
                });
            }
            resolve(this.img.src);
        });
    },
    imgCompress() {
        return new Promise((resolve) => {
            const cw = this.img.width * this.imgPercent;
            const ch = this.img.height * this.imgPercent;
            const canvas = document.createElement('canvas');
            canvas.width = cw;
            canvas.height = ch;
            canvas.getContext('2d').drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, cw, ch);
            this.img.src = canvas.toDataURL(`image/${this.format}`, 1.0);
            resolve(canvas.toDataURL(`image/${this.format}`, 1.0).length);
        });
    }
};

Object.defineProperty(Object.prototype, 'compress', {
    value(e) {
        const zyCom = new ZyCompress(this, e);
        return new Promise((resolve) => {
            zyCom.asyncCompress().then((t) => {
                t.judge().then(t => resolve(t));
            });
        });
    },
    enumerable: false,
    configurable: true,
    writable: false
});
