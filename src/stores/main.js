import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    currentDesignComponent: "none",
    // This is the large object that holds the data of the current CYOA,
    app: {
      // If an object is activated
      isEditModeOnAll: true, // If the editmode is open.
      isStyleOpen: false, // If the style is open.
      isPointsOpen: false, // If the points is open.
      isChoicesOpen: false, // If the choice is open.
      isDesignOpen: false,
      isViewerVersion: false,
      backpack: [],
      words: [],
      groups: [],
      chapters: [],
      activated: [], // The array that holds the id's of the selected objects.
      rows: [], // The rows that the user have been created.
      pointTypes: [], // The pointtypes that the user have created.
      variables: [], // The variables that the user have created.

      // The defaults that will fill the various text boxes.
      defaultRowTitle: "Row",
      defaultRowText:
        "This is a row, and inside of it, you can place choices. On both rows and choices Requirements can be placed, which will block a row from being viewed, or make the player unable to select a choice, depending on either Point-types or the Ids of other choices. Point-types can be made in Features then Manage Points. Hovering over buttons will explain what they do. The Design of the project can be changed in 'Modify Design' at the side navigation bar, and private styling for each row can be turned on in the rows Settings. Default text like this can be turned off in Features -> Manage Defaults.",
      defaultChoiceTitle: "Choice",
      defaultChoiceText:
        "This is a Choice, and inside of it, you can place images and text. Scores can be added to it, and have Point-types attached. Addons can be added underneath the image and text. In the Functions at the bottom of the choice, there is an array of different things that can be done. Default text like this can be turned off in Features then Manage Defaults.",
      defaultBeforePoint: "Cost:",
      defaultAfterPoint: "points",
      defaultBeforeReq: "Required:",
      defaultAfterReq: "choice",
      defaultAddonTitle: "Addon",
      defaultAddonText:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

      // The styling that has to be done in the row.
      styling: {
        // Font for the text.
        rowTitle: "Times New Roman", // The font for the row-titles.
        rowText: "Times New Roman", // The font for the row-under-text.
        objectTitle: "Times New Roman", // The font for the object-titles.
        objectText: "Times New Roman", // The font for the object-under-text.
        addonTitle: "Times New Roman", // The font for the object-titles.
        addonText: "Times New Roman", // The font for the object-under-text.
        scoreText: "Times New Roman",

        // Size for the text.
        rowTitleTextSize: 200,
        rowTextTextSize: 100,
        objectTitleTextSize: 200,
        objectTextTextSize: 100,
        addonTitleTextSize: 200,
        addonTextTextSize: 100,
        scoreTextSize: 75,

        barTextColor: "#000000",
        barBackgroundColor: "#FFFFFFFF",
        barTextPadding: 17,
        barTextMargin: 0,
        barTextFont: "Times New Roman",
        barTextSize: 15,
        barPadding: 0,
        barMargin: 0,

        // Colors for the text.
        rowTitleColor: "000000",
        rowTextColor: "000000",
        objectTitleColor: "000000",
        objectTextColor: "000000",
        addonTitleColor: "000000",
        addonTextColor: "000000",
        scoreTextColor: "000000",
        objectHeight: true,

        rowTitleAlign: "center",
        rowTextAlign: "center",
        objectTitleAlign: "center",
        objectTextAlign: "center",
        addonTitleAlign: "center",
        addonTextAlign: "center",
        scoreTextAlign: "center",

        rowButtonXPadding: 0,
        rowButtonYPadding: 0,

        // Background image and color.
        backgroundImage: "",
        rowBackgroundImage: "",
        objectBackgroundImage: "",
        backgroundColor: "#FFFFFFFF",
        objectBgColor: "#FFFFFFFF",
        rowBgColor: "#FFFFFFFF",

        // Boolean that says if the row or object-color will be viewed.
        rowBgColorIsOn: false,
        objectBgColorIsOn: false,

        // Image radius and width
        objectImageWidth: 100,
        rowImageWidth: 100,
        objectImageMarginTop: 0,
        objectImageMarginBottom: 0,
        rowImageMarginTop: 0,

        // Margin and padding
        objectMargin: 10,
        rowMargin: 10,
        rowTextPaddingY: 5,
        rowTextPaddingX: 10,
        objectTextPadding: 10,

        rowBodyMarginTop: 25,
        rowBodyMarginBottom: 25,
        rowBodyMarginSides: 1,

        // Style Drop Shadow Object
        objectDropShadowH: 0,
        objectDropShadowV: 0,
        objectDropShadowSpread: 0,
        objectDropShadowBlur: 0,
        objectDropShadowColor: "grey",
        objectDropShadowIsOn: false,

        // Style Drop Shadow Row
        rowDropShadowH: 0,
        rowDropShadowV: 0,
        rowDropShadowSpread: 0,
        rowDropShadowBlur: 0,
        rowDropShadowColor: "grey",
        rowDropShadowIsOn: false,

        // Selected Filter
        selFilterBlurIsOn: false,
        selFilterBlur: 0,
        selFilterBrightIsOn: false,
        selFilterBright: 100,
        selFilterContIsOn: false,
        selFilterCont: 100,
        selFilterGrayIsOn: false,
        selFilterGray: 0,
        selFilterHueIsOn: false,
        selFilterHue: 0,
        selFilterInvertIsOn: false,
        selFilterInvert: 0,
        selFilterOpacIsOn: false,
        selFilterOpac: 100,
        selFilterSaturIsOn: false,
        selFilterSatur: 1,
        selFilterSepiaIsOn: false,
        selFilterSepia: 0,
        selBgColorIsOn: true,
        selFilterBgColor: "#70FF7EFF",

        // Required Filter
        reqFilterBlurIsOn: false,
        reqFilterBlur: 0,
        reqFilterBrightIsOn: false,
        reqFilterBright: 100,
        reqFilterContIsOn: false,
        reqFilterCont: 100,
        reqFilterGrayIsOn: false,
        reqFilterGray: 0,
        reqFilterHueIsOn: false,
        reqFilterHue: 0,
        reqFilterInvertIsOn: false,
        reqFilterInvert: 0,
        reqFilterOpacIsOn: true,
        reqFilterOpac: 50,
        reqFilterSaturIsOn: false,
        reqFilterSatur: 1,
        reqFilterSepiaIsOn: false,
        reqFilterSepia: 0,
        reqBgColorIsOn: false,
        reqFilterBgColor: "#FFFFFFFF",
        reqFilterVisibleIsOn: false,

        // Border radius row, and border
        rowBorderRadiusTopLeft: 0,
        rowBorderRadiusTopRight: 0,
        rowBorderRadiusBottomRight: 0,
        rowBorderRadiusBottomLeft: 0,
        rowBorderRadiusIsPixels: true,
        rowOverflowIsOn: true,

        rowBorderIsOn: false,
        rowBorderColor: "red",
        rowBorderStyle: "solid",
        rowBorderWidth: 2,

        // Border radius object, and border
        objectBorderRadiusTopLeft: 0,
        objectBorderRadiusTopRight: 0,
        objectBorderRadiusBottomRight: 0,
        objectBorderRadiusBottomLeft: 0,
        objectBorderRadiusIsPixels: true,
        objectOverflowIsOn: true,

        objectBorderIsOn: false,
        objectBorderColor: "red",
        objectBorderStyle: "solid",
        objectBorderWidth: 2,

        // Border radius object image, and border
        objectImgBorderRadiusTopLeft: 0,
        objectImgBorderRadiusTopRight: 0,
        objectImgBorderRadiusBottomRight: 0,
        objectImgBorderRadiusBottomLeft: 0,
        objectImgBorderRadiusIsPixels: true,

        objectImgBorderIsOn: false,
        objectImgBorderColor: "red",
        objectImgBorderStyle: "solid",
        objectImgBorderWidth: 2,

        // Border radius row image, and border
        rowImgBorderRadiusTopLeft: 0,
        rowImgBorderRadiusTopRight: 0,
        rowImgBorderRadiusBottomRight: 0,
        rowImgBorderRadiusBottomLeft: 0,
        rowImgBorderRadiusIsPixels: true,

        rowImgBorderIsOn: false,
        rowImgBorderColor: "red",
        rowImgBorderStyle: "solid",
        rowImgBorderWidth: 2,

        backPackWidth: 1200,
      },
    },
    // The list of widths used in row and objects.
    objectWidths: [
      { text: "Row", value: "" },
      { text: "1 per row", value: "col-12" },
      { text: "11/12", value: "col-sm-11" },
      { text: "10/12", value: "col-sm-10" },
      { text: "9/12", value: "col-sm-9" },
      { text: "8/12", value: "col-sm-8" },
      { text: "7/12", value: "col-sm-7" },
      { text: "2 per row", value: "col-sm-6" }, // w-50
      { text: "5/12", value: "col-sm-5" }, // w-50
      { text: "3 per Row", value: "col-md-4" }, // w33
      { text: "4 per Row", value: "col-md-3" }, // w-25
      { text: "5 per Row", value: "w-20" },
      { text: "6 per Row", value: "col-lg-2" }, // w-6
      { text: "7 per Row ", value: "w-14" },
      { text: "8 per Row ", value: "w-12" },
      { text: "9 per Row ", value: "w-11" }, //w-11
      { text: "10 per Row", value: "w-10" },
      { text: "11 per Row ", value: "w-9" },
      { text: "12 per Row", value: "col-xl-1" }, //w-8
    ],
  }),
  getters: {
    // Used everywhere in the application,
    checkRequireds: (state) => (object) => {
      if (typeof object.requireds !== "undefined") {
        // If the object has requireds that have yet to be selected.
        // Needs to run trough all the requireds
        for (var i = 0; i < object.requireds.length; i++) {
          // Used to see if any of the requirements
          let requiredHasRequireds = false;
          // Checks if the requirement itself has requirements.
          if (typeof object.requireds[i].requireds !== "undefined") {
            if (this.checkRequireds(object.requireds[i])) {
              requiredHasRequireds = true;
            }
          } else {
            requiredHasRequireds = true;
          }

          if (requiredHasRequireds) {
            // This happens when the object is of the type that will set HAS-requirement
            if (object.requireds[i].required) {
              // Is NOT in the array, is of type 'id'.
              if (!state.app.activated.includes(object.requireds[i].reqId) && object.requireds[i].type == "id") {
                return false;
                // If the type of required is'Points'
              } else if (object.requireds[i].type == "points") {
                if (typeof object.requireds[i].operator == "undefined") {
                  // Needs to run trough all the requireds
                  for (let o = 0; o < state.app.pointTypes.length; o++) {
                    // Is in the array and is of requiredf type 'points'.
                    if (object.requireds[i].reqId == state.app.pointTypes[o].id) {
                      // If there is more points than the
                      if (object.requireds[i].reqPoints > state.app.pointTypes[o].startingSum) {
                        return false;
                      }
                    }
                  }
                } else {
                  /*
              pointReqOperators: [
                { text: "+ More than", value: "1" },
                { text: "+= More or equal", value: "2" },
                { text: "= Equal to", value: "3" },
                { text: "-= Less or equal", value: "4" },
                { text: "- Less han", value: "5" }
              ],
              */
                  // Needs to run trough all the requireds
                  for (let o = 0; o < state.app.pointTypes.length; o++) {
                    // Is in the array and is of requiredf type 'points'.
                    if (object.requireds[i].reqId == state.app.pointTypes[o].id) {
                      // If reqPoints is a number and not a string
                      if (!isNaN(parseInt(object.requireds[i].reqPoints))) {
                        // Is there more points than required?
                        if (
                          object.requireds[i].operator == 1 &&
                          object.requireds[i].reqPoints >= state.app.pointTypes[o].startingSum
                        ) {
                          return false;
                          // Is there more or equal points to required?
                        } else if (
                          object.requireds[i].operator == 2 &&
                          object.requireds[i].reqPoints > state.app.pointTypes[o].startingSum
                        ) {
                          return false;
                          // Is there THIS many points?
                        } else if (
                          object.requireds[i].operator == 3 &&
                          parseInt(object.requireds[i].reqPoints) !== parseInt(state.app.pointTypes[o].startingSum)
                        ) {
                          return false;
                          // Is there less or equal points to required?
                        } else if (
                          object.requireds[i].operator == 4 &&
                          object.requireds[i].reqPoints < state.app.pointTypes[o].startingSum
                        ) {
                          return false;
                          // Is there less points than required?
                        } else if (
                          object.requireds[i].operator == 5 &&
                          object.requireds[i].reqPoints <= state.app.pointTypes[o].startingSum
                        ) {
                          return false;
                        }
                      } else {
                        for (let d = 0; d < state.app.pointTypes.length; d++) {
                          if (object.requireds[i].startingSum == state.app.pointTypes[d].id) {
                            // Is there more points than required?
                            if (
                              object.requireds[i].operator == 1 &&
                              state.app.pointTypes[o].startingSum >= state.app.pointTypes[d].startingSum
                            ) {
                              return false;
                              // Is there more or equal points to required?
                            } else if (
                              object.requireds[i].operator == 2 &&
                              state.app.pointTypes[o].startingSum > state.app.pointTypes[d].startingSum
                            ) {
                              return false;
                              // Is there THIS many points?
                            } else if (
                              object.requireds[i].operator == 3 &&
                              parseInt(state.app.pointTypes[o].startingSum) !==
                                parseInt(state.app.pointTypes[d].startingSum)
                            ) {
                              return false;
                              // Is there less or equal points to required?
                            } else if (
                              object.requireds[i].operator == 4 &&
                              state.app.pointTypes[o].startingSum < state.app.pointTypes[d].startingSum
                            ) {
                              return false;
                              // Is there less points than required?
                            } else if (
                              object.requireds[i].operator == 5 &&
                              state.app.pointTypes[o].startingSum <= state.app.pointTypes[d].startingSum
                            ) {
                              return false;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else if (object.requireds[i].type == "or") {
                let check = false;

                for (let o = 0; o < object.requireds[i].orRequired.length; o++) {
                  if (
                    state.app.activated.includes(object.requireds[i].orRequired[o].req) &&
                    object.requireds[i].orRequired[o].req != ""
                  ) {
                    check = true;
                  }
                }
                // Checks if one of the requireds is selected.
                if (!check) return false;
              } else if (object.requireds[i].type == "pointCompare") {
                let pointtypeA, pointtypeB;

                for (let o = 0; o < state.app.pointTypes.length; o++) {
                  // Is in the array and is of requiredf type 'points'.
                  if (object.requireds[i].reqId == state.app.pointTypes[o].id) {
                    // If there is more points than the
                    pointtypeA = state.app.pointTypes[o].startingSum;
                  }
                }

                for (let j = 0; j < state.app.pointTypes.length; j++) {
                  // Is in the array and is of requiredf type 'points'.
                  if (object.requireds[i].reqId1 == state.app.pointTypes[j].id) {
                    // If there is more points than the
                    pointtypeB = state.app.pointTypes[j].startingSum;
                  }
                }

                /*
              pointReqOperators: [
                { text: "+ More than", value: "1" },
                { text: "+= More or equal", value: "3" },
                { text: "= Equal to", value: "2" },
                { text: "-= Less or equal", value: "4" },
                { text: "- Less han", value: "5" }
              ],
              */

                if (pointtypeA <= pointtypeB && object.requireds[i].operator == 1) {
                  return false;
                } else if (pointtypeA != pointtypeB && object.requireds[i].operator == 2) {
                  return false;
                } else if (pointtypeA < pointtypeB && object.requireds[i].operator == 3) {
                  return false;
                }

                // Checks if one of the requireds is selected.
              }
            }
            // This happens when the object is of the type that will set NOT-requirement
            if (!object.requireds[i].required) {
              // Is in the array, is of type 'id'.
              if (state.app.activated.includes(object.requireds[i].reqId) && object.requireds[i].type == "id") {
                return false;
                // If the type of reqyired is'Points'
              } else if (object.requireds[i].type == "points") {
                if (typeof object.requireds[i].operator == "undefined") {
                  // Needs to run trough all the requireds
                  for (let o = 0; o < state.app.pointTypes.length; o++) {
                    // Is in the array and is of requiredf type 'points'.
                    if (object.requireds[i].reqId == state.app.pointTypes[o].id) {
                      // If there is more points than the
                      if (object.requireds[i].reqPoints <= state.app.pointTypes[o].startingSum) {
                        return false;
                      }
                    }
                  }
                } else {
                  // Needs to run trough all the requireds
                  for (let o = 0; o < state.app.pointTypes.length; o++) {
                    // Is in the array and is of requiredf type 'points'.
                    if (object.requireds[i].reqId == state.app.pointTypes[o].id) {
                      // If reqPoints is a number and not a string.
                      if (!isNaN(parseInt(object.requireds[i].reqPoints))) {
                        // Is there more points than required?
                        if (
                          object.requireds[i].operator == 1 &&
                          object.requireds[i].reqPoints >= state.app.pointTypes[o].startingSum
                        ) {
                          return false;
                          // Is there more or equal points to required?
                        } else if (
                          object.requireds[i].operator == 2 &&
                          object.requireds[i].reqPoints > state.app.pointTypes[o].startingSum
                        ) {
                          return false;
                          // Is there THIS many points?
                        } else if (
                          object.requireds[i].operator == 3 &&
                          parseInt(object.requireds[i].reqPoints) !== parseInt(state.app.pointTypes[o].startingSum)
                        ) {
                          return false;
                          // Is there less or equal points to required?
                        } else if (
                          object.requireds[i].operator == 4 &&
                          object.requireds[i].reqPoints < state.app.pointTypes[o].startingSum
                        ) {
                          return false;
                          // Is there less points than required?
                        } else if (
                          object.requireds[i].operator == 5 &&
                          object.requireds[i].reqPoints <= state.app.pointTypes[o].startingSum
                        ) {
                          return false;
                        }
                      } else {
                        for (let d = 0; d < state.app.pointTypes.length; d++) {
                          if (object.requireds[i].reqPoints == state.app.pointTypes[d].id) {
                            // Is there more points than required?
                            if (
                              object.requireds[i].operator == 1 &&
                              state.app.pointTypes[o].startingSum >= state.app.pointTypes[d].startingSum
                            ) {
                              return false;
                              // Is there more or equal points to required?
                            } else if (
                              object.requireds[i].operator == 2 &&
                              state.app.pointTypes[o].startingSum > state.app.pointTypes[d].startingSum
                            ) {
                              return false;
                              // Is there THIS many points?
                            } else if (
                              object.requireds[i].operator == 3 &&
                              parseInt(state.app.pointTypes[o].startingSum) !==
                                parseInt(state.app.pointTypes[d].startingSum)
                            ) {
                              return false;
                              // Is there less or equal points to required?
                            } else if (
                              object.requireds[i].operator == 4 &&
                              state.app.pointTypes[o].startingSum < state.app.pointTypes[d].startingSum
                            ) {
                              return false;
                              // Is there less points than required?
                            } else if (
                              object.requireds[i].operator == 5 &&
                              state.app.pointTypes[o].startingSum <= state.app.pointTypes[d].startingSum
                            ) {
                              return false;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else if (object.requireds[i].type == "or") {
                let check = false;
                for (let o = 0; o < object.requireds[i].orRequired.length; o++) {
                  if (
                    !state.app.activated.includes(object.requireds[i].orRequired[o].req) &&
                    object.requireds[i].orRequired[o].req != ""
                  ) {
                    check = true;
                  }
                }
                // Checks if one of the requireds is selected.
                if (!check) return false;
              }
            }
          }
        }
      }
      return true;
    },
  },
  actions: {
    loadApp(n) {
      this.app = n;
    },
    cleanActivated() {
      this.app.activated.length = 0;

      var x, i, g, n, m, t, nx;

      // For each of the rows.
      for (i = 0; i < this.app.rows.length; i++) {
        this.app.rows[i].isEditModeOn = false;

        // Cleans up all the Allowed Choices of rows that have been changed.
        this.app.rows[i].allowedChoicesChange > 0
          ? (this.app.rows[i].allowedChoices -= this.app.rows[i].allowedChoicesChange)
          : "";

        // For each of the objects.
        for (x = 0; x < this.app.rows[i].objects.length; x++) {
          if (this.app.rows[i].objects[x].isSelectableMultiple) {
            // Will go trough all tiers left to lowest tier.

            if (this.app.rows[i].objects[x].isMultipleUseVariable) {
              for (g = 0; g < this.app.rows[i].objects[x].multipleUseVariable; g++) {
                let isLessThanLimit = true;

                for (n = 0; n < this.app.pointTypes.length; n++) {
                  if (this.app.pointTypes[n].id == this.app.rows[i].objects[x].multipleScoreId) {
                    if (this.app.rows[i].objects[x].numMultipleTimesMinus < this.app.pointTypes[n].startingSum) {
                      this.app.pointTypes[n].startingSum--;
                    } else {
                      isLessThanLimit = false;
                    }
                  }
                }

                if (isLessThanLimit) {
                  for (m = 0; m < this.app.rows[i].objects[x].scores.length; m++) {
                    // Goes trough all of the scores and check which is fits.
                    for (t = 0; t < this.app.pointTypes.length; t++) {
                      if (
                        this.app.pointTypes[t].id == this.app.rows[i].objects[x].scores[m].id &&
                        this.actions.checkRequireds(this.app.rows[i].objects[x].scores[m])
                      ) {
                        this.app.pointTypes[t].startingSum += parseInt(this.app.rows[i].objects[x].scores[m].value);
                      }
                    }
                  }
                }
              }
            } else {
              for (
                g = 0;
                g <
                this.app.rows[i].objects[x].numMultipleTimesPluss - this.app.rows[i].objects[x].numMultipleTimesMinus;
                g++
              ) {
                let isLessThanLimit = true;

                for (nx = 0; nx < this.app.pointTypes.length; nx++) {
                  if (this.app.pointTypes[nx].id == this.app.rows[i].objects[x].multipleScoreId) {
                    if (this.app.rows[i].objects[x].numMultipleTimesMinus < this.app.pointTypes[nx].startingSum) {
                      this.app.pointTypes[nx].startingSum--;
                    } else {
                      isLessThanLimit = false;
                    }
                  }
                }

                if (isLessThanLimit) {
                  for (m = 0; m < this.app.rows[i].objects[x].scores.length; m++) {
                    // Goes trough all of the scores and check which is fits.
                    for (t = 0; t < this.app.pointTypes.length; t++) {
                      if (
                        this.app.pointTypes[t].id == this.app.rows[i].objects[x].scores[m].id &&
                        this.actions.checkRequireds(this.app.rows[i].objects[x].scores[m])
                      ) {
                        this.app.pointTypes[t].startingSum += parseInt(this.app.rows[i].objects[x].scores[m].value);
                      }
                    }
                  }
                }
              }
            }

            this.app.rows[i].objects[x].multipleUseVariable = 0;
          }
        }
      }

      // For each of the rows.
      for (i = 0; i < this.app.rows.length; i++) {
        this.app.rows[i].isEditModeOn = false;

        // For each of the objects.
        for (x = 0; x < this.app.rows[i].objects.length; x++) {
          if (this.app.rows[i].objects[x].isActive) {
            // Deactivate the choice.
            this.app.rows[i].objects[x].isActive = false;
            this.app.rows[i].currentChoices = 0;

            // For each of the scores.
            for (var o = 0; o < this.app.rows[i].objects[x].scores.length; o++) {
              for (var y = 0; y < this.app.pointTypes.length; y++) {
                if (this.app.pointTypes[y].id == this.app.rows[i].objects[x].scores[o].id) {
                  // If the score has a required, and there is more requirements than 0.
                  if (
                    typeof this.app.rows[i].objects[x].scores[o].requireds !== "undefined" ||
                    this.app.rows[i].objects[x].scores[o].requireds > 0
                  ) {
                    // If the score has been activated.
                    if (this.app.rows[i].objects[x].scores[o].isActive) {
                      this.app.rows[i].objects[x].scores[o].isActive = false;
                      this.app.pointTypes[y].startingSum += parseInt(this.app.rows[i].objects[x].scores[o].value);
                    }
                  } else {
                    this.app.pointTypes[y].startingSum += parseInt(this.app.rows[i].objects[x].scores[o].value);
                  }
                }
              }
            }
          } else if (this.app.rows[i].objects[x].isImageUpload) {
            this.app.rows[i].objects[x].image = "";
          }
        }
      }
    },
    // Creates a new point-type, done in Points.vue
    addNewPointType(pointType) {
      this.app.pointTypes.push({
        id: pointType.id,
        name: pointType.name,
        startingSum: pointType.startingSum,
        activatedId: pointType.activatedId,
        afterText: pointType.afterText,
        beforeText: pointType.name + ":",
      });
    },

    // Creates a new point-type, done in Points.vue
    addNewGroup(group) {
      this.app.groups.push({
        id: group.id,
        rowType: group.rowType,
        name: group.name,
        elements: [],
      });
    },
    // Creates a new point-type, done in Points.vue
    addNewVariable(variable) {
      this.app.variables.push({
        id: variable.id,
        isTrue: variable.isTrue,
      });
    },
    // Creates a new point-type, done in Points.vue
    addNewWord(word) {
      this.app.words.push({
        id: word.id,
        replaceText: word.replaceText,
      });
    },
    // Delete's a row after its index is found, used in Row.vue.
    deleteRow(row) {
      this.app.rows.splice(this.app.rows.indexOf(row), 1);
    },
    deletePointType(pointType) {
      this.app.pointTypes.splice(this.app.pointTypes.indexOf(pointType), 1);
    },
    deleteGroup(group) {
      this.app.groups.splice(this.app.groups.indexOf(group), 1);
    },
    deleteVariable(variable) {
      this.app.variables.splice(this.app.variables.indexOf(variable), 1);
    },
    deleteWord(word) {
      this.app.words.splice(this.app.variables.indexOf(word), 1);
    },
  },
});
