import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

interface Point {
  x: number;
  y: number;
}

interface FlexPieData {
  Value: number;
  Color: string;
}

@Component({
  selector: 'app-flex-pie',
  templateUrl: './flex-pie.component.html',
  styleUrls: ['./flex-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlexPieComponent implements OnInit {
  private chartData: FlexPieData[] = [
    { Value: 67, Color: 'blue' },
    { Value: 45, Color: 'green' },
    { Value: 120, Color: 'yellow' },
    { Value: 90, Color: 'red' }
  ];
  @Input()
  ChartRadius = 70;

  @Input()
  get ChartData(): FlexPieData[] {
    return this.chartData;
  }
  set ChartData(value: FlexPieData[]) {
    this.chartData = value;
    this.prepareChartParts();
  }

  ChartParts = [];

  ngOnInit() {
    this.prepareChartParts();
  }

  private describePath(x, y, radius, startAngle, endAngle): string {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
      'M', this.ChartRadius, this.ChartRadius,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');

    return d;
  }

  private getPathDescription(startAngle: number, endAngle: number) {
    return this.describePath(this.ChartRadius, this.ChartRadius, this.ChartRadius, startAngle, endAngle);
  }

  private polarToCartesian(centerX, centerY, radius, angleInDegrees): Point {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  private prepareChartParts() {
    this.ChartParts = [];
    let prevAngle = 0;
    for (const data of this.ChartData) {
      const newAngle = prevAngle + data.Value;
      this.ChartParts.push(this.getPathDescription(prevAngle, newAngle));
      prevAngle = newAngle;
    }
  }
}
