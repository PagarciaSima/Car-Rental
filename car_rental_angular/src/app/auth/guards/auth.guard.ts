import { CanActivateFn, Router } from "@angular/router";
import { StorageService } from "../services/storage/storage.service";
import { inject } from "@angular/core";


export const authGuard: CanActivateFn = () => {
  if (StorageService.isTokenExpired()) {
    console.log("Token expirado. Redirigiendo a login...");
    StorageService.logout();
    const router = inject(Router);
    router.navigate(['login']);
    return false;
  }
  console.log("Token válido. Acceso permitido.");
  return true; // Permite el acceso a la ruta
};

