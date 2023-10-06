import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Iproduct } from 'src/app/interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  constructor(private form: FormBuilder, private proService: ProductService, private router: ActivatedRoute, private nav: Router) {}

  mode: 'them' | 'cap nhat' = 'them';

  current!: Iproduct;
  async ngOnInit() {
    const { id } = this.router.snapshot.params;
    if(id) {
      this.mode = 'cap nhat';
      this.current = await lastValueFrom(this.proService.getProduct(id));
      this.productForm.patchValue(this.current);
    }
  }

  productForm = this.form.group({
    name: ['', Validators['required']],
    price: [0],
    image: ['']
  })

  async handleSubmit() {
    if(this.mode === 'them') {
      try {
        await lastValueFrom(this.proService.addProduct(this.productForm.value as Iproduct));
        alert("Added product successfully");
        this.nav.navigate(['/admin/dashboard']);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await lastValueFrom(this.proService.updateProduct({...this.current, ...this.productForm} as Iproduct));
        alert("Updated product successfully");
        this.nav.navigate(['/admin/dashboard']);
      } catch (error) {
        console.log(error);
      }
    }
  }


 }
