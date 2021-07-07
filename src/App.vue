<template>
  <div id="app">
    <project></project>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Project from "./Project.vue";

export default {
  name: "app",
  components: {
    ValidationObserver,
    ValidationProvider,
    Project,
  },
};
</script>
