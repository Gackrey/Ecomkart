import { createServer, Model, RestSerializer } from "miragejs";
import { initialData } from "./StoreData";
import faker from "faker";

faker.seed(123);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      product: Model
    },

    routes() {
      this.namespace = "api";
      this.resource("products");
    },

    seeds(server) {
      [...initialData].forEach(({ title, image, catagory }) => {
        server.create("product", {
          id: faker.random.uuid(),
          name: title,
          image: image,
          price: faker.commerce.price(),
          inStock: faker.random.boolean(),
          fastDelivery: faker.random.boolean(),
          ratings: faker.random.arrayElement([
            3.1,
            3.3,
            3.6,
            3.8,
            4,
            4.1,
            4.3,
            4.5,
            4.8,
            5
          ]),
          quantity: 1,
          isinCart: false,
          isWishlisted: false
        });
      });
    }
  });
}
