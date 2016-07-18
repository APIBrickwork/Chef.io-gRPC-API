# ChefMateServer
This is ChefMateServer offering Chef.io-Functionality through a gRPC API.

## Installation

* Download the binary file.
* Make sure that a Java Runtime Environment is installed.
* Make sure that Chef.io is available.
* Make sure to FIRST call `-dc` and afterwards `-i`.

## Start Parameters
* __--help__ Show help prompt
* __-dc__ Creates the server environment folder at `$HOME/chefmateserver` and generates the default configuration file `chefmate.conf`.

> The default config does NOT contain the AWS access and secret access key for security reasons. This has to be added manually, if local installation, or can be specified as input parameters for docker, if using docker containers.

* __-i__ Initializes the server environment according to the settings specified in `chefmate.conf`. This includes pulling the following [Chef repository](https://github.com/tfreundo/LabCourse-group4-SS2016-CHEFrepo) by default (or the one specified in `chefmate.conf`) and afterwards executing the initialization script [chefMateServerChefProvisioningSetup.sh](https://github.com/tfreundo/LabCourse-group4-SS2016-CHEFrepo/blob/master/initScripts/chefMateServerChefProvisioningSetup.sh)
* __-p__ Start the ChefMateServer listening on the specified port.

## Docker

### Prerequesites

* Open the docker file and insert `aws_access_key` and `aws_secret_access_key` WITHIN the high comma's (if the key looks like xxxxx/xxxx be sure to escape the slash like this: xxxxx\/xxxx
