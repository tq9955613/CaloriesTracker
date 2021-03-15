import { createServer, Model, RestSerializer } from "miragejs"
import meals from './fixtures/meals'

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      meal: Model,
    },
    
    fixtures: {
        meals,
    },

    // seeds(server) {
    //   server.create("meal", { name: "勁辣雞腿堡", calories: 493 })
    //   server.create("meal", { name: "雙層牛肉吉事堡", calories: 467 })
    // },
    
    serializers: {
        application: RestSerializer,
    },

    routes() {
      this.namespace = "api"
        
      this.resource("meals")
    },
  })

  return server
}