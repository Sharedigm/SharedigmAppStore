#******************************************************************************#
#                                                                              #
#                               install-apps.sh                                #
#                                                                              #
#******************************************************************************#
#                                                                              #
#        This script batch installs apps to your Sharedigm instance.           #
#                                                                              #
#        Author(s): Abe Megahed                                                #
#                                                                              #
#        This file is subject to the terms and conditions defined in           #
#        'LICENSE.md', which is part of this source code distribution.         #
#                                                                              #
#******************************************************************************#
#        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          #
#******************************************************************************#

# check command line arguments
#
if [ $# -lt 1 ] ; then
	echo "Usage: sh install-apps.sh DIRNAME [APP1 APP2 APP3...]"
	exit 0
fi

target=$1

# confirm install
#
if [ $# -eq 1 ] ; then
	echo "Would you like to install all apps to $target (Y/N)?"
elif [ $# -eq 2 ] ; then
	echo "Would you like to install $2 to $target (Y/N)?"
else
	echo "Would you like to install these $(($# - 1)) apps to $target (Y/N)?"
fi
read prompt
if [ $prompt != 'y' ] && [ $prompt != 'Y' ]; then
	echo "Quitting."
	exit 0
fi

function install_app() {
	echo "Installing $1"
	cd apps/$1
	sh install.sh $target -f
	cd ../..
}

# check if we specify apps
#
if [ $# -lt 2 ] ; then

	# iterate over all apps
	#
	for app in apps/*/; do

		# remove directory name from app name
		#
		app=${app/apps\//}

		# remove slashes from app name
		#
		app=${app/\//}

		# install non-core apps
		#
		if [ $app != 'app' ] && [ $app != 'file-browser' ] && [ $app != 'help-viewer' ] && [ $app != 'settings-browser' ] && [ $app != 'settings-manager' ]; then
			install_app $app
		fi
	done
else

	# iterate over specified apps
	#
	for app in "${@:2}"
	do
		install_app $app
	done
fi

# recompile styles
#
sass $target/styles/styles.scss $target/styles/styles.css