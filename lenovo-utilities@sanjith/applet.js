const Applet = imports.ui.applet;
const Util = imports.misc.util;
const Mainloop = imports.mainloop;
const Lang = imports.lang;
const PopupMenu = imports.ui.popupMenu;
const GLib = imports.gi.GLib;
const St = imports.gi.St;
const Settings = imports.ui.settings;
const UUID = "lenovo-utilities@sanjith";

function LenovoUtilitiesApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

LenovoUtilitiesApplet.prototype = {
    __proto__: Applet.TextIconApplet.prototype,

    _init: function(orientation, panel_height, instance_id) {
        Applet.TextIconApplet.prototype._init.call(this, orientation, panel_height, instance_id);
        this.set_applet_tooltip(_("Configure settings specific to certain Lenovo laptops"));
        this.set_applet_label("L");
		this.update_interval = 5000;
        this.options = {
            "Function Lock": {
                fileName: "fn_lock",
                state: true,
                short: "f"
            },
            "USB Charging": {
                fileName: "usb_charging",
                state: true,
                short: "u"
            },
            "Conservation Mode": {
                fileName: "conservation_mode",
                state: true,
                short: "c"
            }
            
        };

        try {
            this.settings = new Settings.AppletSettings(this, UUID, this.instance_id);
            this.settings.bindProperty(Settings.BindingDirection.IN, "update-interval", "update_interval", this._new_freq, null);

            // Create the popup menu
            this.menuManager = new PopupMenu.PopupMenuManager(this);
            this.menu = new Applet.AppletPopupMenu(this, orientation);
            this.menuManager.addMenu(this.menu);

            this._contentSection = new PopupMenu.PopupMenuSection();
            this.menu.addMenuItem(this._contentSection);

            // Create a toggle switch item
            let item= new PopupMenu.PopupSwitchMenuItem("Conservation Mode", false);
            item.connect('toggled', this._onToggle.bind(this));
            this.menu.addMenuItem(item);

            // Create a toggle switch item
            item= new PopupMenu.PopupSwitchMenuItem("USB Charging", false);
            item.connect('toggled', this._onToggle.bind(this));
            this.menu.addMenuItem(item);

            // Create a toggle switch item
            item= new PopupMenu.PopupSwitchMenuItem("Function Lock", false);
            item.connect('toggled', this._onToggle.bind(this));
            
            this.menu.addMenuItem(item);

            

            this._get_status();
			this._update_loop();
		}
		catch (e) {
			global.logError(e);
		}

    },

    on_applet_clicked: function() {

        this.menu.toggle();
    },

    on_applet_removed_from_panel: function () {
		if (this._updateLoopID) {
			Mainloop.source_remove(this._updateLoopID);
		}

	},

    _run_cmd: function(command) {
      try {
        let [result, stdout, stderr] = GLib.spawn_command_line_sync(command);
        if (stdout != null) {
          return stdout.toString();
        }
      }
      catch (e) {
        global.logError(e);
      }

      return "";
    },

    _new_freq: function(){
    	global.log(this.update_interval);
        if (this._updateLoopID) {
			Mainloop.source_remove(this._updateLoopID);
		}
        this._update_loop();
    },

    _update_loop: function () {
		this._get_status();
		this._updateLoopID = Mainloop.timeout_add(this.update_interval, Lang.bind(this, this._update_loop));
	},

    _get_status: function(){
        for(let x in this.options) {
            let status = this._run_cmd(`cat /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/${this.options[x].fileName}`).trim();
            log(`Inside status: '${status}'`);
            if (status == "0"){
                this.options[x].state = false;
            }else{
                this.options[x].state = true;
            }
        }   
        
        // Update the state of the corresponding switch item
        let menuItems = this.menu._getMenuItems();
        for (let i = 0; i < menuItems.length; i++) {
            let menuItem = menuItems[i];
            if (menuItem instanceof PopupMenu.PopupSwitchMenuItem && menuItem.state != this.options[`${menuItem.label.text}`].state) {
                menuItem.setToggleState(this.options[`${menuItem.label.text}`].state);
                break;
            }
        }
    },

    _onToggle(item) {
        if (item.state) {
            // Toggle switch is on
            // Perform actions when the switch is toggled on
            
            let [success, stdout, stderr] = GLib.spawn_command_line_sync(`/bin/sh -c 'ideaTweak -${this.options[item.label.text].short} 1'`);
            if (success) {
                let output = stdout.toString().trim();
                log("Command Output: " + output);
            } else {
                let error = stderr.toString().trim();
                log("Command Error: " + error);
            }

            log('Toggle switch is ON');
        } else {
            // Toggle switch is off
            // Perform actions when the switch is toggled off

            GLib.spawn_command_line_sync(`/bin/sh -c 'ideaTweak -${this.options[item.label.text].short} 0'`);

            log('Toggle switch is OFF');
        }
    },

};


function main(metadata, orientation, panel_height, instance_id) {
    return new LenovoUtilitiesApplet(orientation, panel_height, instance_id);
}