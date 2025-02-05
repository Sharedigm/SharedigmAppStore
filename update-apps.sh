#******************************************************************************#
#                                                                              #
#                                update-apps.sh                                #
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

function update_configs {

	# copy configs
	#
	jq ".$appname" $sourcedir/config/apps.json --tab > "$appsdir/$dirname/config/$dirname.json"
	jq ".$appname" $sourcedir/config/preferences.json --tab > "$appsdir/$dirname/config/preferences.json"
}

function update_scripts {

	# copy scripts
	#
	if [ -d $sourcedir/scripts/views/apps/$dirname ]; then
		if [ ! -d $appsdir/$dirname/src/scripts ]; then
			mkdir "$appsdir/$dirname/src/scripts"
		fi
		cp -rf $sourcedir/scripts/views/apps/$dirname/* "$appsdir/$dirname/src/scripts"
	fi
}

function update_styles {

	# copy styles
	#
	if [ -f $sourcedir/styles/apps/_$dirname.scss ]; then
		if [ ! -d $appsdir/$dirname/src/styles ]; then
			mkdir "$appsdir/$dirname/src/styles"
		fi
		cp -f $sourcedir/styles/apps/_$dirname.scss "$appsdir/$dirname/src/styles/"
	fi
}

function update_resources {

	# copy resources
	#
	if [ -d $sourcedir/resources/$dirname ]; then
		rm -rf $appsdir/$dirname/src/resources
		cp -rf $sourcedir/resources/$dirname $appsdir/$dirname/src/resources
	fi
}

function update_templates {

	# copy templates
	#
	if [ -f $sourcedir/templates/apps/$dirname.tpl ]; then
		if [ ! -d $appsdir/$dirname/src/templates ]; then
			mkdir "$appsdir/$dirname/src/templates"
		fi
		cp -f $sourcedir/templates/apps/$dirname.tpl "$appsdir/$dirname/src/templates/"
	fi
}

function update_images {

	# copy icon
	#
	if [ -f $sourcedir/images/icons/apps/$dirname.svg ]; then
		cp -f $sourcedir/images/icons/apps/$dirname.svg "$appsdir/$dirname/images/icons/icon.svg"
	fi

	# copy images
	#
	if [ -d $sourcedir/images/info/apps/$dirname ]; then
		cp -rf $sourcedir/images/info/apps/$dirname/* "$appsdir/$dirname/images/info"
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

	# set target directory
	#
	appsdir=apps

	# check if app directory exists
	#
	if [ ! -d "$appsdir/$dirname" ]; then
		
		# copy app template directory
		#
		cp -rf "$appsdir/template" "$appsdir/$dirname"
	else

		# copy installer / uninstaller scripts
		#
		cp -f "$appsdir/template/"*.sh "$appsdir/$dirname/"
	fi

	# create src directory
	#
	if [ ! -d $appsdir/$dirname/src/ ]; then
		mkdir "$appsdir/$dirname/src/"
	fi

	# update app support
	#
	update_installers
	update_configs

	# update app components
	#
	update_scripts
	update_styles
	update_resources
	update_templates
	update_images
}

function update_apps() {
	appsdir=$1

	# iterate over all apps
	#
	for appdir in $appsdir/*/; do

		# remove path prefix
		#
		dirname=${appdir/$sourcedir\/scripts\/views\/apps\//}

		# remove trailing slash
		#
		dirname=${dirname/\//}

		# skip base apps
		#
		if [ $dirname != 'common' ] && [ $dirname != 'desktop' ]; then
			update_app $dirname
		fi
	done
}

#
# main
#

# check command line arguments
#
if [ $# -lt 1 ] ; then
	echo "Usage: sh update-apps.sh SHAREDIGM_DIRECTORY [APP1 APP2 APP3...]"
	exit 0
fi

# parse command line arguments
#
sourcedir=$1

# confirm update
#
if [ $# -eq 1 ] ; then
	echo "Would you like to update all apps from $sourcedir (Y/N)?"
elif [ $# -eq 2 ] ; then
	echo "Would you like to update $2 from $sourcedir (Y/N)?"
else
	echo "Would you like to update these $(($# - 1)) apps from $sourcedir (Y/N)?"
fi
read prompt
if [ $prompt != 'y' ] && [ $prompt != 'Y' ]; then
	echo "Quitting."
	exit 0
fi

# check if we specify apps
#
if [ $# -lt 2 ] ; then
	update_apps $sourcedir/scripts/views/apps
else

	# iterate over specified apps
	#
	for i in "${@:2}"
	do
		update_app $i
	done
fi