<template>
  <v-app>
    <v-row v-if="currentComponent == ''" style="text-align: center">
      <v-dialog persistent v-model="dialog" max-width="900px">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row justify="center" style="text-align: center">
                <v-col cols="12">
                  <span>
                    <h1>Interactive CYOA Creator</h1>
                    <h6>Work in progress by MeanDelay</h6>
                  </span>
                </v-col>

                <!-- V-for that makes the buttons -->
                <v-col cols="12" v-for="button in menuComponentButtons" :key="button.index">
                  <v-btn small @click="currentComponent = button.component" style="color: black">{{
                    button.text
                  }}</v-btn>
                </v-col>

                <v-col cols="12" class="pb-0" style="color: green">Update: 28.02.2021</v-col>

                <v-col cols="12" class="pb-0">
                  There is now a button at the top of the backpack-dialog, which will allow a user to download an image
                  of it. There are some problems with the aspect of images in it.
                </v-col>

                <v-col cols="4" class="pb-0">
                  A new switch has been added in the Choices Functions. This will add to or remove from the number of
                  allowed choices to press in a row.
                </v-col>

                <v-col cols="4" class="pb-0">
                  Moved the button settings into a dialog, and the button can now add a random sum between two numbers
                  into a point-type.
                </v-col>

                <v-col cols="4" class="pb-0">
                  Choices can now be hidden completely by the filter if it uses its own private styling.
                </v-col>

                <v-col cols="4" class="pb-0">
                  A lot of work has been put into making the score-calculation work better.
                </v-col>

                <v-col cols="4" class="pb-0"> Lots and lots of bugfixes. </v-col>

                <v-col cols="4"
                  >Anonymous feedback can be given
                  <a href="https://app.suggestionox.com/r/i4womu" target="_blank">Here</a>
                </v-col>

                <v-col cols="12" class="pb-0" style="color: green">Update: 03.03.2021</v-col>

                <v-col> Small fix for the download image button in the viewer, should work now. </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- This is the holder that holds the design, save and load-component -->
    <component :is="currentComponent" @cleanCurrentComponent="currentComponent = $event"></component>
  </v-app>
</template>

<script>
// The imported components
// import ImageCyoa from "./components/ImageCyoa.vue";
// import ImageCyoaViewer from "./components/ImageCyoaViewer.vue";
// import Information from "./components/Information.vue";

export default {
  data: function () {
    return {
      currentComponent: "",
      dialog: true,
      // The buttons in the main menu.
      menuComponentButtons: [
        { component: "appImageCyoa", text: "Open Image-cyoa Creator" },
        { component: "appImageCyoaViewer", text: "Open Image-cyoa Viewer" },
        { component: "appInformation", text: "Help and Instructions" },
      ],
    };
  },
  components: {
    // appImageCyoa: ImageCyoa,
    // appImageCyoaViewer: ImageCyoaViewer,
    // appInformation: Information,
  },
  computed: {},
  methods: {},
};
</script>

<style>
button {
  width: 100%;
}

.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}

/* ------------------- The Style Options -------------------- */
/* Makes space between the row of objects and the row details */

img {
  padding-right: 0px !important;
  padding-left: 0px !important;
  width: 100%;
}

div.root {
  margin: 50px;
}

.w-20 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 20% !important;
  flex: 0 0 20% !important;
  max-width: 20%;
}

/* When something is pressed and activated */
.active {
  background-color: lightgreen;
}

.zeroPadding {
  padding: 0px !important;
}

select {
  margin-bottom: 5px;
}

.form-control {
  margin-top: 0 !important;
}

div.col-md-2 {
  text-align: center;
}

div.col5 {
  text-align: center;
  width: 20%;
}

div.col-md-6 {
  text-align: center;
}

div.col-md-3 {
  text-align: center;
}

div.col-md-12 {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

/* Border around the objects, will be toggable */
div.border {
  border: 1px solid #ccc;
}

p {
  text-align: left;
}

h1 {
  text-align: center;
}

/* To keep the lows beautiful and on same size*/
.row.display-flex {
  display: flex;
  flex-wrap: wrap;
}
.row.display-flex > [class*="col-"] {
  display: flex;
  flex-direction: column;
}

/********************* Header *************************/
.header {
  padding: 10px;
  background: #555;
  color: #f1f1f1;
  width: 100%;
}

.sticky {
  position: fixed;
  top: 0;

  z-index: 99999;
}

/********************* /Header *************************/
</style>
