# ideapad-utilities-cinnamon-linux
This is an applet for cinnamon desktop environment on Linux. This applet can be used to access certain functionalities specific to Lenovo Ideapad laptops, which are usually accessible on Windows through the Lenovo Vantage software.

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

The applet lets you modify three settings - Conservation Mode, USB Charging, Function Lock. Simply toggle the options to enable or disable the corresponding setting.
