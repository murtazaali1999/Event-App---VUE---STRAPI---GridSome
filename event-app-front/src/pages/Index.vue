<template>
  <Layout v-slot="{ search }">
    <v-tabs v-model="tab" grow
      ><!-- binding tab variable -->
      <v-tab>All</v-tab>
      <v-tab>Game</v-tab>
      <v-tab>Music</v-tab>
    </v-tabs>

    <v-row>
      <!-- search if search is passed or updated -->
      <v-card
        max-width="250"
        v-for="edge in getEvents(search)"
        :key="edge.node.id"
        class="mt-5 ml-2 mr-2"
        ><!-- using events because events array is mounted/init as the edges/node
              then we filter and loop through it as coded -->
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>{{ edge.node.title }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
          {{ formatDate(edge.node.date) }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Price = {{ edge.node.price }}</div>

          <div>Duration-{{ edge.node.duration }}</div>
          <div>{{ edge.node.description }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange"
            text
            @click="$router.push(`/events/${edge.node.id}`)"
          >
            More Info
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </Layout>
</template>

<page-query>
query {
 events: allEvent{
    edges{
      node{
        id
        title
        description
        price
        date
        duration
        category
      }
    }
  totalCount
	} 
}
</page-query>

<script>
import moment from "moment";
export default {
  metaInfo: {
    title: "Hello, world!",
  },
  data() {
    return {
      //graphql doesnt load here,instead access in mounted
      tab: 0,
      events: [], //list of all events
    };
  },
  mounted() {
    this.events = this.$page.events.edges;
  },
  watch: {
    tab(val) {
      //watching for variable changes
      if (this.tab == 0) {
        this.showAllEvents();
      } else {
        this.showEventsByTypes(val); //passes the tab value
      }
    },
  },
  methods: {
    showAllEvents() {
      this.events = this.$page.events.edges; //gets all events
    },
    showEventsByTypes(val) {
      //val is tab-binded-variable's id
      //gets events based on their category id
      this.events = this.$page.events.edges.filter((edge) => {
        return edge.node.category === val;
        //if tab == category,show that category's event
      });
    },
    getEvents(search) {
      return this.events.filter((edge) => {
        return edge.node.title.toLowerCase().includes(search.toLowerCase());
      });
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    },
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
