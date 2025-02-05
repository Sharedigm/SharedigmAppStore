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
#        Copyright (C) 2016 - 2025, Megahed Labs LLC, www.sharedigm.com        #
#******************************************************************************#

# the app to install
#
appname="calendar"

# search pattern for use in updating routes
#
read -r -d '' search << EOM
    }

    /**
     * Define the "web" routes for the application.
EOM

# utility functions
#

function println {
	if [ $force != 1 ]; then
		echo $1
	fi
}

#******************************************************************************#
#                        client installation functions                         #
#******************************************************************************#

function install_configs {
	println "Installing configs."

	# add to apps.json
	#
	if [ -f config/app.json ]; then
		app=`cat config/app.json`
		jq --tab ".$appname+= $app" $client/config/apps.json > apps.json
		mv apps.json $client/config/apps.json
	fi

	# add to preferences.json
	#
	if [ -f config/preferences.json ]; then
		preferences=`cat config/preferences.json`
		jq --tab ".$appname+= $preferences" $client/config/preferences.json > preferences.json
		mv preferences.json $client/config/preferences.json
	fi
}

function install_scripts {
	println "Installing scripts."
	scripts=$1
	if [ -d $scripts ]; then
		rm -rf "$client/scripts/views/apps/$dirname"
		cp -rf $scripts "$client/scripts/views/apps/$dirname"
	fi
}

function install_styles {
	println "Installing styles."
	styles=$1
	if [ -f $styles/_$dirname.scss ]; then

		# update styles file
		#
		cp -f $styles/_$dirname.scss "$client/styles/apps/_$dirname.scss"

		# add to styles index if new
		#
		if ! grep -q "@use \"$dirname\";" $client/styles/apps/_index.scss; then
			printf "\n@use \"$dirname\";" >> "$client/styles/apps/_index.scss"
		fi
	fi
}

function install_resources {
	println "Installing resources."
	resources=$1
	if [ -d $resources ]; then
		rm -rf "$client/resources/$dirname"
		cp -rf $resources "$client/resources/$dirname"
	fi
}

function install_templates {
	println "Installing templates."
	templates=$1
	cp -f $templates/$dirname.tpl $client/templates/apps
}

function install_images {
	println "Installing images."
	images=$1

	# add app icon image
	#
	if [ -f $images/icons/icon.svg ]; then
		cp -r $images/icons/icon.svg $client/images/icons/apps/$dirname.svg
	fi

	# add documentation images
	#
	if [ -d $images/info ]; then
		rm -rf "$client/images/info/apps/$dirname"
		cp -r $images/info "$client/images/info/apps/$dirname"
	fi
}

function install_client_dependency {
	dependency=$1

	# install model
	#
	if [[ $dependency == "models"* ]]; then
		if [[ ! -d "$client/scripts/$dependency" ]]; then
			cp -r ../../common/scripts/$dependency "$client/scripts/models"
		fi

	# install collection
	#
	elif [[ $dependency == "collections"* ]]; then
		if [[ ! -d "$client/scripts/$dependency" ]]; then
			cp -r ../../common/scripts/$dependency "$client/scripts/collections"
		fi

	# install app
	#
	elif [[ $dependency == "apps"* ]]; then
		if [[ ! -d "$client/scripts/views/$dependency" ]]; then
			cp -r ../../$dependency/src/scripts "$client/scripts/views/$dependency"
		fi

	# install styles
	#
	elif [[ $dependency == "styles"* ]]; then
		if [[ ! -d "$client/$dependency" ]]; then

			# find name of styles file
			#
			stylesfilename=${dependency//styles\//}

			# add to styles index if new
			#
			if [ ! -f "$client/$dependency" ]; then
				printf "\n@use \"$stylesfilename\";" >> "$client/styles/styles.scss"
			fi

			cp -r ../../common/$dependency "$client/$dependency"
		fi
	fi
}

function install_client_dependencies {
	println "Installing dependencies."
	dependencies=$1

	# iterate through lines in dependencies file
	#
	if [ -f $dependencies ]; then
		while IFS= read -r line; do
			install_client_dependency $line
		done < "$dependencies"
		install_client_dependency $line
	fi
}

#******************************************************************************#
#                        server installation functions                         #
#******************************************************************************#

function install_server_dependency {
	dependency=$1

	# install model
	#
	if [[ $dependency == "Models"* ]]; then
		if [[ ! -d "$server/app/$dependency" ]]; then
			cp -r ../../common/services/$dependency "$server/app/$dependency"
		else
			cp -r ../../common/services/$dependency/* "$server/app/$dependency"
		fi
	fi
	if [[ $dependency == "Controllers"* ]]; then
		if [[ ! -d "$server/app/Http/$dependency" ]]; then
			cp -r ../../common/services/$dependency "$server/app/Http/$dependency"
		else
			cp -r ../../common/services/$dependency/* "$server/app/Http/$dependency"
		fi
	fi
	if [[ $dependency == "Utilities"* ]]; then
		if [[ ! -d "$server/app/$dependency" ]]; then
			cp -r ../../common/services/$dependency "$server/app/$dependency"
		else
			cp -r ../../common/services/$dependency/* "$server/app/$dependency"
		fi
	fi
	if [[ $dependency == "routes"* ]]; then
		if [[ ! -f "$server/$dependency.php" ]]; then
			cp -r ../../common/services/$dependency.php "$server/$dependency.php"

			# find path to route service provider
			#
			filepath=$server/app/Providers/RouteServiceProvider.php

			# read contents
			#
			contents=`cat $filepath`

			# create new route
			#
			newroute="    \$this->mapApiRoutes('$dependency.php');"

			# Add new route to route service providers
			#
			replacement="$newroute
    $search"
			printf '%s\n' "${contents/"$search"/$replacement}" > $filepath
		fi
	fi
}

function install_server_dependencies {
	println "Installing server dependencies."
	services=$1

	# iterate through lines in dependencies file
	#
	if [ -f $services ]; then
		while IFS= read -r line; do
			install_server_dependency $line
		done < "$services"
		install_server_dependency $line
	fi
}

#******************************************************************************#
#                          app installation functions                          #
#******************************************************************************#

function install_app {
	install_configs
	install_scripts "src/scripts"
	install_styles "src/styles"
	install_resources "src/resources"
	install_templates "src/templates"
	install_images "images"
	install_client_dependencies "dependencies.txt"

	# if not batch updating
	#
	if [ $force != 1 ]; then

		# recompile styles
		#
		echo "Recompiling styles..."
		sass $client/styles/styles.scss "$client/styles/styles.css"
	fi

	if [ "$server" ]; then
		install_server_dependencies "dependencies.txt"
	fi
}

#******************************************************************************#
#                                     main                                     #
#******************************************************************************#

# check command line arguments
#
if [ "$1" == "" ] || [ $# -gt 2 ]; then
	echo "Usage: sh install.sh CLIENT_DIRECTORY [SERVER_DIRECTORY]"
	exit 0
fi

# parse command line arguments
#
client=$1
if [ $# -eq 2 ]; then
	server=$2
fi

# check optional parameters
#
force=0
for var in "$@"
do
	if [[ $var == "-f" ]]; then
		force=1
	fi
done

# confirm install
#
if [ "$server" ]; then
	if [ $force != 1 ]; then
		println "Would you like to install $appname to $client and $server (Y/N)?"
		read prompt
		if [ $prompt != 'y' ] && [ $prompt != 'Y' ]; then
			println "Quitting."
			exit 0
		fi
	fi
else
	if [ $force != 1 ]; then
		println "Would you like to install $appname to $client (Y/N)?"
		read prompt
		if [ $prompt != 'y' ] && [ $prompt != 'Y' ]; then
			println "Quitting."
			exit 0
		fi
	fi
fi

# proceed with install
#
println "Installing $appname..."

# find name of app directory
#
dirname=${appname//_/-}

# install app components
#
install_app

# finished
#
println "Installation complete."