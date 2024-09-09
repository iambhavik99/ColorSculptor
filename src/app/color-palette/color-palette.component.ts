import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css'],
})
export class ColorPaletteComponent implements OnInit {
  baseColor: string = '#123456';
  shades: string[] = [];
  linearGradient: string = '';
  paletteRange: number = 30;
  hueRange: number = 0;
  lightnessRange: number = 30;
  gradientDirection: string = 'to right';
  hoverIcon: boolean[] = Array(7).fill(false);
  showCopiedText: boolean[] = Array(7).fill(false);
  isCopied!: boolean;

  ngOnInit(): void {
    this.generateShades();
  }

  mouseEnter(index: number) {
    this.hoverIcon[index] = true;
  }
  mouseLeave(index: number) {
    this.showCopiedText[index] = false;
    this.hoverIcon[index] = false;
  }

  onRangeChange() {
    this.generateShades();
  }

  onLightnessRange() {
    this.updateBaseColorWithLightness();
    this.generateShades();
  }

  onHueRangeChange() {
    this.updateBaseColorWithHue();
    this.generateShades();
  }

  onColorSelects(colorCode: string) {
    this.baseColor = colorCode;
    this.generateShades();
  }

  copyToClipboard(item: string, index: number) {
    navigator.clipboard.writeText(item).then(() => {
      this.showCopiedText[index] = true;
      this.hoverIcon[index] = false;

      setTimeout(() => {
        this.showCopiedText[index] = false;
        this.hoverIcon[index] = true;
      }, 2000);
    });
  }

  async copyGradient() {
    await navigator.clipboard.writeText(this.linearGradient);
    this.isCopied = true

    setTimeout(() => {
      this.isCopied = false;
    }, 1000);

  }

  setRandomDirectionForLinear(): void {
    const directionsForLinear = [
      'to right', 'to bottom', 'to left', 'to top',
      'to top right', 'to bottom left', 'to bottom right', 'to top left'
    ];
    this.gradientDirection = directionsForLinear[Math.floor(Math.random() * directionsForLinear.length)];

    // Use the predefined direction for the linear gradient
    this.linearGradient = `linear-gradient(${this.gradientDirection}, ${this.shades.join(', ')})`;
  }

  updateBaseColorWithLightness(): void {
    const hsl = this.hexToHSL(this.baseColor);
    hsl.l = this.lightnessRange;
    this.baseColor = this.HSLToHex(hsl.h, hsl.s, hsl.l);
  }

  updateBaseColorWithHue(): void {
    const hsl = this.hexToHSL(this.baseColor);
    hsl.h = this.hueRange;
    this.baseColor = this.HSLToHex(hsl.h, hsl.s, hsl.l);
  }

  generateShades(): void {
    this.shades = [];
    const hsl = this.hexToHSL(this.baseColor);

    // Generate 6 shades
    for (let i = 0; i < 7; i++) {
      const shade = this.calculateShade(hsl, i);
      this.shades.push(this.HSLToHex(shade.h, shade.s, shade.l));
    }

    // Use the predefined direction for the linear gradient
    this.linearGradient = `linear-gradient(${this.gradientDirection}, ${this.shades.join(', ')})`;
  }



  calculateShade(baseHSL: { h: number, s: number, l: number }, index: number): { h: number, s: number, l: number } {
    let h = baseHSL.h;
    let s = baseHSL.s;
    let l = baseHSL.l;

    // Lightness calculation
    const darkestL = Math.max(l - (this.paletteRange - 50) / 2, 0);
    const lightestL = 100;
    l = darkestL + (index / 6) * (lightestL - darkestL);
    l = Math.min(Math.max(l, 0), 100); // Ensure lightness stays within [0, 100]

    // Saturation adjustment
    s = s + (5 - index) * 20;
    s = Math.min(Math.max(s, 0), 100); // Ensure saturation stays within [0, 100]

    return { h, s, l };
  }

  hexToHSL(hex: string): { h: number, s: number, l: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) throw new Error('Could not parse Hex Color');

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    } else {
      s = 0;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  HSLToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }


}
