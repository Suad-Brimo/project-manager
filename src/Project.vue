<template>
  <b-container>
    <b-card-group deck class="m-5">
      <b-card
        header="Add New Project"
        class="overflow-hidden mr-5"
        style="max-width: 640px"
      >
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <b-form @submit="onSubmit" class="text-left">
            <div class="mb-2">
              <label for="project_name" class="form-label"
                >Project Name: <span class="text-danger">*</span></label
              >
              <ValidationProvider
                rules="required|min:8|max:15"
                v-slot="{ errors }"
                name="Project Name"
              >
                <b-form-input
                  id="project_name"
                  name="project_name"
                  v-model="form.project_name"
                  type="text"
                  required
                  :state="errors.length ? false : null"
                  :aria-describedby="errors[0]"
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </ValidationProvider>
            </div>

            <div class="mb-2">
              <label for="project_category" class="form-label"
                >Project Category: <span class="text-danger">*</span></label
              >
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                name="Project Category"
              >
                <b-form-select
                  id="project_category"
                  name="project_category"
                  v-model="form.project_category"
                  :options="project_categories"
                  value-field="category_id"
                  text-field="category_name"
                  required
                  :state="errors.length ? false : null"
                  :aria-describedby="errors[0]"
                ></b-form-select>
                <b-form-invalid-feedback id="input-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </ValidationProvider>
            </div>

            <div class="mb-2">
              <label for="project_type" class="form-label"
                >Project Type: <span class="text-danger">*</span></label
              >
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                name="Project Type"
              >
                <b-form-select
                  id="project_type"
                  name="project_type"
                  v-model="form.project_type"
                  :options="project_types"
                  value-field="type_id"
                  text-field="type_name"
                  required
                  :state="errors.length ? false : null"
                  :aria-describedby="errors[0]"
                ></b-form-select>
                <b-form-invalid-feedback id="input-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </ValidationProvider>
            </div>

            <div class="mb-2">
              <b-button-group>
                <b-button
                  v-for="workerType in worker_types"
                  :key="workerType.type_id"
                  :id="workerType.type_id"
                  class="worker-type-btn"
                  variant="outline-primary"
                  v-b-toggle="'workerType.type_id'"
                  @click="changeWorkerType(workerType.type_id)"
                  >{{ workerType.type_name }}</b-button
                >
              </b-button-group>
            </div>

            <template v-if="form.worker_type == 'OPW'">
              <div class="mb-2">
                <label for="objects_per_worker" class="form-label"
                  >Objects Per Worker: <span class="text-danger">*</span></label
                >
                <ValidationProvider
                  rules="required|numeric|min_value:1|max_value:50"
                  v-slot="{ errors }"
                  name="Objects Per Worker"
                >
                  <b-form-input
                    id="objects_per_worker"
                    name="objects_per_worker"
                    v-model="form.objects_per_worker"
                    type="number"
                    required
                    :state="errors.length ? false : null"
                    :aria-describedby="errors[0]"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </div>
            </template>

            <template v-if="form.worker_type == 'OPG'">
              <div class="mb-2">
                <label for="number_groups" class="form-label"
                  >Number of Groups: <span class="text-danger">*</span></label
                >
                <ValidationProvider
                  rules="required|numeric|min_value:1|max_value:50"
                  v-slot="{ errors }"
                  name="Number of Groups"
                >
                  <b-form-input
                    id="number_groups"
                    name="number_groups"
                    v-model="form.number_groups"
                    type="number"
                    required
                    :state="errors.length ? false : null"
                    :aria-describedby="errors[0]"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </div>

              <div>
                <label for="workers_per_group" class="form-label"
                  >Workers Per Group: <span class="text-danger">*</span></label
                >
                <ValidationProvider
                  rules="required|numeric|min_value:1|max_value:50"
                  v-slot="{ errors }"
                  name="Workers Per Group"
                >
                  <b-form-input
                    id="workers_per_group"
                    name="workers_per_group"
                    v-model="form.objects_per_group"
                    type="number"
                    required
                    :state="errors.length ? false : null"
                    :aria-describedby="errors[0]"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </ValidationProvider>
              </div>
            </template>

            <div class="mb-2">
              <label for="description" class="form-label">Description: </label>
              <ValidationProvider
                rules="min:0|max:999"
                v-slot="{ errors }"
                name="description"
              >
                <b-form-textarea
                  v-model="form.description"
                  id="description"
                  name="description"
                  rows="4"
                  :state="errors.length ? false : null"
                  :aria-describedby="errors[0]"
                ></b-form-textarea>
                <b-form-invalid-feedback id="description">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </ValidationProvider>
            </div>

            <div class="custom-control custom-checkbox mb-2">
              <input
                id="add_user_observation"
                type="checkbox"
                name="add_user_observation"
                class="custom-control-input"
                value="false"
                v-model="form.add_user_observation"
              /><label
                for="add_user_observation"
                class="custom-control-label"
                style="cursor: pointer"
              >
                Add User Observation
              </label>
            </div>

            <div class="mb-2">
              <label for="instructions">Instructions:</label>
              <ValidationProvider
                rules="min:0|max:99999"
                v-slot="{ errors }"
                name="Instructions"
              >
                <vue-editor
                  v-model="form.instructions"
                  placeholder="Instructions"
                ></vue-editor>
                <b-form-invalid-feedback id="input-live-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </ValidationProvider>
            </div>

            <div class="mt-4 text-center">
              <b-button type="submit" variant="primary" :disabled="invalid">
                Add Project</b-button
              >
            </div>
          </b-form>
        </ValidationObserver>
      </b-card>

      <b-card class="card overflow-hidden" header="Expected Output">
        <pre class="m-0 text-left">{{ form }}</pre>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { VueEditor } from "vue2-editor";

