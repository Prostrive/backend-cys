import { VehicleType } from '@prisma/client';
import { Cities } from '@prisma/client';

export class CreateDriverDto {
  userId: string;
  email: string;
  name: string;
  imageUrl: string;
  city: Cities;
  customerId: string;
  phoneNumber?: string;
  vehicleType: VehicleType;
  walletBalance: number;
  dateOfBirth: Date;
}

export class DriverResponseDto {
  orderId: string;
  driverId: string;
}
export class UpdateAvailabilityDto {
  available: boolean;
}
