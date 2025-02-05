#******************************************************************************#
#                                                                              #
#                             update-installers.sh                             #
#                                                                              #
#******************************************************************************#
#                                                                              #
#        This script updates the collection of apps in an app store.           #
#                                                                              #
#        Author(s): Abe Megahed                                                #
#                                                                              #
#        This file is subject to the terms and conditions defined in           #
#        'LICENSE.md', which is part of this source code distribution.         #
#                                                                              #
#******************************************************************************#
#        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          #
#******************************************************************************#

#
# globals
#

appsdir=apps
template=template

#
# functions
#

function update_installers {

	# update installer and uninstaller
	#
	sed -i -e "s/APPNAME/$appname/g" "$appsdir/$dirname/install.sh"
	sed -i -e "s/APPNAME/$appname/g" "$appsdir/$dirname/uninstall.sh"

	# remove backup files (MacOS)
	#
	if [ -f "$appsdir/$dirname/install.sh-e" ]; then
		rm "$appsdir/$dirname/install.sh-e"
	fi
	if [ -f "$appsdir/$dirname/uninstall.sh-e" ]; then
		rm "$appsdir/$dirname/uninstall.sh-e"
	fi
}

function update_app {
	echo "Updating $1"

	# get app directory name
	#
	dirname=$1

	# get app name from directory name 
	#
	appname=${dirname//-/_}

	# check if app directory exists
	#
	if [ ! -d "$appsdir/$dirname" ]; then
		
		# copy app template directory
		#
		cp -rf "$appsdir/$template" "$appsdir/$dirname"
	else

		# copy installer / uninstaller scripts
		#
		cp -f "$appsdir/$template/"*.sh "$appsdir/$dirname/"
	fi

	# update app support
	#
	update_installers
}

function update_apps() {

	# iterate over all apps
	#
	for appdir in apps/*/; do

		# remove path prefix
		#
		dirname=${appdir/apps\///}

		# remove trailing slash
		#
		dirname=${dirname/\//}

		# remove trailing slash
		#
		dirname=${dirname/\//}

		# skip base apps
		#
		if [ $dirname != 'template' ]; then
			update_app $dirname
		fi
	done
}

#
# main
#

# check command line arguments
#
if [ $# -lt 0 ] ; then
	echo "Usage: sh update-installers.sh [APP1 APP2 APP3...]"
	exit 0
fi

# confirm update
#
if [ $# -eq 0 ] ; then
	echo "Would you like to update all installers (Y/N)?"
elif [ $# -eq 1 ] ; then
	echo "Would you like to update $1 (Y/N)?"
else
	echo "Would you like to update these $(($#)) apps (Y/N)?"
fi
read prompt
if [ $prompt != 'y' ] && [ $prompt != 'Y' ]; then
	echo "Quitting."
	exit 0
fi

# check if we specify apps
#
if [ $# -eq 0 ] ; then
	update_apps
else

	# iterate over specified apps
	#
	for i in "${@:1}"
	do
		update_app $i
	done
fi