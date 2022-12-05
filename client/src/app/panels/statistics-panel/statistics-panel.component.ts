import { ClientsService } from './../../_services/clients.service';
import { ClientOrdersStatistics } from './../../_models/statistics/ClientOrdersStatistics';
import { StatisticsService } from './../../_services/statistics.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Client } from 'src/app/_models/Client';
import { Router } from '@angular/router';

interface Result {
  name: string;
  value: number;
  extra?: {
    client: Client;
  };
}

@Component({
  selector: 'app-statistics-panel',
  templateUrl: './statistics-panel.component.html',
  styleUrls: ['./statistics-panel.component.css']
})
export class StatisticsPanelComponent implements OnInit {
  constructor(
    private statisticsService: StatisticsService,
    private clientsService: ClientsService,
    private router: Router
  ) {}
  stats: ClientOrdersStatistics[] = [];
  results: Result[] = [];
  topSizes: number[] = [5, 10, 20];
  selectedNumber: number = 10;

  ngOnInit(): void {
    this.loadStatistics(this.selectedNumber);
  }

  loadStatistics(clientsNumber: number) {
    this.statisticsService.getMostPopularClients(clientsNumber).subscribe((clientsStats) => {
      this.stats = clientsStats;
      // Prepare requests
      let observableArray = this.stats.map((stat) =>
        this.clientsService.getClient(stat.clientId, true)
      );

      // Clients requests
      forkJoin<Client[]>(observableArray).subscribe((responses) => {
        this.stats = this.stats.map((stat, index) => ({ ...stat, client: responses[index] }));
        this.results = this.stats.map((stat) => ({
          name: this.clientToString(stat.client),
          value: stat.ordersCount,
          extra: { client: stat.client }
        }));
      });
    });
  }

  clientToString(client: Client): string {
    return client.type === 'company'
      ? client.companyName
      : client.firstname + ' ' + client.lastname;
  }

  onSelect(result: Result) {
    if (result?.extra?.client) {
      this.router.navigateByUrl(`/clients/${result.extra.client.id}`);
    }
  }

  onSelectionChange() {
    this.loadStatistics(this.selectedNumber);
  }

  yAxisTickFormatting = (value: number) => value;
}
