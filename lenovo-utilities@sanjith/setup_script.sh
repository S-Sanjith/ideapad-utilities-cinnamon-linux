#!/bin/sh

sudo chgrp sanjith /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/fn_lock
sudo chgrp sanjith /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/usb_charging
sudo chgrp sanjith /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode

sudo chmod g+w /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/fn_lock
sudo chmod g+w /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/usb_charging
sudo chmod g+w /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode