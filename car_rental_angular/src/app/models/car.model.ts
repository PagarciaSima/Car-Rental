export interface CarDto {
  id?: number;               // El signo de interrogación indica que es opcional
  brand: string;
  color: string;
  name: string;
  type: string;
  transmission: string;
  description: string;
  price: number;
  year: Date;
  image?: File;
  returnedImage?: Uint8Array;
}
