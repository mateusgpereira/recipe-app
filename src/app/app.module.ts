import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthInterceptorService } from './auth/auth-interceptor.service'
import { AuthModule } from './auth/auth.module'
import { HeaderComponent } from './header/header.component'
import { RecipeModule } from './recipes/recipe.module'
import { SharedModule } from './shared/shared.module'
import ShoppingListService from './shopping-list/services/shopping-list.services'
import { ShoppingListModule } from './shopping-list/shopping-list.module'

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipeModule,
    ShoppingListModule,
    SharedModule,
    AuthModule
  ],
  providers: [
    ShoppingListService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
