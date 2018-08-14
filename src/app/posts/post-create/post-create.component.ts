import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredValue = 'Type your post here';
  newPost = '';
  
  onAddPost() {
    this.newPost = this.enteredValue;
  }

  constructor() { }

  ngOnInit() {
  }

}
