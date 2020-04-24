import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {faClock, faComment} from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  style,
  animate,
  transition, query, stagger
} from '@angular/animations';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition('* => *', [
        query(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          stagger(-50, [
            animate('0.5s ease', style({transform: 'translateX(-2000px)', opacity: 0}))
          ])
        ], {optional: true}),
        query(':enter', [
          style({transform: 'translateX(2000px)', opacity: 0}),
          stagger(200, [
            animate('1s ease', style({transform: 'translateX(0)', opacity: 1}))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class PostListComponent implements OnInit {

  page = 1;
  clockIcon = faClock;
  commentIcon = faComment;

  postPreviews: Array<PostPreview> = [];
  numberOfPosts: number;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(page = 1): void {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'} as ScrollOptions);
    this.postPreviews = [];
    this.http.get(`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/?page=${page}&number=5`)
      .subscribe((res: any) => {
        if (!this.numberOfPosts) {
          this.numberOfPosts = res.found;
        }
        (res.posts as Array<any>).forEach(post => this.postPreviews.push({
          ID: post.ID,
          date: post.date,
          author: {name: post.author.name, avatarUrl: post.author.avatar_URL},
          title: post.title,
          excerpt: post.excerpt,
          content: '',
          thumbnailUrl: post.post_thumbnail ? post.post_thumbnail.URL : '',
          commentCount: post.discussion.comment_count,
        }));
      });
  }
}

interface PostPreview {
  ID: number;
  date: string;
  author: { name: string, avatarUrl: string };
  title: string;
  excerpt: string;
  content: string;
  thumbnailUrl: string;
  commentCount: number;
}

