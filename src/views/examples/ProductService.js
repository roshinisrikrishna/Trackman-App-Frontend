class ProductService {
    async getProductsSmall() {
      try {
        const TRAVEL_URL = 'http://localhost:5000/travel/admin'; // Replace with your API endpoint
        const response = await fetch(TRAVEL_URL);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    }
  }
  
  export default ProductService;
  