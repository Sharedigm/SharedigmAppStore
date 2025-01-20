#******************************************************************************#
#                                                                              #
#                              uninstall-apps.sh                               #
#                                                                              #
#******************************************************************************#
#                                                                              #
#        This script batch uninstalls apps to your Sharedigm instance.         #
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
	echo "Usage: sh uninstall-apps.sh DIRNAME [APP1 APP2 APP3...]"
	exit 0
fi

target=$1
appsdir=apps

# confirm uninstall
#
if [ $# -eq 1 ] ; then
	echo "Would you like to uninstall all apps from $target (Y/N)?"
elif [ $# -eq 2 ] ; then
	echo "Would you like to uninstall $2 from $target (Y/N)?"
else
	echo "Would you like to uninstall these $(($# - 1)) apps from $target (Y/N)?"
fi
read prompt
if [ $prompt != 'y' ] && [ $prompt != 'Y' ]; then
	echo "Quitting."
	exit 0
fi

function uninstall_app() {
	echo "Uninstalling $1"
	cd $appsdir/$1
	sh uninstall.sh $target -f
	cd ../..
}

# check if we specify apps
#
if [ $# -lt 2 ] ; then

	# iterate over all apps
	#
	for app in $appsdir/*/; do

		# remove directory name from app name
		#
		app=${app/$appsdir\//}

		# remove slashes from app name
		#
		app=${app/\//}

		# uninstall non-core apps
		#
		if [ $app != 'app' ] && [ $app != 'file-browser' ] && [ $app != 'help-viewer' ] && [ $app != 'settings-browser' ] && [ $app != 'settings-manager' ]; then
			uninstall_app $app
		fi
	done
else

	# iterate over specified apps
	#
	for app in "${@:2}"
	do
		uninstall_app $app
	done
fi

# recompile styles
#
sass $target/styles/styles.scss $target/styles/styles.css