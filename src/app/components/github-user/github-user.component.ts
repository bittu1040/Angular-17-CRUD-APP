import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-github-user',
  standalone: true,
  imports: [NgFor],
  templateUrl: './github-user.component.html',
  styleUrl: './github-user.component.scss'
})
export class GithubUserComponent {

  user: any = null;
  errorMessage: string = '';
  isLoading: boolean = false;
  repos: any[] = [];


  constructor(private githubUserService: DataService) {} 

  ngOnInit(): void {
    // this.searchUser("bittu1040");
  }

  searchUser(username: string) {
    if (username) {
      this.isLoading = true;
      this.githubUserService.getGithubUserDetails(username).subscribe({
        next: (response: any) => {
          this.user = response;
          this.isLoading = false;
          this.errorMessage = '';
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'User not found';
          this.user = null;
        }
      }
      );
    } else {
      this.errorMessage = 'Please enter a GitHub username';
      this.user = null;
    }
  }

}
