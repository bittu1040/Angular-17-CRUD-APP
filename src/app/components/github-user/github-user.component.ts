import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { NgFor, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-user',
  standalone: true,
  imports: [NgFor, SlicePipe, FormsModule, NgbPagination],
  templateUrl: './github-user.component.html',
  styleUrl: './github-user.component.scss'
})
export class GithubUserComponent {

  @ViewChild('usernameInput', { static: true }) usernameInput!: ElementRef;

  user: any = null;
  errorMessage: string = '';
  isLoading: boolean = false;
  userName: string = '';
  repositories: any[] = [];
  reposPerPage: number = 10;     // Repos per page (default 10)
  currentPage: number = 1;       // Current page number
  totalRepos: number = 0;        // Total repositories (for pagination)

  constructor(private githubUserService: DataService) {}

  private router= inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const username = params.get('username');
      console.log(username);
      if (username) {
        this.usernameInput.nativeElement.value = username;
        this.searchUser(username);
      }
    });
    // Example: You can call this to load a user initially
    // this.searchUser("bittu1040");
  }

  // Method to search GitHub user
  searchUser(username: string) {
    if (username) {
      this.isLoading = true;
      this.userName = username;
      this.router.navigate(['/github-user', username]);
      this.githubUserService.getGithubUserDetails(this.userName).subscribe({
        next: (response: any) => {
          this.user = response;
          this.isLoading = false;
          this.errorMessage = '';
          this.totalRepos = response.public_repos; // Set total repos for pagination
          this.getRepositories(this.userName, this.reposPerPage, this.currentPage); // Load first page of repos
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'User not found';
          this.user = null;
          this.repositories = [];
        }
      });
    } else {
      this.errorMessage = 'Please enter a GitHub username';
      this.user = null;
      this.repositories = [];
    }
  }

  // Method to get repositories with pagination
  getRepositories(username: string, perPage: number, page: number) {
    this.githubUserService.getUserRepos(username, perPage, page).subscribe({
      next: (response: any) => {
        this.repositories = response;
        this.isLoading = false;
        this.errorMessage = '';
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error fetching repositories';
        this.repositories = [];
      }
    });
  }

  // Handle repos per page change
  onReposPerPageChange(event: any) {
    this.reposPerPage = event.target.value;
    this.currentPage = 1;  // Reset to first page on perPage change
    this.getRepositories(this.userName, this.reposPerPage, this.currentPage);
  }

  // Handle page change for pagination
  onPageChange(page: number) {
    this.currentPage = page;
    this.getRepositories(this.userName, this.reposPerPage, this.currentPage);
  }
}

