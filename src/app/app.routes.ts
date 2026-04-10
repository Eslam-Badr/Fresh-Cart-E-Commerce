import { NotFoundComponent } from './features/not-found/not-found.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { SupportComponent } from './features/support/support.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { LoginComponent } from './core/auth/login/login.component';
import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { AllordersComponent } from './features/allorders/allorders.component';

export const routes: Routes = [
    
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component: HomeComponent},
    {path:'brands', component: BrandsComponent},
    {path:'product-details/:id', component: ProductDetailsComponent},
    {path:'categories', component: CategoriesComponent},
    {path:'checkout/:cartId', component: CheckoutComponent},
    {path:'forget-password', component: ForgetPasswordComponent},
    {path:'register', component: RegisterComponent},
    {path:'allorders/:userId', component: AllordersComponent},
    {path:'login', component: LoginComponent},
    {path:'cart', component: CartComponent},
    {path:'products', component: ProductsComponent},
    {path:'support', component: SupportComponent},
    {path:'wishlist', component: WishlistComponent},

    {path:'**', component: NotFoundComponent},

];
