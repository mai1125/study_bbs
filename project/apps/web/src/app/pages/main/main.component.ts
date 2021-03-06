import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { API_ENDPOINT } from '@interface/controllers';
import { Thread } from '@interface/entities';
import { Router } from '@angular/router';
import { PAGE } from '../../app-routig.module';

@Component({
  selector: 'project-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  threads: Thread[] = [];

  constructor(private apiService: ApiService, public router: Router) {}

  async ngOnInit(): Promise<void> {
    const url = API_ENDPOINT.THREAD_ALL;
    await this.apiService
      .get(url)
      .toPromise()
      .then((i) => {
        this.threads = i as Thread[];
      });
  }

  /**
   * 各カテゴリーのページへ遷移
   */
  onClick(id: Thread): void {
    this.router.navigate([PAGE.THREAD], {
      queryParams: { id: id.id },
      queryParamsHandling: 'merge',
    });
  }
}
