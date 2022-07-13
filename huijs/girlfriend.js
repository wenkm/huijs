export default class Girlfriend {
    constructor(options) {
        this.options = options;
        this.girlFriend = '';
        this.img = new Image();
        this.initOptions();
    }
    generate() {
        this.initDom();
    }
    initOptions() {
        this.options = Object.assign({
            girl: 1,
            size: 200,
            dpi: 6,
            color: true
        }, this.options);
        this.initDom();
    }
    initDom() {
        const canvas = document.createElement('canvas')
        this.ctx = canvas.getContext('2d');
        this.start()
    }
    start() {
        this.img.src = `../assets/images/${this.options.girl}.jpeg`;
        this.img.onload = () => {
            const rate = this.img.width / this.img.height;
            if (rate > 1) {
                this.img.width = this.options.size;
                this.img.height = this.options.size / rate;
            } else {
                this.img.width = this.options.size / rate;
                this.img.height = this.options.size;
            }
            
            this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
            this.getPixels();
        }
    }
    getPixels() {
        const pixels = this.ctx.getImageData(0, 0, this.img.width, this.img.height);
        this.pixels = pixels;
        const imgData = this.ctx.getImageData(0, 0, this.img.width, this.img.height);
        const size = 8 - this.options.dpi;
        for (let i = 0; i < this.img.width; i = i + size) {
            for (let j = 0; j < this.img.height; j = j + size) {
                const curPoint = (i * this.img.width + j) * 4; // ×4是因为，1为r，2为g，3为b，4为a，四个是一组rgba值
                const [r, g, b] = imgData.data.slice(curPoint, curPoint + 3);

                const gray = r * 0.3 + g * 0.6 + b * 0.1; // 计算灰度值
                const color = `rgb(${r},${g},${b})`; // 保存像素点rgb值
                this.options.color ? this.toText(gray, color) : this.toText(gray); // 有颜色就转化rgb值，没颜色就不转
            }
            this.girlFriend += '</br>';
        }
    }
    toText(g, color) {
        color ?? (this.girlFriend += `<span style='color:${color}'>`);
        if (g <= 40) this.girlFriend += '？';
        else if (g > 40 && g <= 80) this.girlFriend += '》';
        else if (g > 80 && g <= 120) this.girlFriend += '！';
        else if (g > 120 && g <= 160) this.girlFriend += '：';
        else if (g > 160 && g <= 200) this.girlFriend += '～';
        else if (g > 200 && g <= 240) this.girlFriend += '；';
        else this.girlFriend += '。';
        if (color) this.girlFriend += '</span>';
    }
    generate() {
        return this.girlFriend;
    }
}
