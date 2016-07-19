# tests
Tests-Bundles for evaluating this gRPC API.

## Test-Overview

__Possible states:__
* Outstanding: Not yet developed.
* Under dev: Is in development state.
* Finished: Development has finished and local execution worked. But not yet tested using a clean environment.
* Finalized: Final state. Also tested with a clean environment (fresh pull of repo, no preexisting docker images, no preexisting docker containers)

| Test-Bundle | Docker | Testscripts | Status | Execution-Info |
| ----------- | ------ | ----------- | ------ | ---- |
| (part2): WordPressOps&EC2Ops gRPC API + test script to deploy WordPress | [docker-chefmate-grpc](https://github.com/APIBrickwork/Chef.io-gRPC-API/tree/master/tests/docker-chefmate-grpc) | [testscripts-chefmate-grpc](https://github.com/APIBrickwork/Chef.io-gRPC-API/tree/master/tests/testscripts-chefmate-grpc) | Finalized + demo| See [Extended-Dockerfile](#extended-execution-dockerfile-credentials) |
| (part2): Chef Generic gRPC API + test script to deploy WordPress | [docker-chefmate-grpc-generic](https://github.com/APIBrickwork/Chef.io-gRPC-API/tree/master/tests/docker-chefmate-grpc-generic) | [testscripts-chefmate-grpc-generic](https://github.com/APIBrickwork/Chef.io-gRPC-API/tree/master/tests/testscripts-chefmate-grpc-generic) | Finalized + demo |See [Extended-Dockerfile](#extended-execution-dockerfile-credentials) |

## Extended Execution Dockerfile Credentials
__Those tests use AWS!__

It is a special execution routine where the user (in order to make the tests work) has to enter the AWS credentials. 
* Clone the repository
* Change directory to the subfolder stated in the column `Docker`
* Open the Dockerfile `Dockerfile-chefmateserver`
* Insert your AWS credentials
* Save the file
* Run `docker-compose up`
