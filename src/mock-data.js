// Mock data for testing without an API key
    export const mockData = {
      properties: [
        {
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
        },
        {
          id: "prop_456",
          name: "Downtown Loft",
          location: "New York, NY",
          description: "Modern loft in the heart of Manhattan.",
          price_per_night: 250,
          bedrooms: 1,
          bathrooms: 1,
          max_guests: 2,
          amenities: ["Wi-Fi", "Kitchen", "Gym Access", "Air Conditioning"],
          images: [
            "https://example.com/downtown-loft-1.jpg",
            "https://example.com/downtown-loft-2.jpg"
          ],
          rating: 4.6,
          reviews_count: 18
        }
      ],
      
      bookings: [
        {
          id: "book_789",
          property_id: "prop_123",
          property_name: "Luxury Beach Villa",
          check_in: "2023-07-15",
          check_out: "2023-07-20",
          guests: 4,
          status: "confirmed",
          total_price: 1750,
          payment_status: "paid",
          customer: {
            id: "cust_456",
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1-555-123-4567"
          }
        }
      ],
      
      customers: [
        {
          id: "cust_456",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1-555-123-4567",
          address: {
            street: "123 Main St",
            city: "Los Angeles",
            state: "CA",
            postal_code: "90001",
            country: "USA"
          }
        }
      ]
    };
