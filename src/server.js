import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { z } from 'zod';
    import { stayApiClient } from './api-client.js';

    // Create an MCP server for Stay AI API
    const server = new McpServer({
      name: "Stay AI API",
      version: "1.0.0",
      description: "MCP Server for accessing Stay AI's property management API"
    });

    // Add property search tool
    server.tool(
      "search_properties",
      {
        query: z.string().optional().describe("Search query for properties"),
        location: z.string().optional().describe("Location to search in"),
        min_price: z.number().optional().describe("Minimum price"),
        max_price: z.number().optional().describe("Maximum price"),
        bedrooms: z.number().optional().describe("Number of bedrooms"),
        bathrooms: z.number().optional().describe("Number of bathrooms"),
        limit: z.number().optional().default(10).describe("Maximum number of results to return")
      },
      async (params) => {
        try {
          const results = await stayApiClient.searchProperties(params);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(results, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `Error searching properties: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Search for properties with various filters" }
    );

    // Add property details tool
    server.tool(
      "get_property_details",
      {
        property_id: z.string().describe("ID of the property to retrieve details for")
      },
      async ({ property_id }) => {
        try {
          const property = await stayApiClient.getPropertyDetails(property_id);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(property, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `Error getting property details: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Get detailed information about a specific property" }
    );

    // Add booking creation tool
    server.tool(
      "create_booking",
      {
        property_id: z.string().describe("ID of the property to book"),
        check_in: z.string().describe("Check-in date (YYYY-MM-DD)"),
        check_out: z.string().describe("Check-out date (YYYY-MM-DD)"),
        guests: z.number().describe("Number of guests"),
        customer_info: z.object({
          name: z.string().describe("Customer's full name"),
          email: z.string().email().describe("Customer's email address"),
          phone: z.string().optional().describe("Customer's phone number")
        }).describe("Customer information")
      },
      async (bookingData) => {
        try {
          const booking = await stayApiClient.createBooking(bookingData);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(booking, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `Error creating booking: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Create a new booking for a property" }
    );

    // Add booking retrieval tool
    server.tool(
      "get_booking",
      {
        booking_id: z.string().describe("ID of the booking to retrieve")
      },
      async ({ booking_id }) => {
        try {
          const booking = await stayApiClient.getBooking(booking_id);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(booking, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `Error retrieving booking: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Get details of a specific booking" }
    );

    // Add booking update tool
    server.tool(
      "update_booking",
      {
        booking_id: z.string().describe("ID of the booking to update"),
        updates: z.object({
          check_in: z.string().optional().describe("New check-in date (YYYY-MM-DD)"),
          check_out: z.string().optional().describe("New check-out date (YYYY-MM-DD)"),
          guests: z.number().optional().describe("New number of guests"),
          status: z.enum(["confirmed", "pending", "cancelled"]).optional().describe("New booking status")
        }).describe("Fields to update")
      },
      async ({ booking_id, updates }) => {
        try {
          const booking = await stayApiClient.updateBooking(booking_id, updates);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(booking, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `Error updating booking: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Update an existing booking" }
    );

    // Add booking cancellation tool
    server.tool(
      "cancel_booking",
      {
        booking_id: z.string().describe("ID of the booking to cancel"),
        reason: z.string().optional().describe("Reason for cancellation")
      },
      async ({ booking_id, reason }) => {
        try {
          const result = await stayApiClient.cancelBooking(booking_id, reason);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(result, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `Error cancelling booking: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Cancel an existing booking" }
    );

    // Add availability check tool
    server.tool(
      "check_availability",
      {
        property_id: z.string().describe("ID of the property to check"),
        check_in: z.string().describe("Check-in date (YYYY-MM-DD)"),
        check_out: z.string().describe("Check-out date (YYYY-MM-DD)"),
        guests: z.number().optional().describe("Number of guests")
      },
      async (params) => {
        try {
          const availability = await stayApiClient.checkAvailability(params);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(availability, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `Error checking availability: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Check if a property is available for specific dates" }
    );

    // Add price calculation tool
    server.tool(
      "calculate_price",
      {
        property_id: z.string().describe("ID of the property"),
        check_in: z.string().describe("Check-in date (YYYY-MM-DD)"),
        check_out: z.string().describe("Check-out date (YYYY-MM-DD)"),
        guests: z.number().optional().describe("Number of guests"),
        promo_code: z.string().optional().describe("Promotional code")
      },
      async (params) => {
        try {
          const pricing = await stayApiClient.calculatePrice(params);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(pricing, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `Error calculating price: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Calculate the price for a stay" }
    );

    // Add customer creation tool
    server.tool(
      "create_customer",
      {
        name: z.string().describe("Customer's full name"),
        email: z.string().email().describe("Customer's email address"),
        phone: z.string().optional().describe("Customer's phone number"),
        address: z.object({
          street: z.string().optional().describe("Street address"),
          city: z.string().optional().describe("City"),
          state: z.string().optional().describe("State/Province"),
          postal_code: z.string().optional().describe("Postal/ZIP code"),
          country: z.string().optional().describe("Country")
        }).optional().describe("Customer's address")
      },
      async (customerData) => {
        try {
          const customer = await stayApiClient.createCustomer(customerData);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(customer, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `Error creating customer: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Create a new customer profile" }
    );

    // Add customer retrieval tool
    server.tool(
      "get_customer",
      {
        customer_id: z.string().describe("ID of the customer to retrieve")
      },
      async ({ customer_id }) => {
        try {
          const customer = await stayApiClient.getCustomer(customer_id);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(customer, null, 2)
            }]
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `Error retrieving customer: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Get details of a specific customer" }
    );

    // Add property resource
    server.resource(
      "property",
      new ResourceTemplate("property://{id}", { list: undefined }),
      async (uri, { id }) => {
        try {
          const property = await stayApiClient.getPropertyDetails(id);
          
          return {
            contents: [{
              uri: uri.href,
              text: `# ${property.name}

**Location:** ${property.location}
**Price:** $${property.price_per_night} per night
**Bedrooms:** ${property.bedrooms}
**Bathrooms:** ${property.bathrooms}
**Max Guests:** ${property.max_guests}

## Description
${property.description}

## Amenities
${property.amenities.join(', ')}

## Availability
Check availability using the check_availability tool.
`
            }]
          };
        } catch (error) {
          return {
            contents: [{
              uri: uri.href,
              text: `Error retrieving property: ${error.message}`
            }]
          };
        }
      }
    );

    // Add booking resource
    server.resource(
      "booking",
      new ResourceTemplate("booking://{id}", { list: undefined }),
      async (uri, { id }) => {
        try {
          const booking = await stayApiClient.getBooking(id);
          
          return {
            contents: [{
              uri: uri.href,
              text: `# Booking #${booking.id}

**Property:** ${booking.property_name}
**Check-in:** ${booking.check_in}
**Check-out:** ${booking.check_out}
**Guests:** ${booking.guests}
**Status:** ${booking.status}

## Customer
**Name:** ${booking.customer.name}
**Email:** ${booking.customer.email}
${booking.customer.phone ? `**Phone:** ${booking.customer.phone}` : ''}

## Payment
**Total:** $${booking.total_price}
**Status:** ${booking.payment_status}
`
            }]
          };
        } catch (error) {
          return {
            contents: [{
              uri: uri.href,
              text: `Error retrieving booking: ${error.message}`
            }]
          };
        }
      }
    );

    export { server };
