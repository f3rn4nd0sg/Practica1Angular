import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet, RouterLink } from '@angular/router'; // Importa Router para redirección
import {SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink,RouterOutlet,RouterModule,SweetAlert2Module],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
constructor(private router: Router) {}

  tryLogin(user : string, password : string) {
    if (user === 'admin' && password === 'admin') {
      Swal.fire({
        title: 'Inicio sesión Correcto',
        icon: 'success',
        confirmButtonText: 'olé',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/mainApp']);
        }
      });

      
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Credenciales Incorrectas',
        icon: 'error',
        confirmButtonText: 'Bueno vale, lo vuelvo a intentar',
      })
    }
  }
}
