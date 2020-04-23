import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {faClock, faComment} from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  state,
  style,
  animate,
  transition, query, stagger,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          style({ left: 0, opacity: 1}),
          stagger(100, [
            animate('1s', style({ left: -2000, opacity: 0 }))
          ])
        ], {optional: true}),
        query(':enter', [
          style({ left: 2000, opacity: 0}),
          stagger(200, [
            animate('1s ease', style({ left: 0, opacity: 1}))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class PostListComponent implements OnInit {

  clockIcon = faClock;
  commentIcon = faComment;

  postPreviews: Array<PostPreview> = [];
  numberOfPosts: number;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts')
      .subscribe((res: any) => {
        this.numberOfPosts = res.found;
        (res.posts as Array<any>).forEach(post => this.postPreviews.push({
          ID: post.ID,
          date: post.date,
          author: {name: post.author.name, avatarUrl: post.author.avatar_URL},
          title: post.title,
          excerpt: post.excerpt,
          postThumbnailUrl: post.post_thumbnail ? post.post_thumbnail.URL : '',
          commentCount: post.discussion.comment_count
        }));
      });
  }

  loadNextPage(dara) {
   console.log(dara);
  }
}

interface PostPreview {
  ID: number;
  date: string;
  author: {name: string, avatarUrl: string};
  title: string;
  excerpt: string;
  postThumbnailUrl: string;
  commentCount: number;
}

