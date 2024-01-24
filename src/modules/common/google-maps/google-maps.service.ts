import { Injectable } from '@nestjs/common';
import { Client, ClientOptions } from '@googlemaps/google-maps-services-js';
import axios from 'axios';
@Injectable()
export class GoogleMapsService {
  private readonly client: Client;
  constructor() {
    const options: ClientOptions = {};
    this.client = new Client(options);
  }

  /** This will calculate the time/meter each addresses from driver -> stores -> customer
   *
   * @param origin current location of the driver
   * @param stores location of all the stores
   * @param destination location of the customer/deliver address
   * @returns
   */
  async getDirections(
    origin: string,
    stores: any[],
    destination: string,
  ): Promise<any> {
    const sortedStoreAddresses = await this.getSortedStoreAddresses(
      origin,
      stores,
    );
    const destinations = [...sortedStoreAddresses, destination];
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${
      destinations[destinations.length - 1]
    }&waypoints=${destinations.slice(0, -1).join('|')}&key=${
      process.env.GOOGLE_API_KEY
    }`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.status === 'OK') {
        const routes = data.routes;
        const directions = routes[0].legs.map((leg) => ({
          distance: leg.distance.text,
          duration: leg.duration.text,
          start_address: leg.start_address,
          end_address: leg.end_address,
        }));

        return directions;
      } else {
        throw new Error('Unable to get directions');
      }
    } catch (error) {
      console.error(error);
    }
  }

  /** This will sort the store addresses depending on how far the store is so the driver will go to the nearest store first
   *
   * @param origin address of the driver
   * @param storeAddresses address of all the stores
   * @returns
   */
  async getSortedStoreAddresses(
    origin: string,
    storeAddresses: string[],
  ): Promise<string[]> {
    try {
      const { data } = await this.client.distancematrix({
        params: {
          origins: [origin],
          destinations: storeAddresses,
          key: process.env.GOOGLE_API_KEY,
        },
      });

      if (!data || !data.rows || data.rows.length === 0) {
        return storeAddresses;
      }

      const storeDistances = data.rows[0].elements.map((element, index) => {
        if (element.status !== 'OK') {
          return {
            index,
            distance: 0,
            duration: 0,
          };
        }

        return {
          index,
          distance: element.distance.value,
          duration: element.duration.value,
        };
      });

      storeDistances.sort((a, b) => a.distance - b.distance);

      const sortedStoreAddresses = storeDistances.map(
        (storeDistance) => storeAddresses[storeDistance.index],
      );

      return sortedStoreAddresses;
    } catch (error) {
      console.error('Error getting sorted store addresses:', error);
      return storeAddresses;
    }
  }
}
