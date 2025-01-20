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
appname="topic_browser"

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

# output function
#
function println {
	if [ $force != 1 ]; then
		echo $1
	fi
}

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

# add to scripts
#
println "Adding to scripts."
if [ -d src/scripts ]; then
	rm -rf "$target/scripts/views/apps/$dirname"
	cp -rf src/scripts "$target/scripts/views/apps/$dirname"
fi

# add to styles
#
println "Adding to styles."
if [ -f src/styles/_$dirname.scss ]; then

	# add to styles index if new
	#
	if [ ! -f "$target/styles/apps/_$dirname.scss" ]; then
		printf "\n@use \"$dirname\";" >> "$target/styles/apps/_index.scss"
	fi

	# update styles file
	#
	cp -f src/styles/_$dirname.scss "$target/styles/apps/_$dirname.scss"
	
	# if not batch updating
	#
	if [ $force != 1 ]; then

		# recompile styles
		#
		sass $target/styles/styles.scss "$target/styles/styles.css"
	fi
fi

# add to apps.json
#
println "Adding to launcher."
if [ -f config/$dirname.json ]; then
	app=`cat config/$dirname.json`
	jq --tab ".$appname+= $app" $target/config/apps.json > apps.json
	mv apps.json $target/config/apps.json
fi

# add to preferences.json
#
println "Adding to preferences."
if [ -f config/preferences.json ]; then
	preferences=`cat config/preferences.json`
	jq --tab ".$appname+= $preferences" $target/config/preferences.json > preferences.json
	mv preferences.json $target/config/preferences.json
fi

# add to icons
#
println "Adding app icon."
if [ -f images/icons/icon.svg ]; then
	cp images/icons/icon.svg $target/images/icons/apps/$dirname.svg
fi

# add to templates
#
println "Adding template to documentation."
if [ -f src/templates/$dirname.tpl ]; then
	cp src/templates/$dirname.tpl $target/templates/apps
fi

# add to images
#
println "Adding images to documentation."
if [ -d images/info ]; then
	cp -r images/info $target/images/info/apps/$dirname
fi

# finished
#
println "Installation complete."