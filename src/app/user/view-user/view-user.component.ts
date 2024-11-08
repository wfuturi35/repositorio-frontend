import {Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {IUser, User} from "../user/user";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Subscription} from "rxjs";
import {MatDividerModule} from "@angular/material/divider";
import {FlexModule} from "@ngbracket/ngx-layout";

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FlexModule
  ],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent implements OnInit, OnChanges, OnDestroy {
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private routerEventsSubscription?: Subscription

  @Input() user!: IUser
  currentUser = new User()

  get editMode() {
    return !this.user
  }

  ngOnInit() {
    // assignment on initial render
    this.assignUserFromRoute()

    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      // assignment on subsequent renders
      if (event instanceof NavigationEnd) {
        this.assignUserFromRoute()
      }
    })
  }

  private assignUserFromRoute() {
    if (this.route.snapshot.data['user']) {
      this.currentUser = this.route.snapshot.data['user']
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentUser = User.Build(changes['user'].currentValue)
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription?.unsubscribe()
  }

  editUser(id: number) {
    this.router.navigate(['/user/profile', id]).then(r => r.valueOf())
  }
}
