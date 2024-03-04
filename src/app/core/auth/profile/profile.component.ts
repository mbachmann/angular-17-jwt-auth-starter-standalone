import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_shared/_services/storage.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor],
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
}
