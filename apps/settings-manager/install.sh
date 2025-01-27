#******************************************************************************#
#                                                                              #
#                                  install.sh                                  #
#                                                                              #
#******************************************************************************#
#                                                                              #
#        This script installs an app to a Sharedigm platform instance.         #
#                                                                              #
#        Author(s): Abe Megahed                                                #
#                                                                              #
#        This file is subject to the terms and conditions defined in           #
#        'LICENSE.md', which is part of this source code distribution.         #
#                                                                              #
#******************************************************************************#
#        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          #
#******************************************************************************#

# the app to install
#
appname="settings_manager"

# functions
#

function println {
	if [ $force != 1 ]; then
		echo $1
	fi
}

function install_configs {
	println "Installing configs."

	# add to apps.json
	#
	if [ -f config/$dirname.json ]; then
		app=`cat config/$dirname.json`
		jq --tab ".$appname+= $app" $target/config/apps.json > apps.json
		mv apps.json $target/config/apps.json
	fi

	# add to preferences.json
	#
	if [ -f config/preferences.json ]; then
		preferences=`cat config/preferences.json`
		jq --tab ".$appname+= $preferences" $target/config/preferences.json > preferences.json
		mv preferences.json $target/config/preferences.json
	fi
}

function install_scripts {
	println "Installing scripts."
	scripts=$1
	if [ -d $scripts ]; then
		rm -rf "$target/scripts/views/apps/$dirname"
		cp -rf $scripts "$target/scripts/views/apps/$dirname"
	fi
}

function install_styles {
	println "Installing styles."
	styles=$1
	if [ -f $styles/_$dirname.scss ]; then

		# add to styles index if new
		#
		if [ ! -f "$target/styles/apps/_$dirname.scss" ]; then
			printf "\n@use \"$dirname\";" >> "$target/styles/apps/_index.scss"
		fi

		# update styles file
		#
		cp -f $styles/_$dirname.scss "$target/styles/apps/_$dirname.scss"
		
		# if not batch updating
		#
		if [ $force != 1 ]; then

			# recompile styles
			#
			sass $target/styles/styles.scss "$target/styles/styles.css"
		fi
	fi
}

function install_templates {
	println "Installing templates."
	templates=$1
	cp -f $templates/$dirname.tpl $target/templates/apps
}

function install_images {
	println "Installing images."
	images=$1

	# add app icon image
	#
	if [ -f $images/icons/icon.svg ]; then
		cp -r $images/icons/icon.svg $target/images/icons/apps/$dirname.svg
	fi

	# add documentation images
	#
	if [ -d $images/info ]; then
		rm -rf "$target/images/info/apps/$dirname"
		cp -r $images/info "$target/images/info/apps/$dirname"
	fi
}

function install_dependency {
	dependency=$1

	# install model
	#
	if [[ $dependency == "models"* ]]; then
		if [[ ! -d "$target/scripts/$dependency" ]]; then
			cp -r ../../common/$dependency "$target/scripts/models"
		fi
	fi

	# install collection
	#
	if [[ $dependency == "collections"* ]]; then
		if [[ ! -d "$target/scripts/$dependency" ]]; then
			cp -r ../../common/$dependency "$target/scripts/collections"
		fi
	fi

	# install app
	#
	if [[ $dependency == "apps"* ]]; then
		if [[ ! -d "$target/scripts/views/$dependency" ]]; then
			cp -r ../../$dependency/src/scripts "$target/scripts/views/$dependency"
		fi
	fi
}

function install_dependencies {
	println "Installing dependencies."
	dependencies=$1

	# iterate through lines in dependencies file
	#
	if [ -f $dependencies ]; then
		while IFS= read -r line; do
			install_dependency $line
		done < "$dependencies"
		install_dependency $line
	fi
}

# check command line arguments
#
if [ "$1" == "" ] || [ $# -gt 2 ]; then
	echo "Usage: sh install.sh SHAREDIGM_DIRECTORY"
	exit 0
fi

# parse command line arguments
#
target=$1
force=0
if [ $# -eq 2 ] && [ "$2" == "-f" ]; then
	force=1
fi

# confirm install
#
if [ $force != 1 ]; then
	println "Would you like to install $appname to $target (Y/N)?"
	read prompt
	if [ $prompt != 'y' ] && [ $prompt != 'Y' ]; then
		println "Quitting."
		exit 0
	fi
fi

# proceed with install
#
println "Installing $appname to $target..."

# find name of app directory
#
dirname=${appname//_/-}

# install app components
#
install_configs
install_scripts "src/scripts"
install_styles "src/styles"
install_templates "src/templates"
install_images "images"
install_dependencies "dependencies.txt"

# finished
#
println "Installation complete."