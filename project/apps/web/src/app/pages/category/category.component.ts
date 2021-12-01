import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { API_ENDPOINT } from 'apps/common/interfaces/interface/controller/endpoints.interface';
import { Category } from 'apps/common/interfaces/interface/entities/category.interface';
import { ApiService } from '../../service/api.service';
import { HttpParams } from '@angular/common/http';
import { Thread } from 'apps/common/interfaces/interface/entities/thread.interface';
import { PAGE } from '../../app-routig.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BoardCreate } from '../../../../../common/interfaces/interface/controller/board.interface';

@Component({
  selector: 'project-ctegory',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  category!: Category;
  display = false;

  createForm = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    editkey: new FormControl('', Validators.required),
  });

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  /**
   * クエリパラメーターを取得
   */
  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.getCategory(params.id);
    });
  }

  /**
   * コンポーネントを離れる時にsubscribeを破棄
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * カテゴリーの値を取得
   */
  async getCategory(id: number): Promise<void> {
    const url = API_ENDPOINT.CATEGORY;
    const options = {
      params: new HttpParams().set('id', id),
    };
    await this.apiService
      .get(url, options)
      .toPromise()
      .then((i) => (this.category = i as Category));
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

  /**
   * 新規投稿用Modal
   */
  createModal(): void {
    this.display = true;
  }

  /**
   * 新規投稿送信
   */
  create(): void {
    const req: BoardCreate = {
      title: this.createForm.value.title,
      name: this.createForm.value.name,
      text: this.createForm.value.text,
      editkey: this.createForm.value.editkey,
      cid: { id: this.category.id } as Category,
    };
    this.apiService
      .post<BoardCreate, ''>(API_ENDPOINT.MESSAGE, req)
      .subscribe();
    this.display = false;
  }
}
