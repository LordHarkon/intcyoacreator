<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="800px" @click:outside="cleanCurrentComponent">
      <v-card>
        <v-card-title class="headline">Downloadable Version and Project Stats</v-card-title>

        <v-card-text>
          <v-container>
            <v-row justify="center" style="text-align: center">
              <v-col class="pa-0">
                <v-col>
                  Character Count:
                  <br />
                  {{ characterCount }} Characters
                </v-col>
                <v-col>
                  Choices Count:
                  <br />
                  {{ choicesCount }} Choices
                </v-col>
                <v-col>
                  Images Count:
                  <br />
                  {{ imagesCount }} Images
                </v-col>
                <v-col>
                  Rows Count:
                  <br />
                  {{ app.rows.length }} Rows
                </v-col>
              </v-col>
              <v-col class="pa-0">
                <v-col>
                  Biggest Picture:
                  <br />
                  {{ biggestImage }}
                </v-col>
                <v-col>
                  Smallest Picture:
                  <br />
                  {{ smallestImage }}
                </v-col>
                <v-col>
                  Time Guesstimate:
                  <br />
                  {{ Math.floor(imagesCount * 5 + characterCount / 175) }}
                  Minutes/
                  {{ Math.floor((imagesCount * 5 + characterCount / 175) / 60) }}
                  Hours <br />(175 Characters Per Minute, <br />5 Minutes Per Picture)
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { useMainStore } from "@/stores";

export default {
  data: function () {
    return {
      files: [],
      dialog: true,
      currentComponent: "",
    };
  },
  components: {},
  computed: {
    app() {
      return this.store.app;
    },
    characterCount() {
      let characters = 0;
      for (var i = 0; i < this.app.rows.length; i++) {
        if (typeof this.app.rows[i].titleText !== "undefined") {
          characters += this.app.rows[i].titleText.length;
          characters += this.app.rows[i].title.length;
        }

        for (var x = 0; x < this.app.rows[i].objects.length; x++) {
          if (typeof this.app.rows[i].objects[x].text !== "undefined") {
            characters += this.app.rows[i].objects[x].title.length;
            characters += this.app.rows[i].objects[x].text.length;

            for (var z = 0; z < this.app.rows[i].objects[x].addons.length; z++) {
              characters += this.app.rows[i].objects[x].addons[z].title.length;
              characters += this.app.rows[i].objects[x].addons[z].text.length;
            }
          }
        }
      }
      return characters;
    },
    imagesCount() {
      let images = 0;
      for (var i = 0; i < this.app.rows.length; i++) {
        if (this.app.rows[i].image.length != 0) {
          images += 1;
        }
        for (var x = 0; x < this.app.rows[i].objects.length; x++) {
          if (this.app.rows[i].objects[x].image.length != 0) {
            images += 1;
          }
        }
      }
      return images;
    },
    choicesCount() {
      let choices = 0;
      for (var i = 0; i < this.app.rows.length; i++) {
        for (var x = 0; x < this.app.rows[i].objects.length; x++) {
          choices += 1;
        }
      }
      return choices;
    },
    biggestImage() {
      let biggestPicture = 0;
      let biggestPictureTitle;
      var sizeInBytes, stringLength;
      for (var i = 0; i < this.app.rows.length; i++) {
        for (var x = 0; x < this.app.rows[i].objects.length; x++) {
          if (this.app.rows[i].objects[x].image.length != 0) {
            stringLength = this.app.rows[i].objects[x].image.length - "data:image/png;base64,".length;
            sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
            if (Math.floor(sizeInBytes / 1000) > 400) {
              console.log(Math.floor(sizeInBytes / 1000) + " KB, " + this.app.rows[i].objects[x].title);
            }
            if (biggestPicture < sizeInBytes) {
              biggestPicture = sizeInBytes;
              biggestPictureTitle = this.app.rows[i].objects[x].title;
            }
          }
        }
      }

      return Math.floor(biggestPicture / 1000) + " KB, " + biggestPictureTitle;
    },
    smallestImage() {
      let biggestPicture = 0;
      let biggestPictureTitle;
      var sizeInBytes, stringLength;
      for (var i = 0; i < this.app.rows.length; i++) {
        for (var x = 0; x < this.app.rows[i].objects.length; x++) {
          if (this.app.rows[i].objects[x].image.length != 0) {
            stringLength = this.app.rows[i].objects[x].image.length - "data:image/png;base64,".length;
            sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
            if (biggestPicture > sizeInBytes || biggestPicture == 0) {
              biggestPicture = sizeInBytes;
              biggestPictureTitle = this.app.rows[i].objects[x].title;
            }
          }
        }
      }

      return Math.floor(biggestPicture / 1000) + " KB, " + biggestPictureTitle;
    },
    store() {
      return useMainStore();
    },
  },
  methods: {
    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
    },
  },
};
</script>
