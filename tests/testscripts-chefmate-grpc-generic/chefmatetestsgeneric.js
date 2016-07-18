"use strict";
var grpc = require("grpc");
var testCase = require("nodeunit").testCase;
var async = require("async");
var protoDescriptor = grpc.load("../proto/chefmate.proto");

var timeout = 3000;

var grpcHost = process.env.API_HOST;
var grpcPort = process.env.API_PORT;

var ec2opsstub = new protoDescriptor.Ec2Ops(grpcHost + ":" + grpcPort,
	grpc.credentials.createInsecure());

var genericopsstub = new protoDescriptor.GenericOps(grpcHost + ":" + grpcPort,
	grpc.credentials.createInsecure());

var ec2InstanceDns;

exports.sendCreateVM = function (test) {

	console.log("### TEST sendCreateVM\n\n");

	var request = {
		name: "chefmatetests",
		tag: "tests",
		region: "eu-central-1",
		imageId: "ami-87564feb",
		username: "ubuntu",
		instanceType: "t2.micro",
		securityGroupIds: ["sg-79ae5d11"]
	};

	ec2opsstub.createVm(request,
		function (err, response) {
			if (err) {
				console.log("Error when calling createVm: " + err);
				test.ok(false, err.message);
				test.done();
			} else {
				console.log("Received response:\n" + JSON.stringify(response));
				var instanceId = response.instanceId.id;
				var publicDns = response.publicDns;
				ec2InstanceDns = publicDns;
				console.log("Found instanceId = " + instanceId);
				console.log("Found publicDns = " + publicDns);
				test.notEqual(instanceId, "undefined", "InstanceId in response was undefined.");
				test.notEqual(publicDns, "undefined", "PublicDns in response was undefined.");
				test.done();
			}
		});

}

exports.sendInitCHEFRepo = function (test) {

	console.log("### TEST sendInitCHEFRepo\n\n");

	var request = {
		credentials: {
			username: "ubuntu",
			host: ec2InstanceDns,
			keyfilename: "chefmateserver_key",
			timeout: 10000
		}
	};

	ec2opsstub.initChefRepo(request,
		function (err, response) {
			if (err) {
				console.log("Error when calling initChefRepo: " + err);
				test.ok(false, err.message);
				test.done();
			} else {
				console.log("Received response:\n" + JSON.stringify(response));
				test.notEqual(response.outputLog, "undefined", "InstanceId in response was undefined.");
				test.done();
			}
		});
}

exports.sendDeployWordpressGeneric = function (test) {
	console.log("### TEST sendDeployWordpressGeneric\n\n");

	var request = {
		credentials: {
			username: "ubuntu",
			host: ec2InstanceDns,
			keyfilename: "chefmateserver_key",
			timeout: 10000
		},
		cookbookName: "cb-wordpress",
		recipeName: ":default",
		attributesKeys: [
			"['wordpress']['db']['name']",
			"['wordpress']['db']['port']",
			"['wordpress']['db']['user']",
			"['wordpress']['db']['pass']",
			"['wordpress']['db']['root_password']"
		],
		attributesValues: [
			"wordpressdb",
			"3306",
			"wordpress",
			"cloud16",
			"cloud16"
		]
	};

	genericopsstub.executeCookbook(request,
		function (err, response) {
			if (err) {
				console.log("Error when calling deployWpApp: " + err);
				test.ok(false, err.message);
				test.done();
			} else {
				console.log("Received response:\n" + JSON.stringify(response));
				test.done();
			}
		});

}
