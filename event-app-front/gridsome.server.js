// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  const nodeExternals = require('webpack-node-externals');
  const axios = require("axios");

  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/]
        })
      ])
    }
  })

  api.loadSource(async actions => {
    const { data } = await axios.get('http://localhost:1337/api/events?populate=%2A');
    //one of the responses is data

    const collection = actions.addCollection({
      typeName: 'Event',
      path: '/events/:id'
    })

    //console.log("Data-->", data.data);

    for (const event of data.data) {
      //  console.log("Event-->", event.attributes.categories.data[0]);
      collection.addNode({ //equals to array[].push, loop to get all data
        id: event.id,
        path: '/events/' + event.id,
        title: event.attributes.title,
        description: event.attributes.description,
        price: event.attributes.price,
        date: event.attributes.date,
        duration: event.attributes.duration,
        category: event.attributes.categories.data[0].id
      })
    }

    console.log(collection);
  })
}
