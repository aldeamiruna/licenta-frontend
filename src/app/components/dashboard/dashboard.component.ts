import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import Item from 'src/app/models/Item';
import { DashboardService } from 'src/app/services/DashboardService/dashboard.service';

import * as CanvasJS from '../dashboard/canvasjs.min.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ctx: string = 'gogoasaMea';
  donutChart: Chart;
  items: Item[];
  config: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: ['Available', 'On service', 'Broken', 'Assigned'],
      datasets: [{
        label: '# of items',
        data: [],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    }
  }

  constructor(private service: DashboardService) { }
  async ngOnInit() {
    this.config.data.datasets[0].data = await this.datasetByState();
    this.donutChart = new Chart(this.ctx, this.config);
    this.items = await this.recentAssets();

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Colum Chart for Item Types"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Tastatura" },
          { y: 55, label: "Casetiera" },
          { y: 50, label: "Masa" },
          { y: 65, label: "Scaun" },
          { y: 95, label: "Monitor" },
          { y: 68, label: "Laptop" },
          { y: 28, label: "Dulap" },
          { y: 34, label: "Tabla" },
          { y: 14, label: "Imprimanta" }
        ]
      }]
    });
      
    chart.render();
  }

  async datasetByState(): Promise<number[]> {
    let response = await this.service.fetchDatasetByStatus();
    if (response["message"] != "Success") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  async recentAssets(): Promise<Item[]> {
    let response = await this.service.fetchRecentAssets();
    if (response["message"] != "Success") {
      return;
    }
    if (response["message"] == "Success") {
      
      return response["output"];
    }
  }

}
