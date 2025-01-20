<p align="center" style="text-align:center">
	<img src="images/icons/logo.svg" width="200">
</p>

# Project Viewer

The [Project Viewer](https://www.sharedigm.com/#apps/project-viewer) app is used to manage a project's tasks.

<p align="center" style="text-align:center">
	<img src="images/info/project-viewer.png" width="720" style="border-radius:6px" />
	<div align="center">Project Viewer</div>
</p>

## Features

- View tasks by icons, lists, cards, or tiles.
- View task priorities, create dates, modify dates, or due dates.
- Sort tasks by title, type, priority, or number of tasks.

## Benefits

- View and edit a project's tasks.

## Requirements

### 1. Sharedigm OS

This application is built on top of the [Sharedigm cloud-based operating system](https://github.com/Sharedigm/SharedigmOS).

You will need an instance of the Sharedigm OS installed on your computer or web server in order to run this application.

### 2. Installer Requirements

The installer and uninstaller scripts for this applications require the following:

1. [bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) - Unix style shell interpreter. 
2. [jq](https://jqlang.github.io/jq/) - command-line JSON processor. 
2. [sass](https://sass-lang.com) - CSS pre-processor

## Installation

In order to install this application, simply run the included installation script:

```
sh install.sh SHAREDIGM_PATH
```

## Uninstallation

To uninstall this application, run:

```
sh uninstall.sh SHAREDIGM_PATH
```

<!-- LICENSE -->
## License

Distributed under the Sustainable Use License which allows urestricted use of the software but does not allow you to commercialize it. See [LICENSE.md](LICENSE.md) for more information.

<!-- CONTACT -->
## Contact

mailto:admin@sharedigm.com