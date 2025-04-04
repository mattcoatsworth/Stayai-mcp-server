# Stay AI API MCP Server

    This is a Model Context Protocol (MCP) server for the Stay AI property management API. It allows AI models to interact with the Stay AI API through standardized tools and resources.

    ## Features

    - Search for properties with various filters
    - Get detailed property information
    - Create, retrieve, update, and cancel bookings
    - Check property availability
    - Calculate pricing for stays
    - Manage customer profiles

    ## Getting Started

    ### Prerequisites

    - Node.js 16 or higher
    - A Stay AI API key

    ### Installation

    1. Clone this repository
    2. Install dependencies:
       ```
       npm install
       ```
    3. Create a `.env` file with your Stay AI API key:
       ```
       STAY_AI_API_KEY=your_api_key_here
       ```

    ### Running the Server

    Start the server:
    ```
    npm run dev
    ```

    ### Testing with MCP Inspector

    Test the server with the MCP Inspector:
    ```
    npm run inspect
    ```

    This will open a web interface where you can:
    - Browse available tools and resources
    - Test tools with different inputs
    - View server logs and responses

    ## Available Tools

    - `search_properties`: Search for properties with various filters
    - `get_property_details`: Get detailed information about a specific property
    - `create_booking`: Create a new booking for a property
    - `get_booking`: Get details of a specific booking
    - `update_booking`: Update an existing booking
    - `cancel_booking`: Cancel an existing booking
    - `check_availability`: Check if a property is available for specific dates
    - `calculate_price`: Calculate the price for a stay
    - `create_customer`: Create a new customer profile
    - `get_customer`: Get details of a specific customer

    ## Available Resources

    - `property://{id}`: Get detailed information about a property
    - `booking://{id}`: Get detailed information about a booking

    ## License

    MIT
