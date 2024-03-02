<template>
  <span>
    <!-- Preview -->
    <div v-if="checkRequireds(addon)">
      <span style="width: 100%" class="ma-0">
        <v-tooltip
          v-if="addon.imageSourceTooltip !== '' && typeof addon.imageSourceTooltip !== 'undefined'"
          top
          open-delay="1500"
        >
          <template v-slot:activator="{ on }">
            <img v-on="on" :style="addon.image != '' ? objectImage : ''" :src="addon.image" />
          </template>
          <span>{{ addon.imageSourceTooltip }}</span>
        </v-tooltip>

        <!-- If there is no tooltip -->
        <img v-else :style="addon.image != '' ? objectImage : ''" :src="addon.image" />

        <span>
          <h4 v-show="addon.title != ''" :style="addonTitle" v-html="$sanitize(replaceAddonTitle, sanitizeArg)"></h4>
          <p style="white-space: pre-line" :style="addonText" v-html="$sanitize(replaceAddonText, sanitizeArg)"></p>
        </span>
      </span>
    </div>
  </span>
</template>

<script>
import { useMainStore } from "@/stores";
export default {
  props: {
    addon: Object,
    isEditModeOn: Boolean,
    row: Object,
  },
  data: function () {
    return {
      sanitizeArg: {
        allowedTags: [
          "address",
          "article",
          "aside",
          "footer",
          "header",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "hgroup",
          "main",
          "nav",
          "section",
          "blockquote",
          "dd",
          "div",
          "dl",
          "dt",
          "figcaption",
          "figure",
          "hr",
          "li",
          "main",
          "ol",
          "p",
          "pre",
          "ul",
          "a",
          "abbr",
          "b",
          "bdi",
          "bdo",
          "br",
          "cite",
          "code",
          "data",
          "dfn",
          "em",
          "i",
          "kbd",
          "mark",
          "q",
          "rb",
          "rp",
          "rt",
          "rtc",
          "ruby",
          "s",
          "samp",
          "small",
          "span",
          "strong",
          "sub",
          "sup",
          "time",
          "u",
          "var",
          "wbr",
          "caption",
          "col",
          "colgroup",
          "table",
          "tbody",
          "td",
          "tfoot",
          "th",
          "thead",
          "tr",
        ],
        allowedAttributes: {
          p: ["style"],
          b: ["style"],
          span: ["style"],
          strong: ["style"],
        },
        allowedStyles: {
          "*": {
            // Match HEX and RGB
            color: [/^#(0x)?[0-9a-f]+$/i, /^[A-Za-z]+$/, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
            "text-align": [/^left$/, /^right$/, /^center$/],
            // Match any number with px, em, or %
            "font-size": [/^\d+(?:px|em|%)$/],
          },
          p: {
            "font-size": [/^\d+rem$/],
          },
        },
      },
    };
  },
  computed: {
    // Used on the img in the object.
    objectImage() {
      let style =
        "width:" +
        this.styling.objectImageWidth +
        "%;margin-top:" +
        this.styling.objectImageMarginTop +
        "%;margin-bottom:" +
        this.styling.objectImageMarginBottom +
        "%;";

      // Border Radius
      let suffix = this.styling.objectImgBorderRadiusIsPixels ? "px" : "%";

      style +=
        "border-radius: " +
        this.styling.objectImgBorderRadiusTopLeft +
        +"" +
        suffix +
        " " +
        this.styling.objectImgBorderRadiusTopRight +
        +"" +
        suffix +
        " " +
        this.styling.objectImgBorderRadiusBottomRight +
        +"" +
        suffix +
        " " +
        this.styling.objectImgBorderRadiusBottomLeft +
        +"" +
        suffix +
        ";";

      if (this.styling.objectImgOverflowIsOn) {
        style += "overflow:hidden;";
      }

      if (this.styling.objectImgBorderIsOn) {
        style +=
          "border: " +
          this.styling.objectImgBorderWidth +
          "" +
          "px " +
          this.styling.objectImgBorderStyle +
          " " +
          this.styling.objectImgBorderColor +
          "" +
          ";";
      }

      return style;
    },
    activated() {
      return this.store.app.activated;
    },
    app() {
      return this.store.app;
    },
    addonTitle() {
      return (
        'font-family: "' +
        this.styling.addonTitle +
        '";' +
        "font-size: " +
        this.styling.addonTitleTextSize +
        "%;" +
        "text-align: " +
        this.styling.addonTitleAlign +
        ";" +
        "color: " +
        this.styling.addonTitleColor +
        ";"
      );
    },
    addonText() {
      return (
        'font-family: "' +
        this.styling.addonText +
        '";' +
        "font-size: " +
        this.styling.addonTextTextSize +
        "%;" +
        "text-align: " +
        this.styling.addonTextAlign +
        ";" +
        "color: " +
        this.styling.addonTextColor +
        ";"
      );
    },
    styling() {
      if (this.row.isPrivateStyling) return this.row.styling;
      else return this.store.app.styling;
    },
    replaceAddonTitle() {
      let newObjectText = this.addon.title;
      let isPointType = false;

      // TODO Add point type if it is.

      if (typeof this.store.app.words != "undefined") {
        // Checks if the word is the ID of a point-type.
        for (let r = 0; r < this.app.words.length; r++) {
          isPointType = false;
          for (let u = 0; u < this.app.pointTypes.length; u++) {
            if (this.app.pointTypes[u].id == this.app.words[r].id) {
              newObjectText = newObjectText.replace(
                new RegExp(this.app.words[r].id, "g"),
                this.app.pointTypes[u].startingSum,
              );
              isPointType = true;
            }
          } // If its not a point-type.
          if (!isPointType) {
            for (let i = 0; i < this.app.words.length; i++) {
              newObjectText = newObjectText.replace(
                new RegExp(this.app.words[i].id, "g"),
                this.app.words[i].replaceText,
              );
            }
          }
        }
      }
      return newObjectText;
    },
    replaceAddonText() {
      let newObjectText = this.addon.text;
      let isPointType = false;

      // TODO Add point type if it is.

      if (typeof this.store.app.words != "undefined") {
        // Checks if the word is the ID of a point-type.
        for (let r = 0; r < this.app.words.length; r++) {
          isPointType = false;
          for (let u = 0; u < this.app.pointTypes.length; u++) {
            if (this.app.pointTypes[u].id == this.app.words[r].id) {
              newObjectText = newObjectText.replace(
                new RegExp(this.app.words[r].id, "g"),
                this.app.pointTypes[u].startingSum,
              );
              isPointType = true;
            }
          } // If its not a point-type.
          if (!isPointType) {
            for (let i = 0; i < this.app.words.length; i++) {
              newObjectText = newObjectText.replace(
                new RegExp(this.app.words[i].id, "g"),
                this.app.words[i].replaceText,
              );
            }
          }
        }
      }
      return newObjectText;
    },
    store() {
      return useMainStore();
    },
  },
  methods: {
    // Checks if the id's and points allow this object to be selected.
    checkRequireds(object) {
      return this.store.checkRequireds(object);
    },
    // Removes a object from a array, the parameter is the objects index and the array that holds it.
    deleteEvent: function (index, array) {
      array.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.btn {
  margin: 5px;
  font-size: small;
}

.row {
  padding: 10px;
}
</style>
