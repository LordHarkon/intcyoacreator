<template>
  <div style="text-align: center" class="pb-12" :style="background" ref="printThiss">
    <v-row data-html2canvas-ignore v-show="showMenu" class="px-2">
      <v-col cols="1" icon v-on="on" class="text-center">
        <v-btn small @click="cleanCurrentComponent()" style="color: black">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-center"></v-col>
      <v-col class="text-center"></v-col>
      <v-col class="text-center"></v-col>
      <v-col class="text-center">
        <v-btn small @click="print()" style="color: black"
          >Download Image (Go all the way to the bottom to load in the pictures first)</v-btn
        >
      </v-col>
      <v-col class="text-center">
        <v-btn small @click="currentComponent = 'appLoad'" style="color: black">Load Project</v-btn>
      </v-col>
    </v-row>

    <!-- Navbar that holds the pointtypes and backpack -->
    <v-bottom-navigation
      data-html2canvas-ignore
      :style="pointBar"
      v-if="app.pointTypes.length > 0 || app.backpack.length > 0 || app.importedChoicesIsOpen"
      fixed
    >
      <v-col>
        <v-btn
          v-show="app.importedChoicesIsOpen"
          text
          icon
          x-large
          @click="currentComponent = 'appActivatedViewer'"
          color="black"
        >
          <v-icon>mdi-format-list-checks</v-icon>
        </v-btn>
      </v-col>
      <v-col
        v-show="score.activatedId == '' || app.activated.includes(score.activatedId)"
        :style="pointBarText"
        v-for="score in app.pointTypes"
        :key="score.index"
        >{{ score.beforeText }}
        <span
          :style="
            score.startingSum >= 0
              ? typeof app.styling.barPointPos !== 'undefined'
                ? 'color: ' + app.styling.barPointPos.hex
                : ''
              : typeof app.styling.barPointNeg !== 'undefined'
                ? 'color: ' + app.styling.barPointNeg.hex
                : ''
          "
          >{{ Math.round(score.startingSum) }}</span
        >
        {{ score.afterText }}</v-col
      >
      <v-col>
        <v-btn
          v-show="app.backpack.length > 0"
          text
          icon
          x-large
          @click="currentComponent = 'appBackpackPreview'"
          color="black"
        >
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-bottom-navigation>

    <!-- This is the holder that holds the design, save and load-component -->
    <component
      data-html2canvas-ignore
      :is="currentComponent"
      @cleanCurrentComponent="currentComponent = $event"
    ></component>

    <v-row>
      <!-- This is where the rows is shown -->
      <v-col
        :class="window.width > 1200 ? (row.width ? 'col-6 pt-0 pb-0' : 'col-12 pt-0 pb-0') : 'col-12 pt-0 pb-0'"
        v-for="row in app.rows"
        :key="row.index"
      >
        <app-Row v-show="checkRequireds(row)" :row="row" @rowWasChanged="row = $event"></app-Row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Row from "./imageCyoaViewer/Row.vue";
import Load from "./imageCyoa/storage/Load.vue";

import ActivatedViewer from "./imageCyoa/ActivatedViewer.vue";
import BackpackPreview from "./standardcyoa/BackpackPreview.vue";

import html2canvas from "html2canvas";
import { useMainStore } from "@/stores";

export default {
  data: function () {
    return {
      currentComponent: "",
      showMenu: true,
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  components: {
    // One of the row components
    appRow: Row,
    appLoad: Load,
    appActivatedViewer: ActivatedViewer,
    appBackpackPreview: BackpackPreview,
  },
  computed: {
    // Computes the styles for the title-text and the under-text
    background() {
      return (
        'background-image: url("' +
        this.app.styling.backgroundImage +
        '");' +
        "background-color: " +
        this.app.styling.backgroundColor +
        ";background-repeat: repeat;"
      );
    },
    //
    pointBar() {
      return (
        "background-color: " +
        this.app.styling.barBackgroundColor +
        "; margin: " +
        this.app.styling.barMargin +
        "px; padding: " +
        this.app.styling.barPadding +
        "px;"
      );
    },
    pointBarText() {
      return (
        "color: " +
        this.app.styling.barTextColor +
        "; margin: " +
        this.app.styling.barTextMargin +
        "px; padding: " +
        this.app.styling.barTextPadding +
        "px;" +
        'font-family: "' +
        this.app.styling.barTextFont +
        '";' +
        "font-size: " +
        this.app.styling.barTextSize +
        "px;"
      );
    },
    app() {
      return this.store.app;
    },
    activated() {
      return this.store.app.activated;
    },
    store() {
      return useMainStore();
    },
  },
  // Lifecycle hook that happens when component is created.
  beforeCreate() {
    var comp = this;

    // Collects the project from the project file.
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var obj = this.responseText;
        var obj1 = JSON.parse(obj);
        comp.$store.commit("loadApp", obj1);
      }
    };
    xhttp.open("GET", "project.json", true);
    xhttp.send();
  },
  // Lifecycle hook that happens when component is created.
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  // Lifecycle hook that happens when components is destroyed.
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    // Checks if the id's and points allow this object to be selected.
    checkRequireds(object) {
      return this.store.checkRequireds(object);
    },
    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
    },
    cleanActivated() {
      this.store.cleanActivated();
    },
    async print() {
      let vc = this;
      console.log(vc.$refs.printThiss);
      html2canvas(vc.$refs.printThiss, {
        imageTimeout: 0,
      }).then(function (canvas) {
        document.body.appendChild(canvas);

        var link = document.createElement("a");
        if (typeof link.download === "string") {
          link.href = canvas.toDataURL();
          link.download = "canvas.png";

          //Firefox requires the link to be in the body
          document.body.appendChild(link);

          //simulate click
          link.click();

          //remove the link when done
          document.body.removeChild(link);
          document.body.removeChild(canvas);
        } else {
          window.open(canvas.toDataURL());
        }
      });
    },
  },
};
</script>

<style>
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

.w-100 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 100% !important;
  flex: 0 0 100% !important;
  max-width: 100%;
}

.w-50 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50% !important;
  flex: 0 0 50% !important;
  max-width: 50%;
}

.w-33 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 33.33% !important;
  flex: 0 0 33.33% !important;
  max-width: 33.33%;
}

.w-25 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 25% !important;
  flex: 0 0 25% !important;
  max-width: 25%;
}

.w-20 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 20% !important;
  flex: 0 0 20% !important;
  max-width: 20%;
}

.w-16 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 16.66% !important;
  flex: 0 0 16.66% !important;
  max-width: 16.66%;
}

.w-14 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 14.28% !important;
  flex: 0 0 14.28% !important;
  max-width: 14.28%;
}

.w-12 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 12.5% !important;
  flex: 0 0 12.5% !important;
  max-width: 12.5%;
}

.w-11 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 11.11% !important;
  flex: 0 0 11.11% !important;
  max-width: 11.11%;
}

.w-10 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 10% !important;
  flex: 0 0 10% !important;
  max-width: 10%;
}

.w-9 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 9.09% !important;
  flex: 0 0 9.09% !important;
  max-width: 9.09%;
}

.w-8 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 8.33% !important;
  flex: 0 0 8.33% !important;
  max-width: 8.33%;
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
