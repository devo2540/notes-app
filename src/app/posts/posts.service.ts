import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = []
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable(); // returns object we can listen to
    }

    addPost(title: string, content: string) {
        const post: Post = { title: title, content: content };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]); // emit new value (copy of posts after updated)
    }
}