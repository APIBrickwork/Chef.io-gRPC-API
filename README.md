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

* __-i__ Initializes the server environment according to the settings specified in `chefmate.conf`. This includes pulling the following [Chef repository](https://github.com/APIBrickwork/Chef.io-gRPC-API-Chef) by default (or the one specified in `chefmate.conf`) and afterwards executing the initialization script [chefMateServerChefProvisioningSetup.sh](https://github.com/APIBrickwork/Chef.io-gRPC-API-Chef/blob/master/initScripts/chefMateServerChefProvisioningSetup.sh)
* __-p__ Start the ChefMateServer listening on the specified port.

## chefmate.conf
This is the configuration file used by ChefMateServer. It will automatically be created by the `EnvironmentInitializer` using for `AWS Credentials` as input. This file may also be manually modified.

```
#---Environment Initializer Config file---
#Mon Jul 18 18:38:30 CEST 2016

# Your AWS Secret access key
aws_secret_access_key=TODO_SET_THIS_MANUALLY_DUE_TO_SECURITY_REASONS
# Your AWS access key
aws_access_key=TODO_SET_THIS_MANUALLY_DUE_TO_SECURITY_REASONS
# Internal keyword used for EC2 instance id
chefmate_from_chef_keyword_instanceid=CHEFMATEINFO\:\:InstanceID\=
# Internal keyword used for public dns of EC2 instances
chefmate_from_chef_keyword_publicdns=CHEFMATEINFO\:\:PublicDNS\=
# Name of the ssh key that should be used (or generated if not available)
aws_ssh_key_name=chefmateserver_key
# The branch of the Chef repository that should be used
chef_repo_branch=development
# The repository name of the Chef repository that should be used
chef_repo_name=Chef.io-gRPC-API-Chef
# The URL of the Chef repository that should be used
chef_repo_url=https://github.com/APIBrickwork/Chef.io-gRPC-API-Chef.git
```

You could either directly manipulate the values in `chefmate.conf` or for example include it in your Docker file like [here](https://github.com/APIBrickwork/Chef.io-gRPC-API/blob/master/docker/Dockerfile-chefmateserver)

## Docker

### Prerequesites

* Open the docker file and insert `aws_access_key` and `aws_secret_access_key` WITHIN the high comma's (if the key looks like xxxxx/xxxx be sure to escape the slash like this: xxxxx\/xxxx
