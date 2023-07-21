# ideapad-utilities-cinnamon-linux
This is an applet for cinnamon desktop environment on Linux. This applet can be used to access certain functionalities specific to Lenovo Ideapad laptops, which are usually accessible on Windows through the Lenovo Vantage software.

**Note:** This applet depends on [ideaTweak](https://github.com/S-Sanjith/ideaTweak/) tool. So make sure you install ideaTweak before installing this applet.

For more information on ideaTweak, check out its repository:  
https://github.com/S-Sanjith/ideaTweak

# Installation

To install the applet, run the following commands:  
```
git clone https://github.com/S-Sanjith/ideapad-utilities-cinnamon-linux.git
cd ideapad-utilities-cinnamon-linux
cp -r ./lenovo-utilities@sanjith ~/.local/share/cinnamon/applets/
```

After executing the above commands, logout and log back in. Now, enable the applet 'Lenovo Utilities' in Cinnamon Applets utility.

# Uninstallation

First, disable the applet 'Lenovo Utilities' in the Cinnamon Applets utility. Then run the following command:  
`rm -r ~/.local/share/cinnamon/applets/lenovo-utilities@sanjith`

# Usage

As of now, the applet lets you modify three settings - Conservation Mode, USB Charging, Function Lock. Simply toggle the options to enable or disable the corresponding setting.
