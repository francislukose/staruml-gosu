define(function (require, exports, module) {
    "use strict";

    var AppInit             = app.getModule("utils/AppInit"),
        Repository          = app.getModule("core/Repository"),
        Engine              = app.getModule("engine/Engine"),
        Commands            = app.getModule("command/Commands"),
        CommandManager      = app.getModule("command/CommandManager"),
        MenuManager         = app.getModule("menu/MenuManager"),
        Dialogs             = app.getModule("dialogs/Dialogs"),
        ElementPickerDialog = app.getModule("dialogs/ElementPickerDialog"),
        FileSystem          = app.getModule("filesystem/FileSystem"),
        FileSystemError     = app.getModule("filesystem/FileSystemError"),
        ExtensionUtils      = app.getModule("utils/ExtensionUtils"),
        UML                 = app.getModule("uml/UML");

    var CodeGenUtils        = require("CodeGenUtils"),
        GosuPreferences     = require("GosuPreferences"),
        GosuCodeGenerator   = require("GosuCodeGenerator");

    /**
     * Commands IDs
     */
    var CMD_GOSU           = 'Gosu',
        CMD_GOSU_GENERATE  = 'Gosu.generate',
        CMD_GOSU_CONFIGURE = 'Gosu.configure';

    /**
     * Command Handler for Gosu Generate
     *
     * @param {Element} base
     * @param {string} path
     * @param {Object} options
     * @return {$.Promise}
     */
    function _handleGenerate(base, path, options) {
        var result = new $.Deferred();

        // If options is not passed, get from preference
        options = options || GosuPreferences.getGenOptions();
        // If base is not assigned, popup ElementPicker
        if (!base) {
            ElementPickerDialog.showDialog("Select a base model to generate codes", null, type.UMLPackage)
                .done(function (buttonId, selected) {
                    if (buttonId === Dialogs.DIALOG_BTN_OK && selected) {
                        base = selected;
                        // If path is not assigned, popup Open Dialog to select a folder
                        if (!path) {
                            FileSystem.showOpenDialog(false, true, "Select a folder where generated codes to be located", null, null, function (err, files) {
                                if (!err) {
                                    if (files.length > 0) {
                                        path = files[0];
                                        GosuCodeGenerator.generate(base, path, options).then(result.resolve, result.reject);
                                    } else {
                                        result.reject(FileSystem.USER_CANCELED);
                                    }
                                } else {
                                    result.reject(err);
                                }
                            });
                        } else {
                            GosuCodeGenerator.generate(base, path, options).then(result.resolve, result.reject);
                        }
                    } else {
                        result.reject();
                    }
                });
        } else {
            // If path is not assigned, popup Open Dialog to select a folder
            if (!path) {
                FileSystem.showOpenDialog(false, true, "Select a folder where generated codes to be located", null, null, function (err, files) {
                    if (!err) {
                        if (files.length > 0) {
                            path = files[0];
                            GosuCodeGenerator.generate(base, path, options).then(result.resolve, result.reject);
                        } else {
                            result.reject(FileSystem.USER_CANCELED);
                        }
                    } else {
                        result.reject(err);
                    }
                });
            } else {
                GosuCodeGenerator.generate(base, path, options).then(result.resolve, result.reject);
            }
        }
        return result.promise();
    }


    /**
     * Popup PreferenceDialog with Gosu Preference Schema
     */
    function _handleConfigure() {
        CommandManager.execute(Commands.FILE_PREFERENCES, GosuPreferences.getId());
    }

    // Register Commands
    CommandManager.register("Gosu",             CMD_GOSU,           CommandManager.doNothing);
    CommandManager.register("Generate Code...", CMD_GOSU_GENERATE,  _handleGenerate);
    CommandManager.register("Configure...",     CMD_GOSU_CONFIGURE, _handleConfigure);

    var menu, menuItem;
    menu = MenuManager.getMenu(Commands.TOOLS);
    menuItem = menu.addMenuItem(CMD_GOSU);
    menuItem.addMenuItem(CMD_GOSU_GENERATE);
    menuItem.addMenuDivider();
    menuItem.addMenuItem(CMD_GOSU_CONFIGURE);

});
