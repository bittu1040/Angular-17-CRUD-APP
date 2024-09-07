import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { NgFor, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-github-user',
  standalone: true,
  imports: [NgFor, SlicePipe, FormsModule],
  templateUrl: './github-user.component.html',
  styleUrl: './github-user.component.scss'
})
export class GithubUserComponent {

  user: any = null;
  errorMessage: string = '';
  isLoading: boolean = false;
  userName: string = '';
  repositories: any[] = [];
  reposPerPage: number = 10;

  constructor(private githubUserService: DataService) {} 

  ngOnInit(): void {
    this.searchUser("bittu1040");
  }

  searchUser(username: string) {
    if (username) {
      this.isLoading = true;
      this.userName = username;
      this.githubUserService.getGithubUserDetails(this.userName).subscribe({
        next: (response: any) => {
          this.user = response;
          this.isLoading = false;
          this.errorMessage = '';
          this.getRepositories(this.userName, this.reposPerPage);
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

  getRepositories(username: string, perPage: number) {
    this.githubUserService.getUserRepos(username, perPage).subscribe({
      next: (response: any) => {
        this.repositories = response;
        this.isLoading = false;
        this.errorMessage = '';
      },
    })
  }

  onReposPerPageChange(event: any) {
    this.getRepositories(this.userName, event.target.value);
  }

}
