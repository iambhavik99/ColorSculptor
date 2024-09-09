import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-palettes',
  templateUrl: './palettes.component.html',
  styleUrls: ['./palettes.component.css']
})
export class PalettesComponent implements OnInit {
  private baseColors = [
    "#FF5733", // Red
    "#FFBD33", // Orange
    "#FFFF33", // Yellow
    "#75FF33", // Green
    "#33FFBD", // Aqua
    "#33C1FF", // Blue
    "#8A33FF", // Purple
    "#FF33D4", // Pink
    "#FF3381", // Magenta
  ];
  palette: string[][] = [];


  ngOnInit(): void {
    // Generate 9 shades for each base color
    for (let i = 0; i < this.baseColors.length; i++) {
      const shades: string[] = [];
      for (let j = 0; j < 9; j++) {
        const shade = this.shadeColor(this.baseColors[i], j * 10); // Modify the percentage as needed
        shades.push(shade);
      }
      this.palette.push(shades);
    }

  }

  copyToClipboard(colorCode: string, element: any) {
    navigator.clipboard.writeText(colorCode).then(() => {
      element.innerHTML = `<svg
                class="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>`;

      setTimeout(() => {
        element.innerHTML = colorCode;
      }, 2000);
    });
  }


  rgbToHex(r: number, g: number, b: number): string {
    return (
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()
    );
  }

  shadeColor(color: string, percent: number): string {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.min(255, Math.max(0, R + Math.round((percent / 100) * (255 - R))));
    G = Math.min(255, Math.max(0, G + Math.round((percent / 100) * (255 - G))));
    B = Math.min(255, Math.max(0, B + Math.round((percent / 100) * (255 - B))));

    return this.rgbToHex(R, G, B);
  }

}
