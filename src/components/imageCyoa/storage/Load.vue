<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700px" @click:outside="cleanCurrentComponent">
      <v-card>
        <v-card-title class="headline">Load/Save Project</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="files"
                  hide-details
                  label="Load Project"
                  @change="uploadFile"
                  multiple
                  placeholder="Select your project"
                  prepend-icon="mdi-paperclip"
                  outlined
                  :show-size="1000"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip v-if="index < 2" dark label small>{{ text }}</v-chip>
                  </template>
                </v-file-input>
              </v-col>

              <v-col cols="12">
                <v-btn @click="saveFile('project')" style="color: black">Save Project</v-btn>
              </v-col>
              <v-col cols="12">
                You can use the button below to save when you have finished your project, it will keep the images
                separated from the JSON. Do not overwrite your project, as the new JSON-file inside the zip this
                downloads will have no pictures if loaded into the Creator. Place the JSON into the app-file like
                normal, and the images-folder besides the other folders. If the project has a lot of images then they
                might end up not showing when someone loads on the page, if so then just use the normal way, and use
                Image Compression in features to reduce the size of the project file.
                <v-btn @click="saveFileFinished('project')" style="color: black"
                  >Download Finished Project with separate images</v-btn
                >
              </v-col>
              <v-col cols="12">
                <v-btn @click="currentComponent = 'appStats'" style="color: black">Project Stats</v-btn>
              </v-col>

              <!--<v-col style="text-align:center" cols="12">Thank you for your support! :)</v-col>-->

              <br />If you find the Interactive CYOA creator useful and want to support the developer, then please
              consider buying the desktop version of the web application here.
              <iframe
                frameborder="0"
                src="https://itch.io/embed/610808?border_width=2&amp;bg_color=f3f1f1&amp;fg_color=222222&amp;link_color=c36200&amp;border_color=bcb6b6"
                width="700"
                height="169"
              >
                <a href="https://meandelay.itch.io/interactive-cyoa-creator" target="_blank"
                  >Interactive CYOA Creator by MeanDelay</a
                >
              </iframe>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- This is the holder that holds the design, save and load-component -->
        <component :is="currentComponent" @cleanCurrentComponent="currentComponent = $event"></component>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Stats from "./Stats.vue";
import JSZip from "jszip";
import FileSaver from "file-saver";
import base64toblob from "base64toblob";
import { useMainStore } from "@/stores";

export default {
  data: function () {
    return {
      files: [],
      dialog: true,
      currentComponent: "",
    };
  },
  components: {
    appStats: Stats,
  },
  computed: {
    app() {
      return this.store.app;
    },
    store() {
      return useMainStore();
    },
  },
  methods: {
    // Loads the file when the file input is changed.
    uploadFile() {
      console.log(this.files[0]);
      var reader = new FileReader();
      reader.onload = () => {
        //console.log('hello', JSON.parse(reader.result));
        this.store.loadApp(JSON.parse(reader.result));
      };
      reader.readAsText(this.files[0]);
    },
    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
    },
    // Saves the app-object down to a JSON-file.
    saveFile(filename) {
      const data = JSON.stringify(this.app);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = filename + ".json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
    // Saves the app-object down to a JSON-file.
    saveFileFinished(filename) {
      var zip = new JSZip();
      let tempApp = JSON.parse(JSON.stringify(this.app));
      // Row image
      let blab = "";
      for (let i = 0; i < this.app.rows.length; i++) {
        if (this.app.rows[i].image.length > 20) {
          console.log(this.app.rows[i].image);

          blab = base64toblob(this.app.rows[i].image.split(",")[1], "image/jpeg");

          zip.file("images/R" + (i + 1) + ".jpeg", blab, { binary: true });
          tempApp.rows[i].image = "images/R" + (i + 1) + ".jpeg";
        }

        // Choice Image
        for (let c = 0; c < this.app.rows[i].objects.length; c++) {
          if (this.app.rows[i].objects[c].image.length > 20) {
            blab = base64toblob(this.app.rows[i].objects[c].image.split(",")[1], "image/jpeg");

            zip.file("images/R" + (i + 1) + "C" + (c + 1) + ".jpeg", blab, {
              binary: true,
            });

            tempApp.rows[i].objects[c].image = "images/R" + (i + 1) + "C" + (c + 1) + ".jpeg";
          }

          // Addon Image
          for (let l = 0; l < this.app.rows[i].objects[c].addons.length; l++) {
            if (this.app.rows[i].objects[c].addons[l].image.length > 20) {
              blab = base64toblob(this.app.rows[i].objects[c].addons[l].image.split(",")[1], "image/jpeg");

              zip.file("images/R" + (i + 1) + "C" + (c + 1) + "A" + (l + 1) + ".jpeg", blab, {
                binary: true,
              });

              tempApp.rows[i].objects[c].addons[l].image =
                "images/R" + (i + 1) + "C" + (c + 1) + "A" + (l + 1) + ".jpeg";
            }
          }
        }
      }

      const data = JSON.stringify(tempApp);
      const blob = new Blob([data], { type: "text/plain" });

      zip.file(filename + ".json", blob);

      zip.generateAsync({ type: "blob" }).then(function (blob) {
        FileSaver.saveAs(blob, "hello.zip");
      });
    },
  },
};
</script>
