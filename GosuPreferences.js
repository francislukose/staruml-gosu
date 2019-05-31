define(function (require, exports, module) {
    "use strict";

    var AppInit           = app.getModule("utils/AppInit"),
        Core              = app.getModule("core/Core"),
        PreferenceManager = app.getModule("core/PreferenceManager");

    var preferenceId = "gosu";

    var gosuPreferences = {
        "gosu.gen": {
            text: "Gosu Code Generation",
            type: "Section"
        },
        "gosu.gen.gosuDoc": {
            text: "GosuDoc",
            description: "Generate GosuDoc comments.",
            type: "Check",
            default: true
        },
        "gosu.gen.useTab": {
            text: "Use Tab",
            description: "Use Tab for indentation instead of spaces.",
            type: "Check",
            default: false
        },
        "gosu.gen.indentSpaces": {
            text: "Indent Spaces",
            description: "Number of spaces for indentation.",
            type: "Number",
            default: 4
        }
    };

    function getId() {
        return preferenceId;
    }

    function getGenOptions() {
        return {
            gosuDoc       : PreferenceManager.get("gosu.gen.gosuDoc"),
            useTab        : PreferenceManager.get("gosu.gen.useTab"),
            indentSpaces  : PreferenceManager.get("gosu.gen.indentSpaces")
        };
    }


    AppInit.htmlReady(function () {
        PreferenceManager.register(preferenceId, "Gosu", gosuPreferences);
    });

    exports.getId         = getId;
    exports.getGenOptions = getGenOptions;

});
