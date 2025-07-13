import { Component } from '@angular/core';
import { LandingHeaderComponent } from "../header/header.component";
import { LandingHeroComponent } from "../hero/hero.component";
import { LandingFeaturesComponent } from "../features/features.component";
import { LandingHowItWorksComponent } from "../how-it-works/how-it-works.component";
import { LandingWhyChooseComponent } from "../why-choose/why-choose.component";
import { LandingTestimonialsComponent } from "../testimonials/testimonials.component";
import { LandingFooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-landingpage',
  imports: [LandingHeaderComponent, LandingHeroComponent, LandingFeaturesComponent, LandingHowItWorksComponent, LandingWhyChooseComponent, LandingTestimonialsComponent, LandingFooterComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

}