export default {
  name: "app",
  components: {
    ValidationObserver,
    ValidationProvider,
    VueEditor,
  },
  data() {
    return {
      form: {
        project_name: undefined,
        project_category: undefined,
        project_type: undefined,
        worker_type: undefined,
        objects_per_worker: undefined,
        objects_per_group: undefined,
        description: undefined,
        add_user_observation: false,
        instructions: undefined,
      },
      project_categories: [
        {
          category_id: "",
          category_name: "",
        },
        {
          category_id: "image",
          category_name: "Image Image Annotation (bb0x)",
        },
        {
          category_id: "audio",
          category_name: "Audio Audio Annotation (segment)",
        },
        { category_id: "vedio", category_name: "Vedio Vedio Annotation" },
        { category_id: "image", category_name: "Image Image New Annotation" },
      ],
      all_project_types: [
        {
          type_id: "",
          type_name: "",
          category_id: "",
        },
        {
          type_id: "image",
          type_name: "Image Transcription 1",
          category_id: "image",
        },
        {
          type_id: "audio",
          type_name: "Audio Transcription",
          category_id: "audio",
        },
        {
          type_id: "vedio",
          type_name: "Vedio Transcription",
          category_id: "vedio",
        },
        {
          type_id: "image",
          type_name: "Image Transcription 2",
          category_id: "image",
        },
      ],
      worker_types: [
        {
          type_id: "OPW",
          type_name: "Single Worker",
          collapse: "'collapse-OPW'",
        },
        { type_id: "OPG", type_name: "Group", collapse: "'collapse-OPG'" },
      ],
    };
  },
  computed: {
    project_types() {
      if (!this.form.project_category) {
        return this.all_project_types;
      }
      return this.all_project_types.filter(
        (type) => type.category_id == this.form.project_category
      );
    },
  },
  methods: {
    changeWorkerType(workerTypeId) {
      if (!this.form.worker_type) {
        this.form.worker_type = this.worker_types[0].type_id;
        document
          .querySelectorAll(".worker-type-btn")[0]
          .classList.toggle("active");
      } else {
        this.form.worker_type = workerTypeId;
        document.querySelectorAll(".worker-type-btn").forEach((type) => {
          type.classList.remove("active");
        });
        document
          .querySelector('.worker-type-btn[id="' + workerTypeId + '"]')
          .classList.toggle("active");
      }
    },
    onSubmit(event) {
      event.preventDefault();
      console.log(JSON.stringify(this.form));
    },
  },
  mounted() {
    this.changeWorkerType(this.worker_types[0].type_id);
  },
};
</script>