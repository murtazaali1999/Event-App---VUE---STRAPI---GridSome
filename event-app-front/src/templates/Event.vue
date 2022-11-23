<template>
  <Layout>
    <h1>{{ $page.event.title }}</h1>
    <p>{{ $page.event.description }}</p>
  </Layout>
</template>

<page-query>
query {
 event(id : "1"){
    id
    title
    description
    price
    date
    duration
    category
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.event.title,
    };
  },
};
</script>
