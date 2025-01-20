<p align="center" style="text-align:center">
	<img src="images/icons/logo.svg" width="200">
</p>

# Video Player

The [Video Player](https://www.sharedigm.com/#apps/video-player) app is used to view video files and movies.

<p align="center" style="text-align:center">
	<img src="images/info/video-player.png" width="720" style="border-radius:6px" />
</p>

## Features

- Play video files in the following formats:
	- Mpeg (.mp4, .mpeg, .mpg)
	- Quicktime (.mov)
	- Ogg (.ogg)
	- WebM (.webm)
- Use the video controls to play, pause, and repeat.
- Use the time slider to advance to a specific position in a clip.
- Use the volume controls to adjust the volume.
- Use the sidebar thumbnail view to preview and navigate videos.
- Use the navigation controls to step through a collection of videos.
- Use the full screen mode to expand videos to encompass the screen.
- Use the share menu to share favorite clips with connections.

## Benefits

- Play video files and collections from any network connected device.

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