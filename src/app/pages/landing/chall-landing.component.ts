import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { LayoutService } from 'src/app/core/layout/service/app.layout.service';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import {CommonModule} from "@angular/common";
import {ChartModule} from "primeng/chart";
import {PanelModule} from "primeng/panel";
import {RippleModule} from "primeng/ripple";

@Component({
    selector: 'app-chall-landing',
    templateUrl: './chall-landing.component.html',
    standalone: true,
  imports: [
    StyleClassModule,
    RouterModule,
    ButtonModule,
    DividerModule,
    CommonModule,
    ChartModule,
    PanelModule,
    RippleModule,
  ]
})
export class ChallLandingComponent {

    constructor(public layoutService: LayoutService, public router: Router) { }

}
