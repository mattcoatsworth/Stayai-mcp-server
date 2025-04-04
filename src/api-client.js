import axios from 'axios';

    class StayApiClient {
      constructor() {
        this.baseUrl = 'https://api.stay.ai/v1';
        this.client = axios.create({
          baseURL: this.baseUrl,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STAY_AI_API_KEY || 'missing_api_key'}`
          }
        });

        // Add response interceptor for error handling
        this.client.interceptors.response.use(
          response => response,
          error => {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`Stay AI API Error: ${errorMessage}`);
            throw new Error(errorMessage);
          }
        );
      }

      // Properties
      async searchProperties(params) {
        try {
          const response = await this.client.get('/properties', { params });
          return response.data;
        } catch (error) {
          throw new Error(`Failed to search properties: ${error.message}`);
        }
      }

      async getPropertyDetails(propertyId) {
        try {
          const response = await this.client.get(`/properties/${propertyId}`);
          return response.data;
        } catch (error) {
          throw new Error(`Failed to get property details: ${error.message}`);
        }
      }

      // Bookings
      async createBooking(bookingData) {
        try {
          const response = await this.client.post('/bookings', bookingData);
          return response.data;
        } catch (error) {
          throw new Error(`Failed to create booking: ${error.message}`);
        }
      }

      async getBooking(bookingId) {
        try {
          const response = await this.client.get(`/bookings/${bookingId}`);
          return response.data;
        } catch (error) {
          throw new Error(`Failed to get booking: ${error.message}`);
        }
      }

      async updateBooking(bookingId, updates) {
        try {
          const response = await this.client.patch(`/bookings/${bookingId}`, updates);
          return response.data;
        } catch (error) {
          throw new Error(`Failed to update booking: ${error.message}`);
        }
      }

      async cancelBooking(bookingId, reason) {
        try {
          const response = await this.client.post(`/bookings/${bookingId}/cancel`, { reason });
          return response.data;
        } catch (error) {
          throw new Error(`Failed to cancel booking: ${error.message}`);
        }
      }

      // Availability
      async checkAvailability(params) {
        try {
          const response = await this.client.get('/availability', { params });
          return response.data;
        } catch (error) {
          throw new Error(`Failed to check availability: ${error.message}`);
        }
      }

      // Pricing
      async calculatePrice(params) {
        try {
          const response = await this.client.post('/calculate-price', params);
          return response.data;
        } catch (error) {
          throw new Error(`Failed to calculate price: ${error.message}`);
        }
      }

      // Customers
      async createCustomer(customerData) {
        try {
          const response = await this.client.post('/customers', customerData);
          return response.data;
        } catch (error) {
          throw new Error(`Failed to create customer: ${error.message}`);
        }
      }

      async getCustomer(customerId) {
        try {
          const response = await this.client.get(`/customers/${customerId}`);
          return response.data;
        } catch (error) {
          throw new Error(`Failed to get customer: ${error.message}`);
        }
      }

      // Mock implementations for testing without API key
      mockSearchProperties() {
        return {
          properties: [
            {
              id: "prop_123",
              name: "Luxury Beach Villa",
              location: "Malibu, CA",
              price_per_night: 350,
              bedrooms: 3,
              bathrooms: 2,
              max_guests: 6,
              thumbnail: "https://example.com/beach-villa.jpg"
            },
            {
              id: "prop_456",
              name: "Downtown Loft",
              location: "New York, NY",
              price_per_night: 250,
              bedrooms: 1,
              bathrooms: 1,
              max_guests: 2,
              thumbnail: "https://example.com/downtown-loft.jpg"
            }
          ],
          total: 2,
          page: 1,
          limit: 10
        };
      }

      mockGetPropertyDetails() {
        return {
          id: "prop_123",
          name: "Luxury Beach Villa",
          location: "Malibu, CA",
          description: "Beautiful beachfront villa with stunning ocean views.",
          price_per_night: 350,
          bedrooms: 3,
          bathrooms: 2,
          max_guests: 6,
          amenities: ["Pool", "Wi-Fi", "Kitchen", "Beach Access", "Air Conditioning"],
          images: [
            "https://example.com/beach-villa-1.jpg",
            "https://example.com/beach-villa-2.jpg"
          ],
          rating: 4.8,
          reviews_count: 24
        };
      }
    }

    // Create and export a singleton instance
    export const stayApiClient = new StayApiClient();
