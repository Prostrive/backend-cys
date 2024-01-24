import { Cities, VehicleType } from '@prisma/client';

export class RegisterDriverDto {
  userId: string;
  image: Blob;
  city: Cities;
  vehicleType: VehicleType;
  dateOfBirth: Date;
  phoneNumber: string;
}
