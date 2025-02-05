#******************************************************************************#
#                                                                              #
#                                uninstall.sh                                  #
#                                                                              #
#******************************************************************************#
#                                                                              #
#        This script uninstalls an app to a Sharedigm platform instance.       #
#                                                                              #
#        Author(s): Abe Megahed                                                #
#                                                                              #
#        This file is subject to the terms and conditions defined in           #
#        'LICENSE.md', which is part of this source code distribution.         #
#                                                                              #
#******************************************************************************#
#        Copyright (C) 2016 - 2025, Megahed Labs LLC, www.sharedigm.com        #
#******************************************************************************#

# the app to uninstall
#
appname="timer"

#
# functions
#

function println {
	if [ $force != 1 ]; then
		echo $1
	fi
}

#******************************************************************************#
#                       client uninstallation functions                        #
#******************************************************************************#

function uninstall_configs {
	println "Uninstalling configs."

	# Uninstall from launcher
	#
	jq "del(.$appname)" $target/config/apps.json --tab > apps.json
	mv apps.json $target/config/apps.json

	# Uninstall from preferences
	#
	jq "del(.$appname)" $target/config/preferences.json --tab > preferences.json
	mv preferences.json $target/config/preferences.json
}

function uninstall_scripts {
	println "Uninstalling scripts."
	scripts=$target/scripts/views/apps/$dirname
	if [ -d $scripts ]; then
		rm -rf $scripts
	fi
}

function uninstall_styles {
	println "Uninstall styles."
	styles=$target/styles/apps/_$dirname.scss
	if [ -f $styles ]; then
		rm -f $styles

		# remove reference from _index.scss
		#
		use="@use \"$dirname\";"
		sed -i -e "s/\n$use//g" $target/styles/apps/_index.scss
		sed -i -e "/$use/d" $target/styles/apps/_index.scss

		# remove backup files (MacOS)
		#
		if [ -f $target/styles/apps/_index.scss-e ]; then
			rm $target/styles/apps/_index.scss-e
		fi

		if [ $force != 1 ]; then
			sass $target/styles/styles.scss $target/styles/styles.css
		fi
	fi
}

function uninstall_resources {
	println "Uninstalling resources."
	resources=$target/resources/$dirname
	if [ -d $resources ]; then
		rm -rf $resources
	fi
}

function uninstall_templates {
	println "Uninstalling templates."

	# Uninstall from documentation templates
	#
	if [ -f $target/templates/apps/$dirname.tpl ]; then
		rm $target/templates/apps/$dirname.tpl
	fi
}

function uninstall_images {
	println "Uninstalling images."

	# Uninstall app icon image.
	#
	if [ -f $target/images/icons/apps/$dirname.svg ]; then
		rm $target/images/icons/apps/$dirname.svg
	fi

	# Uninstall documentation images.
	#
	if [ -d $target/images/info/apps/$dirname ]; then
		rm -r $target/images/info/apps/$dirname
	fi
}

# check command line arguments
#
if [ "$1" == "" ] || [ $# -gt 2 ]; then
	echo "Usage: sh uninstall.sh SHAREDIGM_DIRECTORY"
	exit 0
fi

#******************************************************************************#
#                                     main                                     #
#******************************************************************************#

# parse command line arguments
#
target=$1
force=0
if [ $# -eq 2 ] && [ "$2" == "-f" ]; then
	force=1
fi

# confirm uninstall
#
if [ $force != 1 ]; then
	println "Would you like to uninstall $appname from $target (Y/N)?" 
	read prompt
	if [ $prompt != 'y' ] && [ $prompt != 'Y' ]; then
		println "Quitting."
		exit 0
	fi
fi

# proceed with uninstall
#
println "Uninstalling $appname from $target..."

# find name of app directory
#
dirname=${appname//_/-}

# uninstall app components
#
uninstall_configs
uninstall_scripts
uninstall_styles
uninstall_resources
uninstall_templates
uninstall_images

# finished
#
println "Uninstallation complete."