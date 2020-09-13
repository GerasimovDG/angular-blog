import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/post.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.less']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  subs$: Subscription = new Subscription();

  searchStr = '';

  constructor(private postService: PostService,
              private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.subs$.add(this.postService.getAll().subscribe( posts => {
      this.posts = posts;
    }));
  }

  ngOnDestroy(): void {
    if (this.subs$) {
      this.subs$.unsubscribe();
      this.subs$ = null;
    }
  }

  remove(id: string): void {
    this.subs$.add(this.postService.remove(id).subscribe( () => {
      this.posts =  this.posts.filter( post => post.id !== id);
      this.alertService.success('Пость удален');
    }, () => {
      this.alertService.danger('Что-то пошло не так');
    }));
  }
}
