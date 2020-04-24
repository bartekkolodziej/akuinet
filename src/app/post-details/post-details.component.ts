import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post = {
    title: null,
    content: null,
    thumbnailUrl: null,
    date: null,
    author: {name: null, avatarUrl: null},
    comments: []
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const postID = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/${postID}`)
      .subscribe((res: any) => {
        this.post.title = res.title;
        this.post.content = res.content;
        this.post.thumbnailUrl = res.post_thumbnail.URL;
        this.post.date = res.date;
        this.post.author = {name: res.author.name, avatarUrl: res.author.avatar_URL};

        this.http.get(`https://public-api.wordpress.com/rest/v1/sites/en.blog.wordpress.com/posts/${postID}/replies/`)
          .subscribe((response: any) => {
            this.post.comments = response.comments;
          });
      });
  }
}
